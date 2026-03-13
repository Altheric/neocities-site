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
    galleryItems.forEach(galleryCategory => {
        
        // Hoverable category item
        const menuCategory = document.createElement("div");
        menuCategory.id = `gallery-grid-menu-${galleryCategory.category}`;
        menuCategory.innerHTML = galleryCategory.category
        menuCategory.addEventListener('mouseover', (event) => {
            gallerySubMenuHover(galleryCategory.category, true);
        })
        menuCategory.addEventListener('mouseout', (event) => {
            gallerySubMenuHover(galleryCategory.category, false);
        })

        // Modal to select groups
        const groupBlock = document.createElement("div");
        
        galleryCategory.items.forEach(galleryItem => {
            // Groups to select gallery content
            const menuItem = document.createElement("button");
            menuItem.innerHTML = galleryItem.group
            
            menuItem.addEventListener('click', (event) => {
                toggleGroupVisibility(`${galleryCategory.category}-${galleryItem.group}`);
            })
            
            groupBlock.appendChild(menuItem);
        })

        groupBlock.style.display = 'none';
        menuCategory.appendChild(groupBlock);
        galleryMenu.appendChild(menuCategory);
    });

}

/**
 *  Create items for all gallery items and then show the right one. 
 *  @param {string} filter // Filter for the group of gallery items to display.
 */
export const populateGalleryItems  = (filter) => {
    const galleryGrid = document.getElementById('gallery-grid');

    galleryItems.forEach(galleryCategory => galleryCategory.items.forEach((galleryItem => {
        const gridGroup = document.createElement('div');
        
        gridGroup.id = `gallery-grid-${galleryCategory.category}-${galleryItem.group}`
        gridGroup.setAttribute('class', 'gallery-group');
        galleryItem.data.forEach(item => {
            gridGroup.appendChild(createGalleryItem(item));
        });   
        galleryGrid.appendChild(gridGroup)
    })));
    toggleGroupVisibility (filter);
}

/** Setup the gallery page */
export const setupGallery = () => {
    if (!galleryItems) return;
    const galleryDialogue = document.getElementById('focused-image');

    galleryDialogue.addEventListener('click', (event) => {
        galleryDialogue.close();
    })
    
    setupGalleryMenu();
    
    const firstGroupPick = `${galleryItems[0].category}-${galleryItems[0].items[0].group}`;

    populateGalleryItems(firstGroupPick);
}

/**
 *  Toggle group display using the handler
 *  @param {string} filter // Filter for the group of gallery items to display.
 */
export const toggleGroupVisibility = (filter) => {
    const galleryGrid = document.getElementById('gallery-grid');

    for (let index = 0; index < galleryGrid.children.length; index++) {
        const child = galleryGrid.children[index];
        
        if (child.id.slice(13) === filter) {
            child.style.display = 'grid';
        } else {
            child.style.display = 'none';
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

/**
 *  Toggle group display upon hovering over a sub menu entry.
 *  @param {bool} category // Category div to show/hide
 *  @param {bool} showGroup // Boolean to show or hide the group menu.
 */
const gallerySubMenuHover = (category, showGroup) => {
    const menu = document.getElementById('gallery-sub-menu')
    
        for (let index = 0; index < menu.children.length; index++) {
        const child = menu.children[index];
        
        console.log(child)
        if (child.id.slice(18) === category && showGroup) {
            console.log(child.children[0])
            child.children[0].style.display = 'block';
        } else {
            child.children[0].style.display = 'none';
        }
    }
}