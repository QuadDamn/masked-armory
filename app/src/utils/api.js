import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export function getProfile(profileId) {

}

export function createProfile(data) {

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