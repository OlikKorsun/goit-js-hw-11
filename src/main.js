// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// import "./js/pixabay-api"
// import "./js/render-functions"

import { getData } from "./js/pixabay-api";

export const ourForm = document.querySelector(".form");
const button = document.querySelector(".button");
const loader = document.querySelector(".loader");

export const paramPixabay = {
    url : "https://pixabay.com/api/",
    KEY : "42515741-a33332df4257bc0cfcc74fb38",
    q : "",
    image_type : "photo",
    orientation : "horizontal",
    safesearch : true,
}

loader.style.display = "none";
// підслуховувач на відправку
ourForm.addEventListener("submit", getPhoto);

// функція яка виконується в підслуховувачі
function getPhoto(event) {
    loader.style.display = "block";
    // забороняємо браузеру виконувати стандартні сценарії
    event.preventDefault();
    // зчитуємо які дані ввели в поле інпут
    paramPixabay.q = event.target.elements.search.value.trim();

    // перевірка на порожнє поле
    if (paramPixabay.q === "") {
        button.disabled = true;
        return iziToast.warning({
                title: "Look at me",
                message: `Ви не ввели що треба шукати`,
                messageColor: 'black',
                messageSize: '16',
                backgroundColor: 'orange',
                theme: 'dark',
                position: 'topRight',
        });
        } else {
        button.disabled = false;
        getData();
    };
};