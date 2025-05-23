// Imports
import { galleryItems } from "../data/galleryItems.js";
import { createImageElement } from "../helpers.js";

// Variables
let isShowing = false;

// Functions
/** Show a focused version of the image. */
const show = (galleryImage) => {
    const newImage = document.createElement('div');
    newImage.append(galleryImage.cloneNode());
    newImage.setAttribute('id', 'focused-image');
    
    isShowing = true;
    
    newImage.addEventListener('click', (event) => {
        newImage.remove();
        isShowing = false;
    })

    document.body.append(newImage);
};

/** Add gallery items with relevant events to the gallery html. */
export const setupGallery = () => {
    if (!galleryItems) return;
    const galleryGrid = document.getElementById('gallery-grid');
    for (let index = 0; index < galleryItems.length; index++) {
        const galleryItem = createGalleryItem(galleryItems[index])

        galleryGrid.appendChild(galleryItem);
    }
}

/** Create a new galleryItem to add to the gallery. */
const createGalleryItem = (galleryData) => {
    const galleryItem = document.createElement("div");
    const galleryImage = createImageElement(galleryData.link, galleryData.alt);
    
    galleryItem.setAttribute('class', 'gallery-item');
    
    galleryItem.appendChild(galleryImage);
    
    galleryImage.onload = () => {
        galleryItem.addEventListener('click', (event) => {
            if (!isShowing) show(galleryImage);
        })
    }

    if(galleryData.subtitle){
        const gallerySubtitle = document.createElement("p");
        
        gallerySubtitle.innerHTML = galleryData.subtitle;
        galleryItem.appendChild(gallerySubtitle);
    }  

    return galleryItem
}