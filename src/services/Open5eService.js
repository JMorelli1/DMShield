import axios from "axios";

const baseUrl = process.env.REACT_APP_OPEN5E_BASE_URL;

export const getData = (path, size) => {
  return axios
    .get(`${baseUrl}${path}?limit=${size}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const getSpell = (spell) => {
  return axios
    .get(`${baseUrl}/spells/${spell}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
