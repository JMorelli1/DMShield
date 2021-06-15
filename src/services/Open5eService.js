import axios from 'axios';

const baseUrl = process.env.REACT_APP_OPEN5E_BASE_URL

export const getMagicItems = (page) => {
    return axios.get(`${baseUrl}/magicitems?page=${page}`)
    .then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        return err;
    });
}

export const getSpells = (page) => {
    return axios.get(`${baseUrl}/spells?page=${page}`)
    .then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        return err;
    });
}

export const getMonsters = (page) => {
    return axios.get(`${baseUrl}/monsters?page=${page}`)
    .then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        return err;
    });
}

export const getWeapons = (page) => {
    return axios.get(`${baseUrl}/weapons?page=${page}`)
    .then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        return err;
    });
}
