// Imports
import { createLinkElement } from "../helpers.js";

// Variables
const sidebarChildren = document.getElementById('sidebar').children;

let isClosed = true;

// Functions
/** Toggle the sidebar's position on event trigger. */
export const sidebarToggle = () => {
    if (isClosed){
        sidebarChildren[0].style.left = '0%';
        sidebarChildren[1].style.left = '0%';
        sidebarChildren[2].style.left = '0%';

        isClosed = false;
    } else {
        sidebarChildren[0].style.left = '80%';
        sidebarChildren[1].style.left = '80%';
        sidebarChildren[2].style.left = '80%';

        isClosed = true;
    }
}

/**Populate the ul of the Sidebar with the neat site routes */
export const populateSidebar = (neatSiteRoutes) => {
    const sidebarList = document.getElementById('sidebar-list')
    
    neatSiteRoutes.forEach(route => {
        const li = document.createElement('li');
        const a = createLinkElement(route.href, route.innerHTML)

        
        li.appendChild(a);
        sidebarList.appendChild(li);
    });
}
