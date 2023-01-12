import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	useEffect(() => {
		if (store.token && store.token != "" && store.token != undefined)
			actions.getMessage();
	}, [store.token])


	return (
		<div className="text-center mt-5 py-2 alert-info">
			<div>
				<iframe src="https://giphy.com/embed/KiMBUPZUhUg4HRV6PW" height="200" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/hello-hi-hey-KiMBUPZUhUg4HRV6PW">via GIPHY</a></p>
			</div>

			<div className="alert alert-info text-secondary fs-3">
				{store.token && store.token != "" && store.token != undefined ?
					<Link to="/privada" className="text-decoration-none text-secondary"><h2>Welcome {store.user}!! </h2>{store.message}</Link>
					:
					<div>
						<h1>Bienvenido!</h1>
						<Link to="/login" className="text-decoration-none text-secondary">
							<span> Inicia sesión </span>
						</Link>
						<Link to="/signIn" className="text-decoration-none text-secondary" > 
						<span> o Regístrate </span>
						</Link>
						<span>para continuar</span>
					</div>
				}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
