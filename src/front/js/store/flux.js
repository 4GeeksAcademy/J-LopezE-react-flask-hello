const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

		},
		actions: {
			register: async (
				email,
				password,

			) => {
				try {
					const response = await fetch(
						process.env.BACKEND_URL + "api/signup",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								email,
								password,

							}),
						}
					);
					if (!response.ok) {
						console.log(response)
					}
					const data = response.json();
					return data;
				} catch (error) {
					console.log(error);
				}
			},
			//LOGIN USER//
			login: async (email, password) => {
				const actions = getActions();
				try {
					const response = await fetch(
						process.env.BACKEND_URL + "api/signin",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ email, password }),
						}
					);
					console.log(response)
					if (!response.ok) {
						return false;
					}
					const data = await response.json();
					localStorage.setItem("token", data.token);

					return true;
				} catch (error) {
					console.log(error);
				}
			},

			logout: () => {
				localStorage.removeItem("token");
			},

		}
	};
};

export default getState;
