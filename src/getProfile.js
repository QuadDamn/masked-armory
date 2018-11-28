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

async function getReputations(reputations) {

    const reps = {
        '7th Legion': {
            'faction': 'Alliance',
            'expansion': 'Battle for Azeroth'
        },
        'Storm\'s Wake': {
            'faction': 'Alliance',
            'expansion': 'Battle for Azeroth'
        },
        'Order of Embers': {
            'faction': 'Alliance',
            'expansion': 'Battle for Azeroth'
        },
        'Proudmoore Admiralty': {
            'faction': 'Alliance',
            'expansion': 'Battle for Azeroth'
        },
        'The Honorbound': {
            'faction': 'Horde',
            'expansion': 'Battle for Azeroth'
        },
        'Zandalari Empire': {
            'faction': 'Horde',
            'expansion': 'Battle for Azeroth'
        },
        'Talanji\'s Expedition': {
            'faction': 'Horde',
            'expansion': 'Battle for Azeroth'
        },
        'Voldunai': {
            'faction': 'Horde',
            'expansion': 'Battle for Azeroth'
        },
        'Tortollan Seekers': {
            'faction': 'Neutral',
            'expansion': 'Battle for Azeroth'
        },
        'Champions of Azeroth': {
            'faction': 'Neutral',
            'expansion': 'Battle for Azeroth'
        },

        'Armies of Legionfall': {
            'faction': 'Neutral',
            'expansion': 'Legion'
        },
        'Army of the Light': {
            'faction': 'Neutral',
            'expansion': 'Legion'
        },
        'Argussian Reach': {
            'faction': 'Neutral',
            'expansion': 'Legion'
        },
        'Court of Farondis': {
            'faction': 'Neutral',
            'expansion': 'Legion'
        },
        'Dreamweavers': {
            'faction': 'Neutral',
            'expansion': 'Legion'
        },
        'Highmountain Tribe': {
            'faction': 'Neutral',
            'expansion': 'Legion'
        },
        'Talon\'s Vengeance': {
            'faction': 'Neutral',
            'expansion': 'Legion'
        },
        'The Nightfallen': {
            'faction': 'Neutral',
            'expansion': 'Legion'
        },
        'The Wardens': {
            'faction': 'Neutral',
            'expansion': 'Legion'
        },
        'Valarjar': {
            'faction': 'Neutral',
            'expansion': 'Legion'
        },

        'Hand of the Prophet': {
            'faction': 'Alliance',
            'expansion': 'Warlords Of Draenor'
        },
        'Vol\'jin\'s Headhunters': {
            'faction': 'Horde',
            'expansion': 'Warlords Of Draenor'
        },
        'Order of the Awakened': {
            'faction': 'Neutral',
            'expansion': 'Warlords Of Draenor'
        },
        'The Saberstalkers': {
            'faction': 'Neutral',
            'expansion': 'Warlords Of Draenor'
        },
        'Arakkoa Outcasts': {
            'faction': 'Neutral',
            'expansion': 'Warlords Of Draenor'
        },
        'Council of Exarchs': {
            'faction': 'Alliance',
            'expansion': 'Warlords Of Draenor'
        },
        'Frostwolf Orcs': {
            'faction': 'Horde',
            'expansion': 'Warlords Of Draenor'
        },
        'Sha\'tari Defense': {
            'faction': 'Alliance',
            'expansion': 'Warlords Of Draenor'
        },
        'Laughing Skull Orc': {
            'faction': 'Horde',
            'expansion': 'Warlords Of Draenor'
        },
        'Steamwheedle Preservation Society': {
            'faction': 'Neutral',
            'expansion': 'Warlords Of Draenor'
        },
        'Wrynn\'s Vanguard': {
            'faction': 'Alliance',
            'expansion': 'Warlords Of Draenor'
        },
        'Vol\'jin\'s Spear': {
            'faction': 'Horde',
            'expansion': 'Warlords Of Draenor'
        },


        'The August Celestials': {
            'faction': 'Neutral',
            'expansion': 'Mists of Pandaria'
        },
        'The Anglers': {
            'faction': 'Neutral',
            'expansion': 'Mists of Pandaria'
        },
        'The Black Prince': {
            'faction': 'Neutral',
            'expansion': 'Mists of Pandaria'
        },
        'Golden Lotus': {
            'faction': 'Neutral',
            'expansion': 'Mists of Pandaria'
        },
        'Sunreaver Onslaught': {
            'faction': 'Horde',
            'expansion': 'Mists of Pandaria'
        },
        'Kirin Tor Offensive': {
            'faction': 'Alliance',
            'expansion': 'Mists of Pandaria'
        },
        'The Klaxxi': {
            'faction': 'Neutral',
            'expansion': 'Mists of Pandaria'
        },
        'The Lorewalkers': {
            'faction': 'Neutral',
            'expansion': 'Mists of Pandaria'
        },
        'Operation: Shieldwall': {
            'faction': 'Alliance',
            'expansion': 'Mists of Pandaria'
        },
        'Dominance Offensive': {
            'faction': 'Horde',
            'expansion': 'Mists of Pandaria'
        },
        'Order of the Cloud Serpent': {
            'faction': 'Neutral',
            'expansion': 'Mists of Pandaria'
        },
        'Forest Hozen': {
            'faction': 'Horde',
            'expansion': 'Mists of Pandaria'
        },
        'Pearlfin Jinyu': {
            'faction': 'Alliance',
            'expansion': 'Mists of Pandaria'
        },
        'Emperor Shaohao': {
            'faction': 'Neutral',
            'expansion': 'Mists of Pandaria'
        },
        'Shado-Pan': {
            'faction': 'Neutral',
            'expansion': 'Mists of Pandaria'
        },
        'Shado-Pan Assault': {
            'faction': 'Neutral',
            'expansion': 'Mists of Pandaria'
        },
        'The Tillers': {
            'faction': 'Neutral',
            'expansion': 'Mists of Pandaria'
        },


        'Avengers of Hyjal': {
            'faction': 'Neutral',
            'expansion': 'Cataclysm'
        },
        'Hellscream\'s Reach': {
            'faction': 'Horde',
            'expansion': 'Cataclysm'
        },
        'Baradin\'s Wardens': {
            'faction': 'Alliance',
            'expansion': 'Cataclysm'
        },
        'Wildhammer Clan': {
            'faction': 'Alliance',
            'expansion': 'Cataclysm'
        },
        'Dragonmaw Clan': {
            'faction': 'Horde',
            'expansion': 'Cataclysm'
        },
        'Guardians of Hyjal': {
            'faction': 'Neutral',
            'expansion': 'Cataclysm'
        },
        'Ramkahen': {
            'faction': 'Neutral',
            'expansion': 'Cataclysm'
        },
        'The Earthen Ring': {
            'faction': 'Neutral',
            'expansion': 'Cataclysm'
        },
        'Therazane': {
            'faction': 'Neutral',
            'expansion': 'Cataclysm'
        },



        '': {
            'faction': 'Neutral',
            'expansion': 'Wrath of the Lich King'
        },



    }


}

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