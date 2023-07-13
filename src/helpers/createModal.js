import * as basicLightbox from 'basiclightbox';
// import "basicLightbox/dist/basicLightbox.min.css";

import { closeModal } from './closeModal';

function createModal(product) {
    const options = {
        handler: null,
        onShow(instance) {
            console.log(this);
            this.handler = closeModal.bind(instance)
            document.addEventListener('keydown', this.handler)
        },
        onClose() {
            document.removeEventListener('keydown', this.handler)
        },
    };


    const instance = basicLightbox.create(`
    <div class="product-modal">
        <img src="${product.img}" alt="${product.name}" width="200"/>
        <h2>${product.name}</h2>
        <h3>Price: ${product.price} uah</h3>
        <p>${product.description}</p>
        <div>
            <button type="button" class="js-favourite" >Add to favourite</button>
            <button type="button" class="js-cart">Add to cart</button>
        </div>
    </div>
        `, options)

instance.show();
}


        
export { createModal };