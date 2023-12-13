/*
const axios = require("axios");
const URL = "https://rym2.up.railway.app/api/character";
const APY_KEY = "henrystaff";

const getCharById = (res, id) => {
    axios(`${URL}/${id}?key=${APY_KEY}`)
    //* Retorna una PROMESA => pending...
    .then(response => response.data)
    .then(data => {
        //* {id, name, status, ...}
        const character ={
            id: data.id,
            name: data.name,
            gender: data.gender,
            species: data.species,
            origin: data.origin,
            image: data.image,
            status: data.status,
            location: data.location
        };
        return res 
        .writeHead(200, { "Content-Type": "application/json" })
        .end(JSON.stringify(character));
    })
    .catch(error => {
        return res 
        .writeHead(500, { "Content-Type": "text/plain" })
        .end(error.message)
    })
}

module.exports = getCharById;
*/

const axios = require("axios");
const URL = "https://rym2.up.railway.app/api/character";
const APY_KEY = "henrystaff";

const getCharById = (req, res) => {
    const id = req.params.id;
    axios
        .get(`${URL}/${id}?key=${APY_KEY}`)//* Promise pending
        .then(({ data }) => {
            const {
                id, status, name, species, origin, image, gender, location
            }= data;
            const character = {
                id, status, name, species, origin, image, gender, location
            };
            //* character = {id, name,...}
            return character.name ? res.json(character) : res.status(404).send("Not fount")
        })
        .catch(error => {
            return res.status(500).send(error.message);
        });

};

module.exports = getCharById;