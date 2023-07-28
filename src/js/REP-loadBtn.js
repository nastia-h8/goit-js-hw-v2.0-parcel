export default class LoadMoreBtn{
    constructor({selector, hidden=false}) {
        this.btn = document.querySelector(selector);
        this.label = this.btn.querySelector('.js-spinner-label');
        this.spinner = this.btn.querySelector('.js-spinner');

        hidden && this.hide();

        // if (hidden) {
        //     this.hide();
        // }
    }

    enableSpinner() {
        this.spinner.hidden = false;
        this.label.textContent = 'Loading...';
        this.btn.disabled = true;
    }

    disableSpinner() {
        this.spinner.hidden = true;
        this.label.textContent = 'Load more...';
        this.btn.disabled = false;
    }

    show() {
        this.btn.hidden = false;
    }

    hide() {
        this.btn.hidden = true;
    }
}