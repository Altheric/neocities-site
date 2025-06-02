// Imports
import { setupGallery } from './components/gallery.js';

// Types
import "../types.js"
/** @type {Routes}*/
/** @type {Route} */

// Functions
/** Display the current page of the querylocation.
 * @param {string} queryLocation Location of the index query
 * @param {Routes} routes
 */
export const router = (queryLocation = '#home', routes) => {
    const location = routes[queryLocation];

    getPage(queryLocation, location);
    document.title = `Altheresy Postings: ${location.title}`;
    
}

/** Call the javascript setup for the routed page. 
 * @param {string} queryLocation Location of the index query 
 */
const setupPage = (queryLocation) => {
    switch (queryLocation) {
        case 'gallery':
            setupGallery();
            break;
    }
}

/** Get the contents of the queried location.
 * @param {string} queryLocation Location of the index query 
 * @param {Route} location Route location
 */
const getPage = async (queryLocation, location) => {
    const content = document.getElementById('page-content');

    try {
        let res = await fetch(`pages/${location.file}`);
        content.innerHTML = await res.text();
        if (location.js) setupPage(queryLocation);
    } catch (NetworkError) {
        content.innerHTML = `<h1>Either the page couldn't be found or something else went horribly wrong!</h1>`;
    }
}