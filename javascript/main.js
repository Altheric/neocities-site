// Imports
import { routes, neatSiteRoutes } from "./data/routes.js";
import { router } from "./router.js";
import { populateNav } from "./components/nav.js";
import { sidebarToggle, populateSidebar } from './components/sidebar.js'

// Vars
const queryLocation = window.location.search.substring(1);
const validQueryLocation = Object.keys(routes).includes(queryLocation) ? queryLocation : 'home';
const sidebarTab = document.getElementById('sidebar-tab');

// Functions
router(validQueryLocation, routes);
populateNav(validQueryLocation, routes);
populateSidebar(neatSiteRoutes)

// Listeners
sidebarTab.addEventListener('click', sidebarToggle);
