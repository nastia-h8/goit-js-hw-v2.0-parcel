function createMarkup(arr, list) {
    let markup;
    if (arr.length) {
            markup = arr.map(({ id, img, name }) =>
        `<li data-id="${id}" class="js-card instrument-card">
            <img src="${img}" alt="${name}" width="200" />
            <h2>${name}</h2>
            <p><a href="#" class="js-info">More information</a></p>
            <button type="button" class="js-favourite" >Add to favourite</button>
            <button type="button" class="js-cart" >Add to cart</button>
        </li>`).join('');
    } else {
        markup = `<li class="instrument-card-default">
            <img src="https://members.hpd-collaborative.org/global_graphics/default-store-350x350.jpg" alt="404" width="350" />
            <p>Wishlist is empty</p>
            <a href="./shop.html">Go back</a>
        </li>`
    }
    
    list.innerHTML = markup;
}

export {createMarkup}