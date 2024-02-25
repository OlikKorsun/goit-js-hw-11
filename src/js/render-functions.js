// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryImg = document.querySelector(".gallery");
let htmlListOfGallery = ``;

// експортуємо створену функцію createMarkup щоб можна було її вставити в pixabay.js
export function createMarkup(data) {
  // обнуляємо розмітку сторінки якщо там є якісь попередні дані
    htmlListOfGallery = "";
    galleryImg.innerHTML = htmlListOfGallery;
  // відмальовка розмітки з картинками, 
  // де data - сам об'єкт, 
  // hits - масив у ньому який містить потрібні дані
  // largeImageUrl, tags, likes - потрібні дані
    for (let i = 0; i < data.hits.length; i++) {
        htmlListOfGallery += `<li class="gallery-item">
         <a class="gallery-link" href="${data.hits[i].largeImageURL}">
         <img class="gallery-image"
                src="${data.hits[i].webformatURL}"
                alt="${data.hits[i].tags}"/> </a>
        <ul class="stat">
          <li class="detals-stat">
           <h2 class="description">Likes</h2>
           <p class="stat-value">${data.hits[i].likes}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Views</h2>
           <p class="stat-value">${data.hits[i].views}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Comments</h2>
           <p class="stat-value">${data.hits[i].comments}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Downloads</h2>
           <p class="stat-value">${data.hits[i].downloads}</p>
          </li>
        </ul>
        </li>`
    }
    // відмальовуємо за раз все що сформували
    galleryImg.innerHTML = htmlListOfGallery;
    // відкривашка великих красивих картинок
    const lightbox = new SimpleLightbox('.gallery-item a', {
            captionsData: "alt",
            captionPosition: "bottom",
            captionDelay: 250,
    });

    lightbox.refresh();
}

