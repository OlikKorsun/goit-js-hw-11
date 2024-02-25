// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

import { createMarkup } from "./render-functions";

const ourForm = document.querySelector(".form");
const button = document.querySelector(".button");
const paramPixabay = {
    url : "https://pixabay.com/api/",
    KEY : "42515741-a33332df4257bc0cfcc74fb38",
    q : "",
    image_type : "photo",
    orientation : "horizontal",
    safesearch : true,
}

ourForm.addEventListener("submit", getPhoto);

function getPhoto(event) {
    galleryImg.innerHTML = "";
    event.preventDefault();
    paramPixabay.q = event.target.search.value.trim();

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
        fetch(`${paramPixabay.url}?key=${paramPixabay.KEY}&q=${paramPixabay.q}&image_type=${paramPixabay.image_type}&orientation=${paramPixabay.orientation}&safesearch=${paramPixabay.safesearch}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
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
                createMarkup(data);
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            ourForm.reset();
        });
    };
};