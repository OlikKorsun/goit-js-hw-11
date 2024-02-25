// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

// імпортуємо функцію createMarkup з файла render-functions.js
import { createMarkup } from "./render-functions";

const ourForm = document.querySelector(".form");
const button = document.querySelector(".button");
const loader = document.querySelector(".loader");

const paramPixabay = {
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
    paramPixabay.q = event.target.search.value.trim();

    // перевірка на порожнє поле
    if (paramPixabay.q === "") {
        button.disabled = true;
        iziToast.warning({
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
        // запит який формується на основі введеного пошуку
        fetch(`${paramPixabay.url}?key=${paramPixabay.KEY}&q=${paramPixabay.q}&image_type=${paramPixabay.image_type}&orientation=${paramPixabay.orientation}&safesearch=${paramPixabay.safesearch}`)
            .then(response => {
            // ловимо 404 помилку або повертаємо 
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
            })
            // отриманий об'єкт вже розджейсонений і готовий для використання
            .then(data => {
            // перевірка чи знайшло за запитом картинки
            if (data.hits.length === 0 ) {
                return iziToast.error({
                title: 'Error',
                message: `Sorry, there are no images matching your search query. Please try again!`,
                messageColor: 'white',
                messageSize: '16',
                backgroundColor: 'red',
                theme: 'dark',
                position: 'topRight',
            });
            } else {
                // якщо знайшло - то передаємо у функцію об'єкт
                createMarkup(data);
            }
            })
            .catch(error => {
            // ловимо помилки
            console.log(error);
            })
            .finally(() => {
            // в будь-якому варіанті обнуляємо поле інпут від старого запиту
            ourForm.reset();
        });
    };
};