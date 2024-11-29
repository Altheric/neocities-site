/**Display the current page of the querylocation */
export const router = (queryLocation = '#home', routes) => {
    
    getPage(queryLocation, routes);
    document.title = `Altheresy Postings: ${routes[queryLocation].title}`;
    
}
/**Get the contents of the queried location. */
const getPage = async (queryLocation = '#home', routes) => {
    const content = document.getElementById('content')

    let res = await fetch(`pages/${routes[queryLocation].file}`);
    console.log(res)
    content.innerHTML = await res.text()
}