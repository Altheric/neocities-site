// Functions
/** Create a new HTML image element with a src and alt text together with an error mark 
 * @param {string} srcUrl Image source url
 * @param {string} altText Image alt text
 * @param {string} classes Image classes
 */
export const createImageElement = (srcUrl, altText, classes) => {
    const newImage = new Image();

    newImage.src = srcUrl;
    newImage.alt = altText.length > 3 ? altText : 'ADD PROPER ALT TEXT, NINCOMPOOP';

    newImage.onerror = () => {
        newImage.setAttribute('class', classes ? `errored-image ${classes}` : 'errored-image');
    };

    if (classes && newImage.complete) newImage.setAttribute('class', classes);

    return newImage
}

/** Create a new HTML link element from href and innerHTML
 * @param {string} href Link url
 * @param {string} innerHTML Link text
 * @param {string} classes Link classes
 */
export const createLinkElement = (href, innerHTML, classes = '') => {
    const newLink = document.createElement('a');

    newLink.href = href;
    newLink.innerHTML = innerHTML;
    
    if (classes) newLink.setAttribute('class', classes);

    return newLink
}