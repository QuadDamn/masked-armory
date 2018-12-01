const {ObjectId} = require('mongodb');
require('dotenv').config();

/**
 * Looks through Mongo for a ID match for the passed armory ID.
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function getProfile(req, res) {
  const profileId = req.params.id;
  const collection = req.db.collection('armories');

  try {
    let document = await collection.findOne({_id: ObjectId(profileId)});

    let data = document.data;

    data.name = '';
    data.realm = '';
    data.raceName = getRaceName(data['race']);
    data.className = getClassName(data['class']);
    data.mounts = await getMounts(req.db, data.mounts.collected);
    data.pets = await getPets(req.db, data.pets.collected);
    data.titles = await sortAndCleanTitles(data.titles);
    data.reputation = await getReputations(data.reputation);

    data.achievementCounts = (data.achievementCounts['Total']) ? await getOldAchievementProgressWidth(data.achievementCounts) : await getAchievementProgressWidth(data.achievementCounts);
    data.obtainedAchievements = (data.achievementCounts[0][0] === 'Total') ? data.achievementCounts[0][0].count : await getAchievementsObtainedTotal(data.achievementCounts);
    data.totalAchievements = (data.achievementCounts[0][0] === 'Total') ? data.achievementCounts[0][0].total : 2757; // Magic number as there is no way to compute this from the API at this time.

    data.featsLegacy = await getFeatsAndLegacy(data.achievementCounts);

    let totalAchievementsProgressWidth = Math.round((data.obtainedAchievements / data.totalAchievements) * 100);
    data.totalAchievementsProgressWidth = totalAchievementsProgressWidth.toString() + '%';

    if (!isEmpty(document)) {
      return res.status(200).send({status: 'success', data: {profile: data}});
    } else {
      return res.status(404).send({status: 'error', message: 'Armory not found.'});
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({status: 'error', message: err});
  }
}

async function getFeatsAndLegacy(achievements) {
  let counts = {};

  for (let i = 0; i < achievements.length; i++) {
    if (achievements[i].headerName === 'Legacy') {
      counts.legacy = achievements[i];
    } else if (achievements[i].headerName === 'Feats of Strength') {
      counts.feats = achievements[i];
    }
  }

  return counts;
}

async function getAchievementsObtainedTotal(achievements) {
  let achievementsObtainedTotal = 0;
  const headersToIgnore = ['Legacy', 'Feats of Strength', 'Expansion Features'];

  for (let i = 0; i < achievements.length; i++) {
    if (!headersToIgnore.includes(achievements[i].headerName)) {
      achievementsObtainedTotal = achievementsObtainedTotal + achievements[i].achievementCount;
    }
  }

  return achievementsObtainedTotal;
}

function getOldAchievementProgressWidth(achievements) {
  const achHeaders = Object.keys(achievements);
  const headersToIgnore = ['Legacy', 'Feats of Strength', 'Total'];

  return achHeaders.map((header) => {
    if (!headersToIgnore.includes(header)) {

      let achievementBarWidth = Math.round((achievements[header].count / achievements[header].total) * 100);

      return {
          "headerName": header,
          "achievementCount": achievements[header].count,
          "achievementTotalCount": achievements[header].total,
          "achievementDetails": [],
          "progressWidth": achievementBarWidth.toString() + '%'
        };
    } else {
      return {
        "headerName": header,
        "achievementCount": achievements[header].count,
        "achievementDetails": achievements[header].achievements,
      };
    }
  });
}

function getAchievementProgressWidth(achievements) {
  const headersToIgnore = ['Legacy', 'Feats of Strength', 'Expansion Features'];

  return achievements.map((category) => {
    if (!headersToIgnore.includes(category.headerName)) {
      let achievementBarWidth = Math.round((category.achievementCount / category.achievementTotalCount) * 100);
      category.progressWidth = achievementBarWidth.toString() + '%';
      return category;
    } else {
      return category;
    }
  });
}

/**
 * Handles organizing, sorting, and building out some metrics for reputations.
 *
 * @param reputations
 * @returns {Promise<*>}
 */
async function getReputations(reputations) {
  const bfaAllianceReps = ['7th Legion', 'Champions of Azeroth', 'Order of Embers', 'Proudmoore Admiralty', 'Storm\'s Wake', 'Tortollan Seekers'];
  const bfaHordeReps = ['Champions of Azeroth', 'Talanji\'s Expedition', 'The Honorbound', 'Tortollan Seekers', 'Voldunai', 'Zandalari Empire'];

  reputations.sort((a, b) => {
    a = a['name'];
    b = b['name'];
    return a === b ? 0 : (a < b ? -1 : 1)
  });

  return reputations.map((reputation) => {
    reputation.standingName = getReputationStandingName(reputation.standing);
    reputation.standingNameLower = reputation.standingName.toLowerCase();
    reputation.progressWidth = getReputationProgressWidth(reputation);

    if (bfaAllianceReps.includes(reputation.name) || bfaHordeReps.includes(reputation.name)) {
      reputation.bfaRep = true;
    }

    return reputation;
  });
}

/**
 * Calculates the width of the progress bar content for the React render.
 *
 * @param reputation
 * @returns {string}
 */
function getReputationProgressWidth(reputation) {
  let reputationBarWidth = '';

  if (reputation.standingName !== 'Exalted' && reputation.standingName !== 'Hated') {
    reputationBarWidth = Math.round((reputation.value / reputation.max) * 100);
  } else if (reputation.standingName === 'Hated') {
    reputationBarWidth = 0;
  } else if (reputation.standingName === 'Exalted') {
    reputationBarWidth = 100;
  }

  return reputationBarWidth.toString() + '%';
}

