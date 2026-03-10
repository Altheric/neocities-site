// Imports
import { galleryItems } from "../data/galleryItems.js";
import { createImageElement } from "../helpers.js";

// Types
import "../types.js"
/** @type {GalleryData} */

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

/** Add gallery filter options depending on the groups in galleryItems.js */
export const setupGalleryMenu = () => {
    if (!galleryItems) return;
    
    const galleryMenu = document.getElementById('gallery-sub-menu');

    galleryItems.forEach(galleryItem => {
        const menuItem = document.createElement("div");
        menuItem.innerHTML = galleryItem.group
        menuItem.addEventListener('click', (event) => {
            toggleGroupVisibility(galleryItem.group);
        })
        galleryMenu.appendChild(menuItem);
    });

}

/** Create items for all gallery items and then show the right one. */
export const populateGalleryItems  = (filter) => {
    const galleryGrid = document.getElementById('gallery-grid');

    galleryItems.forEach(targetItems => {
        const gridGroup = document.createElement('div')
        gridGroup.id = `gallery-grid-${targetItems.group}`
        targetItems.data.forEach(item => {
            gridGroup.appendChild(createGalleryItem(item));
        });   
        galleryGrid.appendChild(gridGroup);
    });
    toggleGroupVisibility (filter)
}

/** Setup the gallery page */
export const setupGallery = () => {
    if (!galleryItems) return;
    const galleryDialogue = document.getElementById('focused-image');

    galleryDialogue.addEventListener('click', (event) => {
        galleryDialogue.close();
    })
    
    setupGalleryMenu();
    
    const firstGroupPick = galleryItems[0].group;
    populateGalleryItems(firstGroupPick);
}

export const toggleGroupVisibility = (filter) => {
    console.log(filter)
    const galleryGrid = document.getElementById('gallery-grid');

    for (let index = 0; index < galleryGrid.children.length; index++) {
        const child = galleryGrid.children[index];
        
        if (child.id.slice(13) === filter) {
            child.style.visibility = 'visible'
        } else {
            child.style.visibility = 'hidden'
        }
    }
}


/** Create a new galleryItem to add to the gallery.
 * @param {GalleryData} galleryData // Gallery item data
 * @return {HTMLDivElement} // Fully rendered galleryData
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