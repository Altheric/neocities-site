// Imports
import { galleryItems } from "../data/galleryItems.js";
import { createImageElement } from "../helpers.js";

// Types
/** @typedef {{link: string, alt: string, subtitle: string}} */
var galleryItem;

// Functions
/** Show a modal with a full size version of the image. 
 * @param {HTMLImageElement} image // Image for the dialogue
 * @param {string} subtitle // Subtitle for the image
 */
const show = (image, subtitle) => {
    const galleryDialogue = document.getElementById('focused-image');

    galleryDialogue.children[0].src = image.src;
    galleryDialogue.children[0].alt = image.alt;

    galleryDialogue.children[1].innerHTML = subtitle ?? '';
    galleryDialogue.showModal();
};

/** Add gallery items with relevant events to the gallery html. */
export const setupGallery = () => {
    if (!galleryItems) return;
    
    const galleryGrid = document.getElementById('gallery-grid');

    galleryItems.forEach(galleryItem => {
        galleryGrid.appendChild(createGalleryItem(galleryItem));
    });

    const galleryDialogue = document.getElementById('focused-image');

    galleryDialogue.addEventListener('click', (event) => {
        galleryDialogue.close();
    })
}




/** Create a new galleryItem to add to the gallery.
 * @param {galleryItem} galleryData // Gallery item data
 * @return {galleryItem} // Fully rendered galleryData
 */
const createGalleryItem = (galleryData) => {
    const galleryItem = document.createElement("div");

    galleryItem.setAttribute('class', 'gallery-item');

    const galleryImage = createImageElement(galleryData.link, galleryData.alt);
    
    galleryImage.onload = () => {
        galleryItem.addEventListener('click', (event) => {
            show(galleryImage, galleryData.subtitle);
        })
    }

    galleryItem.appendChild(galleryImage);
    
    if(galleryData.subtitle){
        const gallerySubtitle = document.createElement("p");
        
        gallerySubtitle.innerHTML = galleryData.subtitle;
        galleryItem.appendChild(gallerySubtitle);
    }  

    return galleryItem;
}