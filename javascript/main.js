// Imports
import { routes } from "./data/routes.js";
import { router } from "./router.js";
import { populateNav } from "./components/nav.js";
import { sidebarToggle } from './components/sidebar.js'

// Types
import "../types.js"
/** @type {Routes}*/
var routes

// Vars
const queryLocation = window.location.search.substring(1);
const validQueryLocation = Object.keys(routes).includes(queryLocation) ? queryLocation : 'home';
const sidebarTab = document.getElementById('sidebar-tab');

// Functions
router(validQueryLocation, routes);
populateNav(validQueryLocation, routes);

// Listeners
sidebarTab.addEventListener('click', sidebarToggle);
