const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			user: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			getMessage: async () => {
				const token = localStorage.getItem("token");
				var myHeaders = new Headers();
				myHeaders.append("Authorization", `Bearer ${token}`);
				var requestOptions = {
					headers: myHeaders,
					redirect: "follow",
				};

				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello", requestOptions)
					const data = await resp.json()
					setStore({ message: data.message, user: data.user.email })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			syncTokenFromLocalStorage: () => {
				const getToken = localStorage.getItem("token");
				if (getToken && getToken != "" && getToken != undefined);
				setStore({ token: getToken }); //cambia el valor de la variable en el store al token que esta trayendo en getToken
			},

			logout: () => {
				localStorage.removeItem("token")
				console.log("logout");
				setStore({ token: null }) //cambia el valor de la variable en el store al token que esta trayendo en actionToken
			},


			login: async (email, password) => {
				const store = getStore;
				const resp = await fetch("https://3001-lyss2120-jwtauthenticat-10cd6usbs5y.ws-us82.gitpod.io/api/token", {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": email,
						"password": password
					}),
					redirect: 'follow'
				})
				if (!resp.ok) throw Error("There was a problem in the login request")

				if (resp.status === 401) {
					throw ("Invalid credentials")
				}
				else if (resp.status === 400) {
					throw ("Invalid email or password format")
				}
				const data = await resp.json()
				console.log('data del login', data, 'token', data.token)

				setStore({ token: data.token })
				setStore({ user: data.user.email })

				console.log('data token store', store.token);
				console.log('user', data.user.email);
				localStorage.setItem('token', data.token);
				return data, 200
			},

			login2: async (email, password) => {
				var myHeaders = { "Content-Type": "application/json" };
				var raw = JSON.stringify({
					email: email,
					password: password
				});
				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: raw,
					redirect: 'follow'
				};
				try {
					const resp = await fetch("https://3001-4geeksacade-reactflaskh-65u2s5zefsl.ws-us80.gitpod.io/api/token", requestOptions)
					if (resp.status !== 200) {
						alert("There has been some error")
						return false;
					}
					const data = await resp.json();
					console.log("this came from the backend", data);

					localStorage.setItem('token', data.access_token);
					setStore({ token: data.access_token })//, email: data.email
					return true;
				}
				catch (error) {
					console.error('there has been an error at login', error);
				}
			},


			handleRegister: (email1, password1) => {
				var myHeaders = { "Content-Type": "application/json" };
				var raw = JSON.stringify({
					email: email1,
					password: password1
				});
				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: raw,
					redirect: 'follow'
				}
				fetch(process.env.BACKEND_URL + "/api/register", requestOptions)
					.then((response) => { response.json(), console.log(response); })

					.then((result) => alert("Usuario registrado con éxito " + result))
					.catch((error) => console.log("error", error))
			}
		}
	};
};

export default getState;
