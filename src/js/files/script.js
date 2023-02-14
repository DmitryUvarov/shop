// Подключение функционала "Чертогов Фрилансера"
import { addTouchClass, isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

addTouchClass()

document.documentElement.addEventListener('click', documentActions)

function documentActions(event) {

    const targerElement = event.target;
    const html = document.documentElement;


    if (targerElement.closest('.catalog-btn')) {
        if (!html.closest('.catalog-open')) {
            // если каталог не открыт
            if (document.querySelector('.content-catalog__item.active')) {
                document.querySelector('.content-catalog__item.active').classList.remove('active')
            }

            const catalogItem = document.querySelectorAll('.content-catalog__item')
            catalogItem[0].classList.add('active')

        }
        else if (document.querySelector('.content-catalog__item.active')) {
            document.querySelectorAll('.content-catalog__item.active').forEach(element => {
                element.classList.remove('active')
            })
        }
        html.classList.toggle('catalog-open')
        html.classList.toggle('lock')
    }

    if (targerElement.closest('.content-catalog__link') && document.documentElement.closest('.touch')) {
        event.preventDefault()
    }


    if (targerElement.closest('.category-header__link') && window.innerWidth < 992) {
        event.preventDefault()

        if (!targerElement.closest('.category-header__item.active')) {
            if (document.querySelector('.category-header__item.active')) {
                document.querySelector('.category-header__item.active').classList.remove('active')
            }
            const parent = targerElement.closest('.category-header__item');
            parent.classList.add('active')
        }

    }

    if (targerElement.closest('.icon-menu') && !document.documentElement.closest('.menu-open')) {
        if (document.querySelector('.category-header__item.active')) {
            document.querySelector('.category-header__item.active').classList.remove('active')
        }
        document.querySelector('.category-header__item').classList.add('active')
    }


}

document.addEventListener("DOMContentLoaded", function(event) {

    const catalogItems = document.querySelectorAll('.content-catalog__item')

    catalogItems.forEach(catalogItem => {
        catalogItem.addEventListener('mouseenter', (e) => {
            if (!e.target.closest('.content-catalog__item.active')) {
                if (document.querySelector('.content-catalog__item.active')) {
                    document.querySelector('.content-catalog__item.active').classList.remove('active')
                }
                e.target.classList.add('active')
            }
        })
    });


});


