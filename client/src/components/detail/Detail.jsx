import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const URL = "https://rym2.up.railway.app/api/character";
const APY_KEY = "henrystaff";

export default function Detail(props) {

    const {id} = useParams();
    const [character, setCharacter] = useState({});
    useEffect(() => {
        axios(`${URL}/${id}?key=${APY_KEY}`).then(
            ({ data }) => {
                if (data.name) {
                    setCharacter(data);
                } else {
                    window.alert('No hay personajes con ese ID');
                }
            }
        );
        return setCharacter({});
    }, [id]);

    return (
        <div>
            <h1>Detail</h1>    
            <h2>{character.name}</h2>
            <img src={character.image} alt={character.image} />
            <h2>Status: {character.status}</h2>
            <h2>Species: {character.species}</h2>
            <h2>Gender: {character.gender}</h2>
            <h2>Origin: {character.location?.name}</h2>        
        </div>
    );
} 