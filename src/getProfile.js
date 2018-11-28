const { ObjectId } = require('mongodb');
require('dotenv').config();

/**
 * Looks through Mongo for a ID match for the passed armory ID.
 */
async function getProfile(req, res) {
    const profileId = req.params.id;
    const collection = req.db.collection('armories');

    try {
        let document = await collection.findOne({_id: ObjectId(profileId)});

        let data = document.data;

        data.raceName = getRaceName(data['race']);
        data.className = getClassName(data['class']);

        data.mounts = await getMounts(req.db, data.mounts.collected);
        data.pets = await getPets(req.db, data.pets.collected);
        data.titles = await sortAndCleanTitles(data.titles);

        if (!isEmpty(document)) {
            return res.status(200).send({ status: 'success', data: { profile: data }});
        } else {
            return res.status(404).send({ status: 'error', message: 'Armory not found.' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 'error', message: err });
    }
}

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