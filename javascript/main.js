// Imports
import { Routes } from "./data/routes.js";
import { router } from "./router.js";
import { populateNav } from "./components/nav.js";
import { sidebarToggle } from './components/sidebar.js'

// Types
import "./types.js"
/** @type {Routes}*/

// Vars
const queryLocation = window.location.search.substring(1);
const validQueryLocation = Object.keys(Routes).includes(queryLocation) ? queryLocation : 'home';
const sidebarTab = document.getElementById('sidebar-tab');

// Functions
router(validQueryLocation, Routes);
populateNav(validQueryLocation, Routes);

// Listeners
sidebarTab.addEventListener('click', sidebarToggle);
