'use strict';

// SLIDER COMPONENT /////////////

const slider = document.querySelector('.carousel--slider');
const leftArrow = document.querySelector('.arrow--left__control');
const rightArrow = document.querySelector(' .arrow--right__control');
const indicatorParents = document.querySelector('.controls ul');

//  TABBED COMPONENT ///////////

const tabs = document.querySelectorAll('.overview--tab');
const tabsContainer = document.querySelector('.overview--tab__container');
const tabsContent = document.querySelectorAll('.overview--content');

// Lazy loading images /////////////////////

var lazyLoadInstance = new LazyLoad({
  elements_selector: '.lazy-img',
});

// LAZY LOADING BACKGROUNDS  /////////////////

document.addEventListener('DOMContentLoaded', function () {
  let lazyBackgrounds = [].slice.call(
    document.querySelectorAll('.lazy-background')
  );

  if ('IntersectionObserver' in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function (lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }
});

///////// SLIDER ////////////////////////////////////////////////////////////////////

let sectionIndex = 0;

// AUTO-PLAY ////////////////////////////

setInterval(() => {
  sectionIndex = sectionIndex < 3 ? sectionIndex + 1 : 0;
  setIndex();
  arrowIndex();
}, 9000);

// REFACTORS ////////////////////////////

const setIndex = () => {
  document.querySelector('.controls .selected').classList.remove('selected');
  slider.style.transform = `translate(${sectionIndex * -25}%)`;
};
const arrowIndex = () => {
  indicatorParents.children[sectionIndex].classList.add('selected');
};

// BULLET FUNCTIONALITY //////////////////

document.querySelectorAll('.controls li').forEach((indicator, ind) => {
  indicator.addEventListener('click', function () {
    sectionIndex = ind;
    setIndex();
    arrowIndex();
  });
});

// LEFT ARROW FUNCTIONALITY //////////////

leftArrow.addEventListener('click', () => {
  sectionIndex = sectionIndex > 0 ? sectionIndex - 1 : 3;
  setIndex();
  indicatorParents.children[sectionIndex].classList.add('selected');
});

// RIGHT ARROW FUNCTIONALITY /////////////

rightArrow.addEventListener('click', () => {
  sectionIndex = sectionIndex < 3 ? sectionIndex + 1 : 0;
  setIndex();
  arrowIndex();
});

// Tabbed component //////////////////////////////////////////////////

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.overview--tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('overview--tab__active'));
  tabsContent.forEach(c => c.classList.remove('overview--content__active'));

  // Activate tab
  clicked.classList.add('overview--tab__active');

  // Activate content area
  document
    .querySelector(`.overview--content__${clicked.dataset.tab}`)
    .classList.add('overview--content__active');
});

// SERVICES ///////////////////////////////////////////////////////////
