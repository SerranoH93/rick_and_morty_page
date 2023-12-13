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

   async function onSearch(id) {
      try {
         const characterId = characters.filter(
            char => char.id === Number(id)
         )
         if (characterId.length) {
            return alert(`${characterId[0].name} ya existe`);
         }

         const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`);
         if (data.name) {
            setCharacters([...characters, data]);
            navigate("/home");
         } else {
            alert('¡El ID debe ser un número entre 1 y 826!');
         }
      } catch (error) {
         alert(error.message);
      }
   }
   
   const onClose = id => {
      setCharacters(characters.filter(char => char.id !== Number(id)));
      dispatch(removeFav(id));
   }

   //* Login
   const [access, setAccess] = useState(false);
   const EMAIL = 'alejandro_0793@hotmail.com';
   const PASSWORD = '123456';

   async function login(userData) {
      try{
         const { email, password } = userData;
         const URL = 'http://localhost:3001/rickandmorty/login/';
         const { data } = await axios(URL + `?email=${email}&password=${password}`);
         if (data.access) {
            setAccess(data.access);
            navigate('/home');
         } else {
            alert("Credenciales incorrectas!");
         }
      } catch (error) {
         alert(error.message);
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