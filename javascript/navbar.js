//Populate the navbar dynamically, so we don't need to edit the navbar for every new site added.
//First, get the current page.
const currentPage = document.title.split(": ")[1];
//Now, an object of pages.
const listOfPages = {
    "Home": "index.html" ,
};
//Navbar id.
const navBar = document.getElementById('navbar');
//And the unorganized list to append to.
const navList = navBar.childNodes[1];

//Loop through a list of the page list's keys, add each to the navbar as a link unless it's the current page.
var pages = Object.keys(listOfPages)
pages.forEach(page => {
    var newListElement = document.createElement("li");
    //Check if the page is the current page, if it is not, create a link element to append to the list element.
    if(currentPage != page || currentPage === null){
        var newPage = document.createElement("a")
        newPage.href = listOfPages[page];
        newPage.innerHTML = page
        newListElement.appendChild(newPage)
    } else {
        newListElement.innerHTML = page;
    }
    navList.appendChild(newListElement);
});
