const { ObjectId } = require('mongodb');
const WowArmory = require('wow-armory.js');

process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
let config = require('config');

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
async function createProfile(req, res) {
    const serverName = req.body.serverName.replace(/\\/g, '');
    const characterName = req.body.characterName;
    const region = req.body.region;

    try {
        const armory = new WowArmory(
            config.get('bnet_id'),
            config.get('bnet_secret'),
            config.get('bnet_region')
        );

        let response = await armory.getCharacter(region, serverName, characterName);

        const armoryData = response.data;

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
        armoryData['origin'] = region;

        const armoryDataFormatted = {'data': armoryData};

        try {
            await req.db.collection('armories').insertOne(armoryDataFormatted);
            let objectId = armoryDataFormatted._id;
            return res.status(200).send({ status: 'success', data: { profileId: objectId }});
        } catch (err) {
            console.log(err);
            return res.status(500).send({ status: 'error', message: err });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 'error', message: err });
    }
}

module.exports = createProfile;