export const login = async(email, password, dispatch) => {
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }

    const response = await fetch('https://glorious-tribble-5gr7wjjpwp7w277xv-3001.app.github.dev/api/token', options)

    try {
        if(!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();
        console.log(data);
        dispatch({
            type: 'fetchToken',
            payload: data
        })

    }
    catch(error) {
        console.error('Error fetching token.', error)
    }
}

//create the jsx needed for the signup page
//add the necessary fetch on fetch.js