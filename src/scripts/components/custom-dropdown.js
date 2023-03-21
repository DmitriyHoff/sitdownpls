/** Выпадающие списки фильтров */
const filters = document.querySelectorAll('.filters__item');

filters.forEach((filter) => {


  filter.addEventListener('click', (e) => {
    {
      e.stopImmediatePropagation();
      filters.forEach((hideFilter) => {
        if(hideFilter !== e.currentTarget) {
          const hideContent = hideFilter.querySelector('.filter__content');
          hideFilter.classList.toggle('filters__item--active', false);
          hideContent.classList.toggle('filter__content--active', false);
        }
      });
      const content = e.currentTarget.querySelector('.filter__content');


      if(e.currentTarget === filter && e.target !== content && e.currentTarget.classList.contains('filters__item--active')) {
        e.currentTarget.classList.toggle('filters__item--active', false);
        content.classList.toggle('filter__content--active', false);
      }
      else {
        e.currentTarget.classList.toggle('filters__item--active', true);
        content.classList.toggle('filter__content--active', true);
      }
    }
  });
});
