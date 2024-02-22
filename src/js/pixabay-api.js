// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const ourForm = document.querySelector(".form");
const KEY = '42515741-a33332df4257bc0cfcc74fb38';
const pixabayUrl = 'https://pixabay.com/api/'; 

ourForm.addEventListener("submit", getPhoto);

function getPhoto(event) {
    event.preventDefault();
    const userSearch = ourForm.search.value;
    console.log(userSearch);
    fetch(`${pixabayUrl}?key=${KEY}&q=${userSearch}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(date => {
            console.log(date);
        })
        .catch(error => {
            console.log(error);
        });
};

// https://pixabay.com/api/?key=42515741-a33332df4257bc0cfcc74fb38&q=yellow+flowers&image_type=photo

// Список параметрів рядка запиту, які тобі обов'язково необхідно вказати:

// key — твій унікальний ключ доступу до API.
// q — слово для пошуку. Те, що буде вводити користувач.
// image_type — тип зображення. Потрібні тільки фотографії, тому постав значення photo.
// orientation — орієнтація фотографії. Постав значення horizontal.
// safesearch — фільтр за віком. Постав значення true.