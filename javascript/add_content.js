//Populate some content on the pages dynamically, so i wont need to change multiple webpages for the same thing.
//Object of pages, their names and links.
const listOfPages = {
    "Home": "index.html" ,
};

function populateNavBar(){
    //Loop through a list of the page list's keys, add each to the navbar as a link unless it's the current page.
    //First, get the current page.
    var currentPage = document.title.split(": ")[1];
    //Navbar id so we know what to populate.
    var navBar = document.getElementById('navbar');
    //And the unorganized list to append to.
    var navList = navBar.childNodes[1];
    //Get the keys by which we'll know what page we're on.
    var pages = Object.keys(listOfPages)
    //Run through each key-page and add them to the navigation bar as a link.
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
}

populateNavBar();
