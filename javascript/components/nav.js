// Imports
import { createLinkElement } from "../helpers.js";


// Functions
/**Populate the ul of the Nav with the routes */
export const populateNav = (queryLocation, routes) => {

    const navList = document.getElementById('nav-list')

    Object.keys(routes).forEach(route => {
        const li = document.createElement('li');
        const a = createLinkElement(`index.html?${route}`, routes[route].title)

        if (route == queryLocation) a.setAttribute('id', 'active-page');
        
        li.appendChild(a);
        navList.appendChild(li);
    });
}
