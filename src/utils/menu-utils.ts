var navbarMobile = document.getElementById("navbar-mobile");

var btnCloseNabarMobile = document.getElementById("btn-close-navbar-mobile");
btnCloseNabarMobile.addEventListener("click", function(e: MouseEvent) {
    e.preventDefault();
    navbarMobile.classList.add('hidden');
});

var btnOpenNavbarMobile = document.getElementById("btn-open-navbar-mobile");
btnOpenNavbarMobile.addEventListener("click", function(e: MouseEvent) {
    e.preventDefault();
    navbarMobile.classList.remove('hidden');
});