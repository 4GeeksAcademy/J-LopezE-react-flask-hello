import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/register.css"

const Register = ()=>{
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
      });

    function handleChange(e) {        
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user)
      }
    const handleSubmitRegister = async(e)=>{
      e.preventDefault();
      const response = await actions.register(
        user.email,
        user.password
      );
      console.log(response)
      if (response){

        alert("Usuario creado")
        navigate("/login");
      } else {
        alert("Error al crear el usuario")
      }

    }



    return(
        <form className="formulario" onSubmit={handleSubmitRegister}>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="form-grup">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                className="form-control form-control-lg"
                placeholder="Email"
                autoFocus
                value={user.email}
                name="email"
                onChange={(e) => handleChange(e)}
                required
              />
             
            </div>
          </div>
            <div className="col-md-6">
            <div className="form-grup">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                value={user.password}
                name="password"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
          </div>
          </div>
        <div className="text-center">
          <button type="submit" className="enter  mt-4">
           Registrar
          </button>
        </div>
        
      </form>
    )
}

export default Register