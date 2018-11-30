const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;

process.env["NODE_CONFIG_DIR"] = __dirname + "/../config/";
const config = require('config');

const WOW_API_KEY = config.get('wow_api_key');
const url = `mongodb:://${config.get('db_username')}:${config.get('db_password')}@${config.get('db_connection_string')}`;
const dbName = config.get('db_name');

updateUsRealmList().then((res) => {
    console.log('Done updating US server list...');
}).catch((err) => {
    console.log(err);
});

updateEuRealmList().then((res) => {
    console.log('Done updating EU server list...');
}).catch((err) => {
    console.log(err);
});

async function updateUsRealmList() {
    const WOW_API_US_REALMS_URL = 'https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=' + WOW_API_KEY;

    try {
        let serverData = await axios.get(WOW_API_US_REALMS_URL);
        const serverList = serverData.data.realms;

        const usServerList = serverList.map((server) => {
            return {
                'name': server.name
            }
        });

        console.log(usServerList);

        const client = await MongoClient.connect(url);
        const collection = client.db(dbName).collection('usServerList');

        await collection.removeMany({});
        console.log('Removed all US servers to replenish with new data...');

        await collection.insertMany(usServerList)
    } catch (err) {
        throw err;
    }
}

async function updateEuRealmList() {
    const WOW_API_EU_REALMS_URL = 'https://eu.api.battle.net/wow/realm/status?locale=en_GB&apikey=' + WOW_API_KEY;

    try {
        let serverData = await axios.get(WOW_API_EU_REALMS_URL);
        const serverList = serverData.data.realms;

        const euServerList = serverList.map((server) => {
            return {
                'name': server.name
            }
        });

        const client = await MongoClient.connect(url);
        const collection = client.db(dbName).collection('euServerList');

        await collection.removeMany({});
        console.log('Removed all EU servers to replenish with new data...');

        await collection.insertMany(euServerList)
    } catch (err) {
        throw err;
    }
}