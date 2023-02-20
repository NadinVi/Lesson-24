// Вверху страницы находится инпут и кнопка. 
// Пользователь может ввести туда username любого пользователя гитхаб. 
// Когда пользователь ввел логин, он может нажать на кнопку "Найти". 
// В этот момент приложение должно отправить
// запрос на API Github и получить информацию о пользователе

// Данные для пользователя берем из запроса https://api.github.com/users/{{login}} , 
// где логин - это логин выбраного пользователя.
// Н-р для пользователя vladimirkr url будет https://api.github.com/users/vladimirkr
// После получения данных нужно показать аватар пользователя (свойство avatar_url), 
// количество репозиториев (свойство public_repos), 
// количество фоловеров (свойство followers) и количество наблюдаемых (свойство following)

// Если такого юзернейма не существует гитхаб вернет ошибку (404). Попробуйте обработать ее в .catch


const button = document.getElementById("button");
const input = document.getElementById("username");

button.addEventListener("click", () => {
    controller(`https://api.github.com/users/${input.value}`);
   })

async function controller(action) {
    try {
        const response = await fetch(action);
        if(response.ok) {
            const data = await response.json();
            //console.log(data);
            renderInfo(data);
        } else {
            throw new Error(response.status)
        }
        

        } catch(err) {
            //console.log(err);
            alert("User is not found");
    }
}

function renderInfo(data) {
    const container = document.querySelector(".container");

    const avatar = document.createElement("img");
    const repositoreis = document.createElement("p");
    const followers = document.createElement("p");
    const following = document.createElement("p");

    avatar.src = `${data.avatar_url}`;
    avatar.alt = "Avatar";
    repositoreis.innerText = `Repositories: ${data.public_repos}`;
    followers.innerText = `Followers: ${data.followers}`;
    following.innerText = `Following: ${data.following}`;

    container.append(avatar);
    container.append(repositoreis);
    container.append(followers);
    container.append(following);
}

