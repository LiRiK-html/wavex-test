
//Попап корзина

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector ('.popup.open') ;
        if (popupActive) {
            popupClose (popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest ('.popup__content')) { 
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector ('.container').offsetwidth + 'px';
    if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
    }
}
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
        }, timeout);
    }

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = 'Opx';
        }
    }
        body.style.paddingright = 'Opx';
        body.classList.remove('lock');
    }, timeout);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
    }
});

(function () {

    if (!Element.prototype.closest) {

        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
      }
    })();
    (function () {

        if (!Element.prototype.matches) {

        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();

// Каталог открытие

const catalogButton = document.querySelector('.button__catalog');
const catalog = document.querySelector('.catalog');
const catalogOpenImg = document.getElementById('button__catalog-open');
const catalogCloseImg = document.getElementById('button__catalog-close');
const catalogBody = document.querySelector('.catalog__body');
const catalogOfferItems = document.querySelectorAll('.catalog__offer-item');


let originalActiveImg = document.querySelector('.button__catalog-img.active');

catalogButton.addEventListener('click', () => {

    catalog.classList.toggle('open');

    if (catalogCloseImg.classList.contains('active')) {
        catalogCloseImg.classList.remove('active');
        catalogOpenImg.classList.add('active');
    } else {
        catalogOpenImg.classList.remove('active');
        catalogCloseImg.classList.add('active');
    }
});

function closeCatalog() {
    catalog.classList.remove('open');
    catalogOpenImg.classList.remove('active');
    catalogCloseImg.classList.remove('active');

    if (originalActiveImg) {
        originalActiveImg.classList.add('active');
    }
}

document.addEventListener('click', (event) => {
    
    if (!catalogBody.contains(event.target) && !catalogButton.contains(event.target)) {
        closeCatalog();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeCatalog();
    }
});

catalogOfferItems.forEach(item => {
    item.addEventListener('click', () => {
        closeCatalog();
    });
});

// Каталог

const selectItems = document.querySelectorAll('.catalog__select-item');
const defaultSelectItem = document.getElementById('catalog__list-1');
const defaultOfferList = document.getElementById('catalog__list-1');
const offerLists = document.querySelectorAll('.catalog__offer-list');

function removeDefaultActive() {
    if (defaultSelectItem) {
        defaultSelectItem.classList.remove('active');
    }
    if (defaultOfferList) {
        defaultOfferList.classList.remove('active');
    }
}

function removeAllActive() {
    selectItems.forEach(item => item.classList.remove('active'));
    offerLists.forEach(list => list.classList.remove('active'));
}

selectItems.forEach(item => {
    item.addEventListener('mouseenter', () => handleHoverOrClick(item));
    item.addEventListener('click', () => handleHoverOrClick(item));
});


function handleHoverOrClick(item) {
    const itemId = item.id;

    removeDefaultActive();

    removeAllActive();

    item.classList.add('active');


    const matchingOfferList = document.querySelector(`.catalog__offer-list#${itemId}`);
    if (matchingOfferList) {
        matchingOfferList.classList.add('active');
    }
}

// Слайдер
$('.offer__slider-inner').slick({
    dots: true,
    infinite: true,
    arrows: false,
    speed: 200,
    autoplay: true,
    slidesToShow: 1,
  });
      


// Открыть-Закрыть

document.addEventListener("DOMContentLoaded", () => {
    const mainBtn = document.querySelector(".section__main-btn");
    const mainTextWrap = document.querySelector(".main-text__wrap-content");
  
    if (!mainBtn || !mainTextWrap) return;

    let isExpanded = false;
  
    const toggleContent = () => {
      if (!isExpanded) {

        const fullHeight = mainTextWrap.scrollHeight; 
        mainTextWrap.style.height = `${fullHeight}px`;
        mainBtn.textContent = "Закрити"; 
      } else {

        mainTextWrap.style.height = "100px";
        mainBtn.textContent = "Детально"; 
      }
      isExpanded = !isExpanded; 
    };

    mainBtn.addEventListener("click", toggleContent);
  });
  


// Меню

document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".header__menu-btn");
    const bottomInner = document.querySelector(".header__bottom-inner");
    const menuOpenIcon = document.querySelector(".header__menu-btn__img#menu-open");
    const menuCloseIcon = document.querySelector(".header__menu-btn__img#menu-close");
  
    const toggleMenu = () => {
      const isActive = bottomInner.classList.toggle("active");
  
      if (isActive) {
        menuOpenIcon.classList.add("active");
        menuCloseIcon.classList.remove("active");
      } else {
        menuOpenIcon.classList.remove("active");
        menuCloseIcon.classList.add("active");
      }
    };
  
    const closeMenu = (event) => {
      if (
        !bottomInner.contains(event.target) && 
        !menuBtn.contains(event.target)       
      ) {
        bottomInner.classList.remove("active");
        menuOpenIcon.classList.remove("active");
        menuCloseIcon.classList.add("active");
      }
    };

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        bottomInner.classList.remove("active");
        menuOpenIcon.classList.remove("active");
        menuCloseIcon.classList.add("active");
      }
    };

    menuBtn.addEventListener("click", toggleMenu);
    document.addEventListener("click", closeMenu);
    document.addEventListener("keydown", handleEscKey);
  });
  



  // Header__bottop fixed

  document.addEventListener("DOMContentLoaded", () => {
    const headerTop = document.querySelector(".header__top");
    const headerBottom = document.querySelector(".header__bottom");
  
    if (!headerTop || !headerBottom) return;
  
    const handleScroll = () => {
      if (window.innerWidth <= 1000) {
        const headerTopHeight = headerTop.offsetHeight; 
  
        if (window.scrollY >= headerTopHeight) {
          headerBottom.style.position = "fixed";
        } else {
          headerBottom.style.position = "static";
        }
      } else {
        headerBottom.style.position = "static";
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    window.addEventListener("resize", handleScroll);
  });
  
  


  
  



