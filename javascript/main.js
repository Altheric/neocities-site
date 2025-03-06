// Imports
import { routes } from "./router/routes.js";
import { router } from "./router/router.js";
import { populateNav } from "./components/nav.js";
import { sidebarToggle } from './components/sidebar.js'
import { galleryListener } from './components/gallery.js';

// Vars
const queryLocation = window.location.search.substring(1);
const validQueryLocation = Object.keys(routes).includes(queryLocation) ? queryLocation : 'home'
const sidebarTab = document.getElementById('sidebar-tab');
const pageContent = document.getElementById('page-content');

// Functions
router(validQueryLocation, routes);
populateNav(validQueryLocation, routes);

// Listeners
sidebarTab.addEventListener('click', sidebarToggle)

if(validQueryLocation === 'gallery'){
    pageContent.addEventListener('routed', (event) => {
        galleryListener();
    });
};