/**
 * Gets the reputation standing name given that Blizzard API gives us a standing ID.
 *
 * @param id
 * @returns {string}
 */
function getReputationStandingName(id) {
  let name = '';

  switch (id) {
    case 0:
      name = 'Hated';
      break;
    case 1:
      name = 'Hostile';
      break;
    case 2:
      name = 'Unfriendly';
      break;
    case 3:
      name = 'Neutral';
      break;
    case 4:
      name = 'Friendly';
      break;
    case 5:
      name = 'Honored';
      break;
    case 6:
      name = 'Revered';
      break;
    case 7:
      name = 'Exalted';
      break;
  }

  return name;
}

/**
 * The reason we are storing the mount data in the DB (got the data from here: https://gist.github.com/erorus)
 * is because Blizzard API doesn't return the displayId for the mount and we need that to get the graphic
 * render for the mount so we can display the image properly to the user.
 *
 * @param db
 * @param characterMounts
 * @returns {Promise<Array>}
 */
async function getMounts(db, characterMounts) {
  const collection = db.collection('mounts');
  const mounts = await collection.find({}).toArray();

  const mountCollection = mounts[0].mounts;
  let mountsCollected = [];

  for (let j = 0; j < characterMounts.length; j++) {
    for (let i = 0; i < mountCollection.length; i++) {
      if (mountCollection[i].name === characterMounts[j].name) {
        mountsCollected.push(mountCollection[i]);
        break;
      }
    }
  }

  return mountsCollected;
}

/**
 * The reason we are storing the pet data in the DB (got the data from here: https://gist.github.com/erorus)
 * is because Blizzard API doesn't return the displayId for the pet and we need that to get the graphic
 * render for the pet so we can display the image properly to the user.
 *
 * @param db
 * @param characterPets
 * @returns {Promise<Array>}
 */
async function getPets(db, characterPets) {
  const collection = db.collection('pets');
  const pets = await collection.find({}).toArray();

  const petCollection = pets[0].pets;
  let petsCollected = [];

  for (let j = 0; j < characterPets.length; j++) {
    for (let i = 0; i < petCollection.length; i++) {
      if (petCollection[i].name === characterPets[j].name) {
        petCollection[i].spellId = characterPets[j].spellId;
        petsCollected.push(petCollection[i]);
        break;
      }
    }
  }

  petsCollected.sort((a, b) => {
    a = a['name'];
    b = b['name'];
    return a === b ? 0 : (a < b ? -1 : 1)
  });

  return petsCollected;
}

/**
 * Clean up the titles and then sort them alphabetically.
 *
 * @param titles
 * @returns {*}
 */
function sortAndCleanTitles(titles) {
  for (let i = 0; i < titles.length; i++) {
    let cleanTitle = titles[i].name.replace('%s', '');
    cleanTitle = cleanTitle.replace(',', '');
    titles[i].name = cleanTitle.trim();
  }

  titles.sort((a, b) => {
    a = a['name'];
    b = b['name'];
    return a === b ? 0 : (a < b ? -1 : 1)
  });

  return titles;
}

/**
 * Blizzard API gives us a raceId, so we need to convert that to a race name for display on the frontend.
 *
 * @param raceId
 * @returns {string}
 */
function getRaceName(raceId) {
  let raceName = '';

  switch (raceId) {
    case 1:
      raceName = 'Human';
      break;
    case 2:
      raceName = 'Orc';
      break;
    case 3:
      raceName = 'Dwarf';
      break;
    case 4:
      raceName = 'Night Elf';
      break;
    case 5:
      raceName = 'Undead';
      break;
    case 6:
      raceName = 'Tauren';
      break;
    case 7:
      raceName = 'Gnome';
      break;
    case 8:
      raceName = 'Troll';
      break;
    case 9:
      raceName = 'Goblin';
      break;
    case 10:
      raceName = 'Blood Elf';
      break;
    case 11:
      raceName = 'Draenei';
      break;
    case 22:
      raceName = 'Worgen';
      break;
    case 24:
      raceName = 'Pandaren';
      break;
    case 25:
      raceName = 'Pandaren';
      break;
    case 26:
      raceName = 'Pandaren';
      break;
    case 27:
      raceName = 'Nightborne';
      break;
    case 28:
      raceName = 'Highmountain Tauren';
      break;
    case 29:
      raceName = 'Void Elf';
      break;
    case 30:
      raceName = 'Lightforged Draenei';
      break;
    case 31:
      raceName = 'Zandalari Troll';
      break;
    case 32:
      raceName = 'Kul Tiran';
      break;
    case 34:
      raceName = 'Dark Iron Dwarf';
      break;
    case 36:
      raceName = 'Mag\'har Orc';

  }
  return raceName;
}

/**
 * Blizzard API gives us a classId, so we need to convert that to a class name for display on the frontend.
 *
 * @param classId
 * @returns {string}
 */
function getClassName(classId) {
  let className = '';

  switch (classId) {
    case 1:
      className = 'Warrior';
      break;
    case 2:
      className = 'Paladin';
      break;
    case 3:
      className = 'Hunter';
      break;
    case 4:
      className = 'Rogue';
      break;
    case 5:
      className = 'Priest';
      break;
    case 6:
      className = 'Death Knight';
      break;
    case 7:
      className = 'Shaman';
      break;
    case 8:
      className = 'Mage';
      break;
    case 9:
      className = 'Warlock';
      break;
    case 10:
      className = 'Monk';
      break;
    case 11:
      className = 'Druid';
      break;
    case 12:
      className = 'Demon Hunter';
  }

  return className;
}

/**
 * Reusable function to check whether or not an object is empty.
 */
function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}

module.exports = getProfile;