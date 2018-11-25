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

        if (!isEmpty(document)) {
            return res.status(200).send({ status: 'success', data: { armory: document.data }});
        } else {
            return res.status(404).send({ status: 'error', message: 'Armory not found.' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 'error', message: err });
    }
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