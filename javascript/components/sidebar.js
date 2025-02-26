const sidebarChildren = document.getElementById('sidebar').children
const sidebarTab = document.getElementById('sidebar-tab')

let isClosed = true;

sidebarTab.addEventListener('click', (event) => {
    if (isClosed){;
        sidebarChildren[0].style.left = '0%'
        sidebarChildren[1].style.left = '0%'
        sidebarChildren[2].style.left = '0%'
        isClosed = false;
    } else {
        sidebarChildren[0].style.left = '80%'
        sidebarChildren[1].style.left = '80%'
        sidebarChildren[2].style.left = '80%'
        isClosed = true;
    }
})