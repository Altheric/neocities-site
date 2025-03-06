let isShowing = false;

/** Remove the focused image and make other elements clickable again. */
const hide = (targetImage) => {
    targetImage.remove()
    isShowing = false;
}

/** Show a focused version of the image. */
const show = (galleryImage) => {
    const newImage = document.createElement('div');
    newImage.append(galleryImage.cloneNode());
    newImage.setAttribute('id', 'focused-image');
    
    isShowing = true;
    
    newImage.addEventListener('click', (event) => {
        hide(newImage);
    })

    document.body.append(newImage);
};

/** Add event listener to the gallery clickables. */
export const galleryListener = () => {
    const galleryItems = document.getElementsByClassName('gallery-item');
    for (let index = 0; index < galleryItems.length; index++) {
        const item = galleryItems[index];
        item.addEventListener('click', (event) => {
            if(!isShowing){
                show(galleryItems[index].children[0])
            }
        })
    }
}