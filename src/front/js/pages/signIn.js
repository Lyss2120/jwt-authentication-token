import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignIn = () => {
	const { store, actions } = useContext(Context);
	const [email1, setEmail1] = useState("");
	const [password1, setPassword1] = useState("");
	// const navigate = useNavigate()
	// const params = useParams();

	const handleRegister = () => {
		actions.handleRegister(email1, password1)
		console.log('validando datos en input:',email1, password1);
		// ahora guardar estos datos como un nuevo usuario en la api con un fetch post
	}


	return (

			<div className="text-center mt-5 alert-info text-secondary fs-3 py-5">
				<h1>Sign In</h1>
				<div className="pb-5">
					<input type="text" placeholder="email" value={email1} onChange={(e) => setEmail1(e.target.value)} />
					<input type="password" placeholder="password" value={password1} onChange={(e) => setPassword1(e.target.value)} />
					<button onClick={handleRegister}>Submit</button>
				</div>

			</div>
	);
};


