const BASE_URL = "https://api.mesto15.nomoredomains.rocks";

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(console.log(`Ошибка: ${res.status}`));
}

export const register = ({ email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
        credentials: "include",
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse)
}

export const authorize = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        credentials: "include",
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse)
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        credentials: "include",
        method: 'GET',
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
    })
        .then(checkResponse)
}