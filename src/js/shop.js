import { throttle } from 'throttle-debounce';

import { instruments } from "./instruments";
import { common } from './common';
import { createMarkup } from '../helpers/createMarkup';
import { createModal } from "../helpers/createModal";
import { findProduct } from "../helpers/findProduct";


const searchInput = document.querySelector('.js-search');
const list = document.querySelector('.js-list');



const favouriteArr = JSON.parse(localStorage.getItem(common.KEY_FAVOURITE)) ?? [];
const cartArr = JSON.parse(localStorage.getItem(common.KEY_CART)) ?? [];


createMarkup(instruments, list);

list.addEventListener('click', onClick);
searchInput.addEventListener('input', throttle(500, onSearch))
// searchInput.addEventListener('input', onSearch)


function onSearch(evt) {
    
    const searchValue = evt.target.value.trim().toLowerCase();
    console.log(searchValue);
    const searchProduct = instruments.filter(({ name }) => name.toLowerCase().includes(searchValue));
    
    createMarkup(searchProduct, list)
}

function onClick(evt) {
    evt.preventDefault();

    if (evt.target.classList.contains("js-info")) {
        const product = findProduct(evt.target, instruments);
        createModal(product);

    }

    if (evt.target.classList.contains("js-cart")) {
        const product = findProduct(evt.target, instruments);
        cartArr.push(product);
        localStorage.setItem(common.KEY_CART, JSON.stringify(cartArr));
    }

    if (evt.target.classList.contains("js-favourite")) {
        const product = findProduct(evt.target, instruments);
        const inStorage = favouriteArr.some(({ id }) => id === product.id);
        if ( inStorage) {
            return;
        } 
  
            favouriteArr.push(product);
            localStorage.setItem(common.KEY_FAVOURITE, JSON.stringify(favouriteArr));
        
    }

}




