
/** Show a focused version of the image */
const show = (galleryImage) => {
    const content = document.getElementById('page-content')
    galleryImage.setAttribute('id', 'focused-image')
    content.append(galleryImage)
};

/** Add event listener to the gallery clickables. */
export const galleryListener = () => {
    const galleryItems = document.getElementsByClassName('gallery-item');
    for (let index = 0; index < galleryItems.length; index++) {
        const item = galleryItems[index];
        item.addEventListener('click', (event) => {
            show(galleryItems[index].children[0])
        })
    }
}