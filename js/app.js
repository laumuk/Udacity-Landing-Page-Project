/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('main > section');
const navList = document.getElementById('navbar__list');
const navListLinks = [];

/**
 * End Global Variables
 * Start Helper Functions
 * 
Creates the link element */
function createLink(className, name, link) {
    const linkElement = document.createElement('a');
    linkElement.classList.add(className);
    linkElement.innerHTML = name;
    linkElement.href = link;

    return linkElement;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav: searches for the sections and creates for them a link
function buildnav(e) {
    for (const section of sections) { 
        const sectionId = section.id;
        const name = section.dataset.nav;
        const navElemenet = document.createElement('li');
        const linkElement = createLink('menu__link', name,  `#${sectionId}`);

        linkElement.dataset.target = sectionId;
        navElemenet.appendChild(linkElement);
        navList.appendChild(navElemenet);

        // Scroll to anchor ID using scrollTO event
        // Scroll to section on link click
        linkElement.addEventListener('click', function(e) {
            e.preventDefault();
            section.scrollIntoView({block: 'start', behavior: 'smooth'});
        })

        navListLinks.push(linkElement);
    }
}


// Add class 'active' to section when near top of viewport
function handleScroll(e) {
    let min = +Infinity;
    let closest;

    for (const section of sections) {
        const diff = Math.abs(section.getBoundingClientRect().top);

        if (diff < min) {
            min = diff;
            closest = section;
        }
    }

    for (const section of sections) {
        if (section == closest) {
            section.classList.add('active-section');
        } else {
            section.classList.remove('active-section');
        }   
    }

    for (const link of navListLinks) {
        if (link.dataset.target == closest.id) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    } 
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener("DOMContentLoaded", buildnav)


// Set sections as active
document.addEventListener("scroll", handleScroll);


