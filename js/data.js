function host(endpoint) {
    return `https://api.backendless.com/D0A045F9-53B0-D3B3-FFAF-D69BAD02C500/4E5EF24F-9B73-4631-BC50-AFE4F89EC308/${endpoint}`
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movies',
    MOVIE_BY_ID: 'data/movies/'
}

async function register(username, password) {
    return (await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();
}
async function login(username, password) {
    const result = await (await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

    return result;
}

function logout() {
    const token = localStorage.getItem('userToken')

    return fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });
}

// get all movies
async function getMovies() {
    const token = localStorage.getItem('userToken')

    return (await fetch(host(endpoints.MOVIES), {
        headers: {
            'user-token': token
        }
    })).json()
}

// get movie by ID
async function getMovieById(id) {
    const token = localStorage.getItem('userToken')

    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        headers: {
            'user-token': token
        }
    })).json()
}

// create movie
async function createMovie(movie) {
    const token = localStorage.getItem('userToken')

    return (await fetch(host(endpoints.MOVIES), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();
}

// edit movie
async function updateMovie(id, updatedProps) {
    const token = localStorage.getItem('userToken')

    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();
}

// delete movie
async function deleteMovie(id) {
    const token = localStorage.getItem('userToken')

    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();
}

// get movies by user ID
async function getMoviesByOwner(ownerId) {
    const token = localStorage.getItem('userToken')

    return (await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();
}

// buy tickets
async function buyTicket(id, updatedProps) {
    const token = localStorage.getItem('userToken')
    // await buyTicket('E5E615E7-D728-4DE7-9489-2273EDF8D87F', {tickets: (tickets--)})
    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();
}