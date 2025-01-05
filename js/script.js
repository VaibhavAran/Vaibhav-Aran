document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const nav = document.getElementById("nav");

    hamburgerMenu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
});


document.getElementById("hamburger-menu").addEventListener("click", function () {
    const nav = document.getElementById("nav");
    nav.classList.toggle("active");
});

// Scroll Animations for Sections
const sections = document.querySelectorAll("section");
const options = {
    threshold: 0.5,
};

const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible");
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});
