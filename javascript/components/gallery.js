// Imports
import { galleryItems } from "../data/galleryItems.js";
import { createImageElement } from "../helpers.js";

// Functions
/** Show a modal with a full size version of the image. */
const show = (galleryData) => {
    const galleryDialogue = document.getElementById('focused-image');

    galleryDialogue.children[0].src = galleryData.link;
    galleryDialogue.children[0].alt = galleryData.alt.length > 3 ? 
        galleryData.alt : 'ADD PROPER ALT TEXT, NINCOMPOOP';;

    galleryDialogue.children[1].innerHTML = galleryData.subtitle ?? '';
    galleryDialogue.showModal();
};

/** Add gallery items with relevant events to the gallery html. */
export const setupGallery = () => {
    if (!galleryItems) return;
    
    const galleryGrid = document.getElementById('gallery-grid');

    for (let index = 0; index < galleryItems.length; index++) { 
        galleryGrid.appendChild(createGalleryItem(galleryItems[index]));
    }

    const galleryDialogue = document.getElementById('focused-image');

    galleryDialogue.addEventListener('click', (event) => {
        galleryDialogue.close();
    })
}

/** Create a new galleryItem to add to the gallery. */
const createGalleryItem = (galleryData) => {
    const galleryItem = document.createElement("div");

    galleryItem.setAttribute('class', 'gallery-item');

    const galleryImage = createImageElement(galleryData.link, galleryData.alt);
    
    galleryImage.onload = () => {
        galleryItem.addEventListener('click', (event) => {
            show(galleryData);
        })
    }

    galleryItem.appendChild(galleryImage);
    
    if(galleryData.subtitle){
        const gallerySubtitle = document.createElement("p");
        
        gallerySubtitle.innerHTML = galleryData.subtitle;
        galleryItem.appendChild(gallerySubtitle);
    }  

    return galleryItem
}