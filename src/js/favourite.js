import { common } from './common';
import { createMarkup } from '../helpers/createMarkup';
import { createModal } from "../helpers/createModal";
import { findProduct } from "../helpers/findProduct";

const list = document.querySelector('.js-list');
const favourite = JSON.parse(localStorage.getItem(common.KEY_FAVOURITE)) ?? [];

createMarkup(favourite, list);

list.addEventListener('click', onClick);

function onClick(evt) {
    evt.preventDefault();

    if (evt.target.classList.contains("js-info")) {
        const product = findProduct(evt.target, favourite);
        createModal(product);
    }

    if (evt.target.classList.contains("js-cart")) {
        const product = findProduct(evt.target, favourite);
        cartArr.push(product);
        localStorage.setItem(common.KEY_CART, JSON.stringify(cartArr));
    }
}