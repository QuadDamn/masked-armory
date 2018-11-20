const { ObjectId } = require('mongodb');

process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
let config = require('config');

const blizzard = require('blizzard.js').initialize({
    apikey: config.get('wow_api_key')
});

// There is not a way to build these counts dynamically at the moment,
// so we have to get these counts of the game directly.
const totalAchievementCounts = {
    'Character': 34,
    'Quests': 321,
    'Exploration': 249,
    'Player vs. Player': 259,
    'Dungeons & Raids': 1033,
    'Professions': 267,
    'Reputation': 114,
    'World Events': 233,
    'Pet Battles': 148,
    'Collections': 99
};

/**
 * Handles the creation of the actual armory by pulling information from Blizzard's API for WoW.
 */
function createArmory(req, res) {

    console.log('hello world');

    const realm = req.body.serverName.replace(/\\/g, '');
    const name = req.body.characterName;
    const origin = req.body.region;
    const locale = 'en_US';
    const keys = 'stats,professions,titles,items,reputation,mounts,pets,achievements,progression,pvp';

    blizzard.wow.character(keys, {realm, name, origin, locale})
        .then(async (response) => {
            const armoryData = response.data;

            console.log(armoryData);

            // ****** START :: Handling Raid Zone Progression for BfA Raid Content ********

            // Current tier zones -- T18-T21 -- Legion Expansion
            const raidList = armoryData.progression.raids;
            const raidZones = ['Uldir'];

            const raidZoneData = raidZones.map((raidZone) => {
                for (let zone in raidList) {
                    if (raidList[zone].name == raidZone) {
                        return raidList[zone];
                    }
                }
            });

            delete armoryData['progression'];
            armoryData['progression'] = raidZoneData;

            // ****** END :: Handling Raid Zone Progression for BfA Raid Content ********

            // ****** START :: Achievement Manipulation ********

            let achievementsCompleted = armoryData.achievements.achievementsCompleted;
            let achievementList = await req.db.collection('achievements').findOne({"_id": ObjectId(config.get("achievements_object_id"))});

            console.log(achievementList);

            let achievementHeaders = achievementList.achievements;

            armoryData['achievementCounts'] = achievementHeaders.map((header) => {
                let headerName = header.name;
                let headersGrabFullDetails = ['Legacy', 'Feats of Strength'];

                let achCount = 0;
                let fullInfoAchievements = [];

                if (typeof header.achievements !== 'undefined') {
                    header.achievements.forEach((ach) => {
                        if (achievementsCompleted.includes(ach.id)) {
                            achCount++;

                            if (headersGrabFullDetails.includes(headerName)) {
                                fullInfoAchievements.push(ach);
                            }
                        }
                    });
                }

                if (typeof header.categories !== 'undefined') {
                    for (let category in header.categories) {
                        header.categories[category].achievements.forEach((ach) => {
                            if (achievementsCompleted.includes(ach.id)) {
                                achCount++;

                                if (headersGrabFullDetails.includes(headerName)) {
                                    fullInfoAchievements.push(ach);
                                }
                            }
                        });
                    }
                }

                return {
                    "headerName": headerName,
                    "achievementCount": achCount,
                    "achievementTotalCount": totalAchievementCounts[headerName],
                    "achievementDetails": fullInfoAchievements
                }
            });

            // We reformulated the achievement counts, so we don't need to store all of the achievement data anymore.
            delete armoryData['achievements'];

            // ****** END :: Achievement Manipulation ********

            // Need the origin to be in the data store so that we know where to pull
            // character image renders from the Vue side on armory display.
            armoryData['origin'] = origin;

            const armoryDataFormatted = {'data': armoryData};

            try {
                await req.db.collection('armories').insertOne(armoryDataFormatted);
                let objectId = armoryDataFormatted._id;
                return res.status(200).send({ status: 'success', data: { profileId: objectId }});
            } catch (err) {
                console.log(err);
                return res.status(500).send({ status: 'error', message: err })
            }
        })
        .catch((err) => {
            console.log('boo');
            console.log(err);
        });
}

module.exports = createArmory;