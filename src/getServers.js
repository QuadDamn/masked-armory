/**
 * Gets the entire US server list.
 */
async function getUsServers(req, res)
{
    const collection = req.db.collection('usServerList');

    try {
        const servers = await collection.find({}).toArray();

        if (servers.length !== 0) {
            return res.status(200).send({ status: 'success', data: { usServers: servers }});
        } else {
            return res.status(404).send({ status: 'error', message: 'Error retrieving US server list.' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 'error', 'message': err });
    }
}

/**
 * Gets the entire EU server list.
 */
async function getEuServers(req, res)
{
    const collection = req.db.collection('euServerList');

    try {
        const servers = await collection.find({}).toArray();

        if (servers.length !== 0) {
            return res.status(200).send({ status: 'success', data: { euServers: servers }});
        } else {
            return res.status(404).send({ status: 'error', message: 'Error retrieving EU server list.' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 'error', message: err });
    }
}

module.exports = {
    getUsServers,
    getEuServers
};