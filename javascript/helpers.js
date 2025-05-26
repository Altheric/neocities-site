// Imports

// Functions
/** Create a new HTML image element with a src and alt text together with an error mark */
export const createImageElement = (srcUrl, altText) => {
    const newImage = new Image();

    newImage.src = srcUrl;
    newImage.alt = altText.length > 3 ? altText : 'ADD PROPER ALT TEXT, NINCOMPOOP';

    newImage.onerror = () => {
        newImage.setAttribute('class', 'errored-image');
    };
    
    return newImage
}

/** Create a new HTML link element from href and innerHTML */
export const createLinkElement = (href, innerHTML, altText) => {
    const newLink = document.createElement('a');

    newLink.href = href;
    newLink.innerHTML = innerHTML;
    newLink.alt = altText ?? innerHTML.toLowerCase();
    
    return newLink
}

/** Attach links to a list element with the given routes attached */
export const attachRoutes = (listElement, routes, currentLocation) => {
    Object.keys(routes).forEach(route => {
        const li = document.createElement('li');
        const a = createLinkElement(routes[routes].href, routes[route].innerHTML)

        if (currentLocation && route == currentLocation) a.setAttribute('class', 'current-link');
        
        li.appendChild(a);
        listElement.appendChild(li);
    });

    return listElement
}