function closeModal(evt) {
    console.log(evt);
    if (evt.code === "Escape") {
        this.close();
    }
}

export { closeModal };