import { useState } from 'react';
import './App.css';
import Cards from './components/cards/Cards.jsx';
import Nav from './components/nav/Nav.jsx'
import axios from 'axios';
/*https://rym2.up.railway.app/api/character/10?key=henrystaff*/
const URL = "https://rym2.up.railway.app/api/character";
const APY_KEY = "henrystaff";

function App() {

   const [characters, setCharacters] = useState([]);

   function onSearch(id) {
      axios(`${URL}/${id}?key=${APY_KEY}`).then(
         ({ data }) => {
            if (data.name) {
               setCharacters((oldChars) => [...oldChars, data]);
            } else {
               window.alert('¡No hay personajes con este ID!');
            }
         }
      );
   }

   return (
      <div className='App'>
         <Nav onSearch={onSearch}/>         
         <Cards characters={characters} />         
      </div>
   );
}

export default App;