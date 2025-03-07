// Imports
import { galleryItems } from "../data/galleryItems.js";

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
        newImage.remove()
        isShowing = false;
    })

    document.body.append(newImage);
};

/** Add gallery items with relevant events to the gallery html. */
export const setupGallery = () => {
    const galleryGrid = document.getElementById('gallery-grid')
    for (let index = 0; index < galleryItems.length; index++) {
        const galleryItem = document.createElement("div");
        const galleryImage = document.createElement("img");
        
        galleryItem.setAttribute('class', 'gallery-item');

        galleryImage.src = galleryItems[index].link;
        galleryImage.alt = galleryItems[index].alt  || galleryItems[index].alt !== '' ? galleryItems[index].alt : 'ADD ALT TEXT, NINCOMPOOP';

        galleryItem.appendChild(galleryImage);
        
        if(galleryItems[index].subtitle){
            const gallerySubtitle = document.createElement("p");
            
            gallerySubtitle.innerHTML = galleryItems[index].subtitle
            galleryItem.appendChild(gallerySubtitle);
        }

        galleryItem.addEventListener('click', (event) => {
            if(!isShowing){
                show(galleryItem.children[0])
            }
        })

        galleryGrid.appendChild(galleryItem);
    }
}