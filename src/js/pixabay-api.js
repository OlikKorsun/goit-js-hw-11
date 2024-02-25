// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

// імпортуємо функцію createMarkup з файла render-functions.js
import { galleryImg, createMarkup } from "./render-functions";
import { ourForm, paramPixabay } from "../main";

// запит який формується на основі введеного пошуку
export function getData() {
 return fetch(`${paramPixabay.url}?key=${paramPixabay.KEY}&q=${paramPixabay.q}&image_type=${paramPixabay.image_type}&orientation=${paramPixabay.orientation}&safesearch=${paramPixabay.safesearch}`)
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
                if (data.hits.length === 0) {
                    galleryImg.innerHTML = "";
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
                return iziToast.error({
                title: 'Error',
                message: `${error}`,
                messageColor: 'white',
                messageSize: '16',
                backgroundColor: 'red',
                theme: 'dark',
                position: 'topRight',
            });
            })
            .finally(() => {
            // в будь-якому варіанті обнуляємо поле інпут від старого запиту
            ourForm.reset();
        });   
}