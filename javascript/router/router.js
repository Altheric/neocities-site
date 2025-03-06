const routerEvent = new CustomEvent("routed");

/**Display the current page of the querylocation */
export const router = (queryLocation = '#home', routes) => {
    
    getPage(queryLocation, routes);
    document.title = `Altheresy Postings: ${routes[queryLocation].title}`;
    
}
/**Get the contents of the queried location. */
const getPage = async (queryLocation = '#home', routes) => {
    const content = document.getElementById('page-content')

    try {
        let res = await fetch(`pages/${routes[queryLocation].file}`);
        content.innerHTML = await res.text()
        content.dispatchEvent(routerEvent);
    } catch (NetworkError) {
        content.innerHTML = `<h1>Either the page couldn't be found or something else went horribly wrong!</h1>`
        content.dispatchEvent(routerEvent);
    }
}