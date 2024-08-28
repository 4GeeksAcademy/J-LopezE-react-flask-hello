import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";


const LogeedInUser = ()=>{
    const navigate = useNavigate();
    useEffect(()=>{
        const jwt = localStorage.getItem("token");
        if (!jwt) {
          navigate("/login");
          return;
        }
    });
return(
    <>
    <h1>Usuario logueado</h1>
    </>
)
}

export default LogeedInUser