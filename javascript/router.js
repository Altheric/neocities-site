//Imports
import { capitalize } from "./helpers.js";

//Vars
const queryLocation = window.location.search.substring(1);
const nav = document.getElementsByClassName('nav-link');
//Valid locations to navigate to on site.
const validLocations = ['home', 'about'];
const validLocName = validLocations.includes(queryLocation) ? capitalize(queryLocation) : 'Home';

class CurrentPage extends HTMLElement {

    async connectedCallback() {
        let res = await fetch(`pages/${validLocations.toLowerCase()}.html`);

        this.innerHTML = await res.text()
    }

}

//Execution
customElements.define( 'current-page', CurrentPage )
document.title = `Altheresy Postings: ${validLocName}`;
nav.namedItem(validLocName).id='current-link';