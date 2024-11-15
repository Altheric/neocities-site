//Imports
import { routes } from "./routes.js";

//Vars
const queryLocation = window.location.search.substring(1);
const nav = document.getElementsByClassName('nav-link');
const validQueryLocation = Object.keys(routes).includes(queryLocation) ? queryLocation : 'home'
class CurrentPage extends HTMLElement {

    async connectedCallback() {
        let res = await fetch(`pages/${routes[validQueryLocation].file}`);

        this.innerHTML = await res.text()
    }

}

//Execution
customElements.define( 'current-page', CurrentPage )
document.title = `Altheresy Postings: ${routes[validQueryLocation].title}`;
nav.namedItem(routes[validQueryLocation].title).id='current-link';