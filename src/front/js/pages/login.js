import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";



export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate()


	const handleClick = () => {
		actions.login(email, password)		
		console.log("this is your user: ", store.user);
		console.log("this is your token: ", store.token);

	}
	//para redirigir al home si esta logueado?
	//  if (store.token && store.token != "" && store.token != undefined) navigate("/");

	return (
		<div className="text-center mt-5 alert-info text-secondary fs-3 py-5 ">
			<h1>Login</h1>
			{store.token && store.token != "" && store.token != undefined ?
				(
					<div className="container pb-5 ">					
						{ "Welcome " + store.user  + " you are logged in with this token: " + store.token }
					</div>
				) : (
					<>
					<div className=" pb-5 ">
						<input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
						<input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
						<button onClick={handleClick}>Login</button>
					</div>
					
					<Link to="/signIn" className="btn btn-outline-info fs-3 text-decoration-none text-secondary" >Or SignIn</Link>

					</>
				)}
		</div>
	);
};
