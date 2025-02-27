const sidebarChildren = document.getElementById('sidebar').children

let isClosed = true;

/** Toggle the sidebar's position on event trigger. */
export const sidebarToggle = () => {
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
}