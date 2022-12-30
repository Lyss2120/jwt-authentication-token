const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			email: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				const token = localStorage.getItem("token");

				var myHeaders = new Headers();
				myHeaders.append("Authorization", `Bearer ${token}`);
				var requestOptions = {
				  headers: myHeaders,
				  redirect: "follow",
				};

				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello", requestOptions)
					const data = await resp.json()
					setStore({ message: data.message, user: data.user })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			syncTokenFromLocalStorage: () => {
				const getToken = localStorage.getItem("token");
				if ( getToken && getToken != "" && getToken != undefined ) ;
				setStore({ token: getToken}); //cambia el valor de la variable en el store al token que esta trayendo en getToken
			},
			
			logout: () => {
				localStorage.removeItem("token")
				console.log("logout");
				setStore({ token: null}) //cambia el valor de la variable en el store al token que esta trayendo en actionToken
			},			

			login: async (email, password) => {
				var myHeaders = {"Content-Type": "application/json"};		
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
				try{
					const resp = await fetch("https://3001-4geeksacade-reactflaskh-65u2s5zefsl.ws-us80.gitpod.io/api/token", requestOptions)
					if(resp.status !== 200) {
						alert("There has been some error")
						return false;
					}
					const data = await resp.json(); 
						console.log("this came from the backend", data);
						
						localStorage.setItem('token', data.access_token);
						setStore({ token: data.access_token})//, email: data.email
						return true;
				}
				catch(error){
					console.error('there has been an error at login', error);
				}				
			},

			// handleRegister: ( email1, password1) => {
			// 	console.log('registro exitoso email:', email1, 'pass:',password1);
			// },


			handleRegister: (email1, password1) => {			
				var myHeaders = {"Content-Type": "application/json"};		
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
				fetch(process.env.BACKEND_URL + "/api/register",requestOptions)
				  .then((response) => {response.json(), console.log(response);})
				 
				  .then((result) => alert("Usuario registrado con éxito "+ result))
				  .catch((error) => console.log("error", error))
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
