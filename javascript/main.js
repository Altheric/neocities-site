//Imports
import { routes } from "./router/routes.js";
import { router } from "./router/router.js";
import { populateNav } from "./components/nav.js";

//Vars
const queryLocation = window.location.search.substring(1);
const validQueryLocation = Object.keys(routes).includes(queryLocation) ? queryLocation : 'home'

//Functions

router(validQueryLocation, routes);
populateNav(validQueryLocation, routes);
