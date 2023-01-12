import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/" className=" fs-4 text-decoration-none">
					<span className="navbar-brand fs-3 purple mb-0">Home</span>
				</Link>
				<div className="ml-auto">
					{!store.token ?
						<Link to="/login">
							<button className="btn btn-outline-info fs-5">Login</button>
						</Link>
						:						
						<button className="btn btn-outline-info fs-5" onClick={()=> actions.logout()}>Logout</button>
					}
				</div>
			</div>
		</nav>
	);
};
