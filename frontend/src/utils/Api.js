class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkServer(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: "include",
            method: "GET",
            headers: this._headers
        })
            .then(this._checkServer)
    }

    updateUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: "include",
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkServer)
    }

    updateAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            credentials: "include",
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link,
            })
        })
            .then(this._checkServer)
    }
    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: "include",
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.place,
                link: data.link
            })
        })
            .then(this._checkServer)
    }
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            credentials: "include",
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkServer)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: "include",
            method: "GET",
            headers: this._headers
        })
            .then(this._checkServer)
    }

    changeLikeCardStatus(cardId, isLiked) {

        if (!isLiked) {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                credentials: "include",
                method: "PUT",
                headers: this._headers
            })
                .then(this._checkServer)
        }

        {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                credentials: "include",
                method: "DELETE",
                headers: this._headers
            })
                .then(this._checkServer)
        };

    }

};
// https://api.mesto15.nomoredomains.rocks
const api = new Api({
    credentials: "include",
    baseUrl: 'https://api.mesto15.nomoredomains.rocks',
    headers: {
        authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json'
    }
});

export default api;