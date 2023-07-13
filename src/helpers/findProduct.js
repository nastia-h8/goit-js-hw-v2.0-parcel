
function findProduct(activeEl, arr) {
    const productId = Number(activeEl.closest('.js-card').dataset.id);
    return arr.find(({id}) => id === productId);
}

export { findProduct };