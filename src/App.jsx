import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Cards from './components/cards/Cards.jsx';
import Nav from './components/nav/Nav.jsx'
import About from './components/about/About.jsx';
import Detail from './components/detail/Detail.jsx';
import NotFound from './components/notfound/NotFound.jsx';


const URL = "https://rym2.up.railway.app/api/character";
const APY_KEY = "henrystaff";

function App() {

   const [characters, setCharacters] = useState([]);
   const navigate = useNavigate();

   function onSearch(id) {
      const characterId = characters.filter(
         char => char.id === Number(id)
      )

      if (characterId.length) {
         return alert(`${characterId[0].name} ya existe`);
      }

      axios(`${URL}/${id}?key=${APY_KEY}`).then(
         ({ data }) => {
            if (data.name) {
               setCharacters((oldChars) => [...oldChars, data]);
            } else {
               window.alert('¡El ID debe ser un número entre 1 y 826!');
            }
         }
      );

      navigate("/home");


   }

   const onClose = id => {
      setCharacters(characters.filter(char => char.id !== Number(id)))
   }

   return (
      <div className='App'>
         <Nav onSearch={onSearch} />
         <Routes>
            <Route
               path="/home"
               element={<Cards characters={characters} onClose={onClose} />}
            />
            <Route
               path="/About"
               element={<About />}
            />
            <Route
               path="/detail/:id"
               element={<Detail />}
            />
            <Route
               path="*"
               element={<NotFound />}
            />
         </Routes>
      </div>
   );
}

export default App;