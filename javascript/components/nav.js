// Imports
import { createLinkElement } from "../helpers.js";

//Types
import "../types.js"
/** @type {Routes}*/

// Functions
/**Populate the ul of the Nav with the routes 
 * @param {string} queryLocation // Current location in the browser
 * @param {Routes} routes // Object of available routes
 */
export const populateNav = (queryLocation, routes) => {
    const navList = document.getElementById('nav-list');

    Object.keys(routes).forEach(/** @param {Route} route */ route => {
        const li = document.createElement('li');
        const a = createLinkElement(`index.html?${route}`, routes[route].title, route == queryLocation ? 'current-link' : '');
        
        li.appendChild(a);
        navList.appendChild(li);
    });
}
