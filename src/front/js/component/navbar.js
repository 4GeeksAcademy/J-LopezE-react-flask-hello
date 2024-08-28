import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions } = useContext(Context);
	const navigate = useNavigate();
	const jwt = localStorage.getItem("token");
	function logout() {
		actions.logout();
		navigate("/");
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className={`${!jwt
							? "btn btn-primary"
							: " d-none"
							}`}>Iniciar sesión</button>
					</Link>

					<button
						className={`${!jwt
							? " d-none"
							: "btn btn-secondary"
							}`}
						onClick={logout}
					>
						Cerrar sesión
					</button>

				</div>
			</div>
		</nav>
	);
};
