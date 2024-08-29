function createFavicon() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');

    context.fillStyle = 'transparent';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#d4af37';
    context.font = '25px Baskerville SC';


    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('AT', canvas.width / 2, canvas.height / 2);

    const favicon = document.getElementById('favicon');
    favicon.href = canvas.toDataURL('image/png');
}

window.onload = createFavicon();

let cross = 0;
function toggleDropdown() {
    const dropdown = document.querySelector(".dropdown-content");
    dropdown.classList.toggle("show");
    console.log(dropdown.innerHTML);
    if (cross == 0) {
        document.getElementById('startAnimation').beginElement();
        cross = 1;
    }
    else if (cross == 1) {
        document.getElementById('reverseAnimation').beginElement();
        cross = 0;
    }
}

function animateElements(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
            setTimeout(() => {
                element.classList.add('animate');
            }, index * 150);
        } else {
            element.classList.remove('animate');
        }
    });
}

let lastScrollTop = 0;
let viewedElements = new Set();
document.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const dropdown = document.querySelector('.dropdown-content');
    let currentScroll = window.scrollY;
    if (currentScroll > lastScrollTop && currentScroll > 30) {
        if (cross == 1) {
            document.getElementById('reverseAnimation').beginElement();
            dropdown.classList.remove('show');
            navbar.classList.add('hidden');
            cross = 0;
        }
        else {
            navbar.classList.add('hidden');
        }
    } else {
        if (cross == 1) {
            document.getElementById('reverseAnimation').beginElement();
            dropdown.classList.remove('show');
            navbar.classList.add('hidden');
            cross = 0;
        }
        else {
            navbar.classList.remove('hidden');
        }
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

    animateElements('.project');
    animateElements('.award');
    animateElements('.hackathon');

    const bannerTexts = document.querySelectorAll('.banner-text');
    bannerTexts.forEach(bannerText => {
        const rect = bannerText.getBoundingClientRect();
        const isVisible = (rect.top >= 0) && (rect.bottom <= window.innerHeight);

        if (isVisible) {
            if (!viewedElements.has(bannerText)) {
                bannerText.classList.remove('hidden');
                bannerText.classList.add('visible');
                viewedElements.add(bannerText);
            }
        }
    });

    if (window.scrollY === 0) {
        viewedElements.clear();
        bannerTexts.forEach(bannerText => {
            bannerText.classList.remove('visible');
            bannerText.classList.add('hidden');
        });
    }

    const banners = document.querySelectorAll('.banner');
    const navLinks = document.querySelectorAll('.navbar a');
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');

    let currentBanner = null;
    banners.forEach((banner, index) => {
        const rect = banner.getBoundingClientRect();
        const nextBanner = banners[index + 1];
        const nextRect = nextBanner ? nextBanner.getBoundingClientRect() : null;

        const isVisible = (rect.top <= window.innerHeight / 2) && (!nextRect || nextRect.top > window.innerHeight / 2);
        if (isVisible) {
            currentBanner = banner;
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
    });

    dropdownLinks.forEach(link => {
        link.style.color = '';
    });

    if (currentBanner) {
        const bannerId = currentBanner.getAttribute('id');
        const activeLink = document.querySelector(`.anchor a[href="#${bannerId}"]`);

        const allLinks = document.querySelectorAll('.anchor a, .dropdown-content a');
        allLinks.forEach(link => {
            link.style.fontSize = '1rem';
            link.style.textDecoration = 'none';
        });

        if (activeLink) {
            activeLink.style.fontSize = '1.5rem';
            activeLink.style.textDecoration = 'underline';
        }
        const dropdownLink = document.querySelector(`.dropdown-content a[href="#${bannerId}"]`);
        if (dropdownLink) {
            dropdownLink.style.fontSize = '1.5rem';
            dropdownLink.style.textDecoration = 'underline';
        }
    }
});

document.querySelectorAll(".dropdown-content a").forEach(item => {
    item.addEventListener("click", () => {
        setTimeout(() => {
            const navbar = document.querySelector('.navbar');
            navbar.classList.add('hidden');
            document.querySelector(".dropdown-content").classList.remove("show");
        }, 1000);
    });
});

document.querySelectorAll(".anchor a").forEach(item => {
    item.addEventListener("click", () => {
        setTimeout(() => {
            const navbar = document.querySelector('.navbar');
            navbar.classList.add('hidden');
        }, 1000);
    });
});
