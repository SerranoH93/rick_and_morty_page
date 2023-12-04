import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFav } from './redux/actions.js';
import axios from 'axios';
import About from './components/about/About.jsx';
import Cards from './components/cards/Cards.jsx';
import Detail from './components/detail/Detail.jsx';
import Favorites from './components/favorites/Favorites.jsx'
import Form from './components/form/Form.jsx';
import Nav from './components/nav/Nav.jsx'
import NotFound from './components/notfound/NotFound.jsx';


const URL = "https://rym2.up.railway.app/api/character";
const APY_KEY = "henrystaff";

function App() {
   
   const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useDispatch();

   const [characters, setCharacters] = useState([]);

   function onSearch(id) {
      const characterId = characters.filter(
         char => char.id === Number(id)
      )

      if (characterId.length) {
         return alert(`${characterId[0].name} ya existe`);
      }

      //axios(`${URL}/${id}?key=${APY_KEY}`)
      axios(`http://localhost:3001/rickandmorty/character/${id}`)
      .then(
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
      setCharacters(characters.filter(char => char.id !== Number(id)));
      dispatch(removeFav(id));
   }

   //* Login
   const [access, setAccess] = useState(false);
   const EMAIL = 'alejandro_0793@hotmail.com';
   const PASSWORD = '123456';

   function login(userData) {
      if (userData.password === PASSWORD && userData.email === EMAIL) {
         setAccess(true);
         navigate('/home');
      } else {
         alert("Credenciales incorrectas!");
      }
   }

   useEffect(() => {
      !access && navigate('/');      
   }, [access]);

   function logout() {
      setAccess(false);
   }

   return (
      <div className='App'>
         {
         location.pathname !== "/" && <Nav onSearch={onSearch} logout={logout} />
         }         
         <Routes>
            <Route 
               path='/'
               element={<Form login={login} />}
            />
            <Route
               path="/home"
               element={<Cards characters={characters} onClose={onClose} />}
            />
            <Route
               path="/about"
               element={<About />}
            />
            <Route
               path="/detail/:id"
               element={<Detail />}
            />
            <Route
               path="/favorites"
               element={ <Favorites onClose={onClose} />}
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