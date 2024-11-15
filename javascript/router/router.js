/**Display the current page of the querylocation */
export const router = (queryLocation = '#home', routes) => {
    
    class CurrentPage extends HTMLElement {

        async connectedCallback() {
            let res = await fetch(`pages/${routes[queryLocation].file}`);

            this.innerHTML = await res.text()
        }

    }

    customElements.define( 'current-page', CurrentPage )
    document.title = `Altheresy Postings: ${routes[queryLocation].title}`;
}