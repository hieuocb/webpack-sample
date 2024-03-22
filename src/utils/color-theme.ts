if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

var themeToggleDarkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
var themeToggleLightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
    themeToggleLightIconMobile.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
    themeToggleDarkIconMobile.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');
var themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');

const changeDarkTheme = (isDark: boolean) => {
    if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    }
}

themeToggleBtn.addEventListener('click', function(e: MouseEvent) {
    e.preventDefault();

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        changeDarkTheme(localStorage.getItem('color-theme') === 'light');
    // if NOT set via local storage previously
    } else {
        changeDarkTheme(!document.documentElement.classList.contains('dark'));
    }
});

themeToggleBtnMobile.addEventListener('click', function(e: MouseEvent) {
    e.preventDefault();
    // toggle icons inside button
    themeToggleDarkIconMobile.classList.toggle('hidden');
    themeToggleLightIconMobile.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        changeDarkTheme(localStorage.getItem('color-theme') === 'light');
    // if NOT set via local storage previously
    } else {
        changeDarkTheme(!document.documentElement.classList.contains('dark'));
    }
});

