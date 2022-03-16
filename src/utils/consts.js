export const baseUrl = 'https://norma.nomoreparties.space/api'

export const checkResponse = (res) => {
    console.log(res)
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}