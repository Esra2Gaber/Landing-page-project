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
let navbarSections = Array();
let id = Array();
let navbarList = document.querySelector('#navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//Add the active section to elements in the navbar
function navbarActiveSection(section) {
    let selectedSectionName = section.getAttribute('data-nav');
    let navbarSection = navbarList.querySelectorAll('a');
    navbarSection.forEach(section => {
        if (section.textContent == selectedSectionName) {
            section.classList.add('your-active-class');
        }
        else {
            section.classList.remove('your-active-class');
        }
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function addToNavbar(newSection, id) {
    let newElement = document.createElement('li');
    newElement.appendChild(document.createTextNode(newSection));
    navbarList.appendChild(newElement);
    navbarList.style.cssText = 'color: white; font-size: 1.5em; background-color: black;font-family: "Times New Roman", Times, serif';
    newElement.innerHTML = "<a href= #"+ id+">"+ newSection +"</a>";
    newElement.style.margin = '0.3em ';
}

// Add class 'active' to section when near top of viewport
function activeSection(section, selectedSections) {
    selectedSections.forEach(section => { section.querySelector('h2').classList.remove('your-active-class'); });
    section.querySelector('h2').classList.add('your-active-class');
    navbarActiveSection(section);
}

// Scroll to anchor ID using scrollTO event
function scrollSmoothly(eventID) {
    let elementToScroll = document.getElementById(eventID);
    elementToScroll.scrollIntoView({ 'behavior': 'smooth' });
}

/**
 * End Main Functions
 * Begin Events
*/

// Build menu 
let selectedSections = document.querySelectorAll('section');

for (let i = 0; i < selectedSections.length; i++) {
    navbarSections = selectedSections[i].getAttribute('data-nav');
    id = selectedSections[i].getAttribute('id');
    addToNavbar(navbarSections,id);
}

// Scroll to section on link click
document.querySelectorAll('a').forEach(item => {
    item.addEventListener('click', function (event) {
        event.preventDefault();
        scrollSmoothly(item.getAttribute('href').toString().substring(1));
    })
})

// Set sections as active
let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            activeSection(entry.target, selectedSections);
        }
    });
}, { threshold: 0.5, root: null, rootMargin: '-100px 0px -100px 0px' })

selectedSections.forEach(section => { observer.observe(section); })