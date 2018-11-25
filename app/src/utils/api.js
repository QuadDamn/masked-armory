import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export async function getProfile(profileId) {
    const response = await axios.get(`${apiUrl}/profile/${profileId}`);
    return response.data;
}

export async function createProfile(data) {
    axios.post(`${apiUrl}/profile`, data).then((response) => {
        let data = response.data;
        return data.profileId;
    }).catch((err) => {
        console.log(err);
        return null;
        // this.armoryError = 'armoryCreateFailed';
        // createProfileButton.prop("disabled", false);
        // createProfileButton.text("Create Armory Profile");
    });
}

export async function getUsServerList() {
    try {
        const response = await axios.get(`${apiUrl}/server/us`);
        const servers = response.data.data.usServers;
        return servers.map((server) => {
            return server.name;
        });
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getEuServerList() {
    try {
        const response = await axios.get(`${apiUrl}/server/eu`);
        const servers = response.data.data.euServers;
        return servers.map((server) => {
            return server.name;
        });
    } catch (err) {
        console.log(err);
        return null;
    }
}