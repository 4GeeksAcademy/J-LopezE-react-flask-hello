import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
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
	

	const handleSubmitLogin = async (e) => {
		e.preventDefault();

		setTimeout(async () => {
			const isLoggedIn = await actions.login(user.email, user.password);
			if (!isLoggedIn) {
				alert("Usuario y contraseña incorrectos")
			} else {
				navigate("/logeedInUser");
			}
		}, 900);
	};

	return (
		<div className="container  home-login">
			<div className="row justify-content-center  m-5">
				<div className="col-12 col-sm-12 col-md-8 col-lg-6 col-xl-4">
					<div className="formulario-login p-4">
						<form onSubmit={handleSubmitLogin}>
							<div className="form form-grup">
								<div className="card-body">
									<h1 className="text-center mb-4">Login</h1>
									<div className="form-grup mb-3">
										<input
											id="email"
											className="email form-control form-control-lg"
											placeholder="Email"
											type="email"
											autoComplete="email"
											autoFocus
											value={user.email}
                                            name="email"
											onChange={(e) => handleChange(e)}
											required
										/>
									</div>
									<div className="form-grup mb-4">
										<input
											type="password"
											className="pass form-control form-control-lg"
											id="inputPassword"
											value={user.password}
                                            name="password"
											placeholder="Password"
											onChange={(e) => handleChange(e)}
											required
										/>
									</div>
									<div className="form-grup d-flex justify-content-center mb-4">
										<button className="entrar" type="submit">
											Ingresar
											<i className="fa-solid fa-right-to-bracket ms-2"></i>
										</button>
									</div>
									<div className="registro text-center">
										¿No tienes Cuenta? <Link to={"/register"}>Regístrate</Link>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
