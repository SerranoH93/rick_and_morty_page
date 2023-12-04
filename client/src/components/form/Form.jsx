import React, { useState } from "react";
import validation from "../../utils/validation";
const banner = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/2560px-Rick_and_Morty.svg.png";


export default function Form(props){

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        email: "Ingrese su email",
        password: "Ingrese su password"
    });

    const handleChange = (event) => {
        const { name, value} = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
        setErrors(validation({
            ...userData,
            [name]: value
        }));
    }

    const handleSubmint = event => {
        event.preventDefault();
        props.login(userData);
    }


    return (
        <div>
            <img 
                src={banner} 
                style={{width:"300px"}} 
                alt={banner}
            />

            <form onSubmit={handleSubmint}>
                <label>Email:</label>
                <input 
                    type="text"
                    key="email"
                    name="email"
                    value={userData.email}
                    placeholder="Ingresar email..."
                    onChange={handleChange} 
                />
                <p style={{color: "coral"}}>{errors.email ? errors.email : null}</p>
                <br />

                <label>Password:</label>
                <input 
                    type="password" 
                    key="password"
                    name="password"
                    value={userData.password}
                    placeholder="Ingresar contraseña..."
                    onChange={handleChange} 
                />
                <p style={{color: "coral"}}>{errors.password && errors.password}</p>
                <hr />

                <button 
                    type="submit"
                    disabled={ errors.email || errors.password}
                >Enviar</button>

            </form>
        </div>
    )
}