const queryLocation = window.location.search.substring(1);
const nav = document.getElementsByClassName('nav-link');
//Valid locations to navigate to on site.
const validLocations = ['home', 'about'];
console.log(nav.namedItem())
class CurrentPage extends HTMLElement {

    async connectedCallback() {
        let res = validLocations.includes(queryLocation) ? await fetch(`pages/${queryLocation}.html`) : await fetch( 'pages/home.html');

        this.innerHTML = await res.text()
    }

}

switch(queryLocation){
    case 'about':
        customElements.define( 'current-page', CurrentPage )
        document.title = "Altheresy Postings: About";
        nav.namedItem('About').id='current-link';
        break;
    default:
        customElements.define( 'current-page', CurrentPage )
        document.title = "Altheresy Postings: Home";
        nav.namedItem('Home').id='current-link';
        break;
}
