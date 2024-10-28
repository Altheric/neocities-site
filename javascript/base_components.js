class NavBar extends HTMLElement {

    async connectedCallback() {
        let res = await fetch( 'components/nav.html' )

        this.innerHTML = await res.text()
    }

}
customElements.define( 'nav-bar', NavBar )