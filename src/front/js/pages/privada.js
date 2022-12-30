import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Privada = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		if (store.token && store.token != "" && store.token != undefined)
			actions.getMessage();
	}, [store.token])

	return (
		<div className="container text-center mt-5">
			{store.token && store.token != "" && store.token != undefined ?
				<div className="backgroundColor py-5 text_center">
					<h2>{store.message}</h2>
					<div>
						<iframe src="https://giphy.com/embed/IbOiFIJcSlHW2rgVUa" width="480" height="480" frameBorder="0" className="giphy-embed d-flex m-0 m-auto" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/thinkproducts-IbOiFIJcSlHW2rgVUa"></a></p>
					</div>
				</div>
				:
				<div className="alert-info py-5 text_center">
					<h2>Esta es una ruta privada, necesitas iniciar sesión para acceder</h2>
				</div>
			}


		</div>
	);
};
