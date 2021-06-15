import axios from 'axios';

export const getMagicItems = (page) => {
    return axios.get(`https://api.open5e.com/magicitems?page=${page}`)
    .then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        return err;
    });
}