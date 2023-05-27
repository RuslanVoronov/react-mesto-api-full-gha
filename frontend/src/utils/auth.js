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
        mode: 'no-cors',
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
        mode: 'no-cors',
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
        mode: 'no-cors',
        method: 'GET',
        cookies: token,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })
        .then(checkResponse)
}