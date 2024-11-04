const queryLocation = window.location.search.substring(1);
const nav = document.getElementsByClassName('nav-link')

class HomePage extends HTMLElement {

    async connectedCallback() {
        let res = await fetch( 'pages/home.html' )

        this.innerHTML = await res.text()
    }

}

class AboutPage extends HTMLElement {

    async connectedCallback() {
        let res = await fetch( 'pages/about.html' )

        this.innerHTML = await res.text()
    }

}

switch(queryLocation){
    case 'about':
        customElements.define( 'current-page', AboutPage )
        document.title = "Altheresy Postings: About";
        nav.namedItem('About').id='current-link';
        break;
    default:
        customElements.define( 'current-page', HomePage )
        document.title = "Altheresy Postings: Home";
        nav.namedItem('Home').id='current-link';
        break;
}
