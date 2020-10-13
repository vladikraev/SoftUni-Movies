import { beginRequest, endRequest, showInfo } from './notification.js'

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

export async function register(username, password) {
    beginRequest()

    const result = (await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();

    endRequest()

    return result;
}

export async function login(username, password) {
    beginRequest()

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

    endRequest()

    return result;
}

export async function logout() {
    beginRequest();

    const token = localStorage.getItem('userToken')
    localStorage.removeItem('userToken');

    const result = fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });

    endRequest();

    return result;
}

// get all movies
export async function getMovies(search) {
    beginRequest();

    const token = localStorage.getItem('userToken');

    let result;

    if (!search) {
        result = (await fetch(host(endpoints.MOVIES), {
            headers: {
                'user-token': token
            }
        })).json()
    } else {
        result = (await fetch(host(endpoints.MOVIES + `?where=${escape(`genres LIKE '%${search}%'`)}`), {
            headers: {
                'user-token': token
            }
        })).json()
    }

    endRequest();

    return result;
}

// get movie by ID
export async function getMovieById(id) {
    beginRequest();

    const token = localStorage.getItem('userToken')

    const result = (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        headers: {
            'user-token': token
        }
    })).json()

    endRequest();

    return result;
}

// create movie
export async function createMovie(movie) {
    beginRequest();

    const token = localStorage.getItem('userToken')

    const result = (await fetch(host(endpoints.MOVIES), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();

    endRequest();

    return result;
}

// edit movie
export async function updateMovie(id, updatedProps) {
    beginRequest();

    const token = localStorage.getItem('userToken')

    const result = (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();

    endRequest();

    return result;
}

// delete movie
export async function deleteMovie(id) {
    beginRequest();

    const token = localStorage.getItem('userToken')

    const result = (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();

    endRequest();

    return result;
}

// get movies by user ID
export async function getMoviesByOwner() {
    beginRequest();

    const token = localStorage.getItem('userToken');
    const ownerId = localStorage.getItem('userId')

    const result = (await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();

    endRequest();

    return result;
}

// buy tickets
export async function buyTicket(movie) {
    const newTickets = movie.tickets - 1;
    const movieId = movie.objectId;

    return updateMovie(movieId, { tickets: newTickets });
}