const axios = require("axios");
const URL = "https://rym2.up.railway.app/api/character";
const APY_KEY = "henrystaff";

const getCharById = async (req, res) => {
    try {
        const characterId = req.params.id;
        const { data } = await axios.get(`${URL}/${characterId}?key=${APY_KEY}`);
        const {
            id, status, name, species, origin, image, gender, location
        } = data;
        const character = {
            id, status, name, species, origin, image, gender, location
        };
        return character.name
            ? res.json(character)
            : res.status(404).send("Not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = getCharById;