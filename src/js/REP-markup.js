export { appendArticlesMarkup, clearArticlesMarkup }


function appendArticlesMarkup(arr, list) {
    const markup = arr.map(({ url, urlToImage, title, author, description }) =>
        `
        <li>
            <a href="${url}" target="_blank" rel="noopener noreferrer">
            <article>
                <img src="${urlToImage}" alt="${title}" width="480" />
                <h2>${title}</h2>
                <p>Posted by:${author}</p>
                <p>${description}</p>
            </article>
            </a>
      </li>
        `
    ).join('');

    list.insertAdjacentHTML('beforeend', markup);
}


function clearArticlesMarkup(list) {
    list.innerHTML = '';
}