import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const list = document.querySelector('.gallery');


createMarkup(galleryItems, list);
const gallery = new SimpleLightbox('.gallery__link', { captionsData: "alt", captionDelay: 250 });


function createMarkup(arr, list) {
    const markup = arr.map(({ preview, original, description }) => `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img src="${preview}" alt="${description}" class="gallery__image">
            </a>
        </li>
    `).join('');

    list.insertAdjacentHTML('beforeend', markup);
}


