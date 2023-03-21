const lazyLoadInstance = new LazyLoad({
  // Your custom settings go here
});

const heroSwiper = new Swiper('.hero__swiper', {
  spaceBetween: 200,
  loop: false,
  // rewind: true,

  navigation: false,
  pagination: {
    el: '.hero__swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    480: {
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ['-120%', 0, -500],
        },
        next: {
          shadow: true,
          translate: ['120%', 0, -500],
        },
      },
    }
  }
});

const offersSwiper = new Swiper('.offers__swiper', {
  loop: false,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 16,
  navigation: {
    nextEl: '.offers__button-next',
    prevEl: '.offers__button-prev',
  },
  breakpoints: {
    768: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 32
    },
    1024: {
      slidesPerGroup: 3,
      slidesPerView: 3,
      spaceBetween: 32
    },
    1320: {
      slidesPerGroup: 3,
      slidesPerView: 'auto',
      spaceBetween: 32
    }
  }
});

const usefulSwiper = new Swiper('.useful__swiper', {
  loop: false,
  slidesPerView: 'auto',
  slidesPerGroup: 2,
  spaceBetween: 32,
  navigation: {
    nextEl: '.useful__button-next',
    prevEl: '.useful__button-prev',
  },
  breakpoints: {
    320: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 16
    },
    768: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 32
    },
    1024: {
      slidesPerGroup: 1,
      slidesPerView: 3,
      spaceBetween: 32
    },
    1320: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 32
    },
  }
});

const similarSwiper = new Swiper('.similar-products__swiper', {
  loop: false,
  autoHeight: false,
  slidesPerView: 2,
  slidesPerGroup: 1,
  spaceBetween: 16,
  navigation: {
    nextEl: '.similar-products__button-next',
    prevEl: '.similar-products__button-prev',
  },
  breakpoints: {
    768: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 32
    },
    1024: {
      slidesPerGroup: 3,
      slidesPerView: 3,
      spaceBetween: 32
    },
    1320: {
      slidesPerGroup: 4,
      slidesPerView: 4,
      spaceBetween: 32
    }
  }
});

const thumbsSwiper = new Swiper('.product__thumbs', {
  spaceBetween: 38,
  slidesPerView: 'auto',
  slidesPerGroup: 1,
  watchSlidesProgress: true,
  slideToClickedSlide: true,
  breakpoints: {
    320: {
      spaceBetween: 38,
      direction: 'horizontal'
    },
    768: {
      spaceBetween: 12,
      slidesPerView: 4,
      direction: 'vertical'
    },
    1024: {

      spaceBetween: 38,
      slidesPerView: 'auto',
      direction: 'horizontal'
    }
  }
});
// thumbsSwiper.setProgress(1, 0);
const previewSwiper = new Swiper('.product__preview', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 16,

  thumbs: {
    swiper: thumbsSwiper,
  },

});
// previewSwiper.setProgress(1, 0);


const filters = document.querySelectorAll('.filters__item');

filters.forEach((filter) => {
  console.log(filter);
  filter.addEventListener('click', (e) => {
    console.log(e);
    const content = e.currentTarget.querySelector('.filter__content');
    content.classList.toggle ('filter__content--active');
  });
});

const catalogSwiper = new Swiper('.catalog__swiper', {
  loop: false,

  navigation: false,
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 16,
  grid: {
    rows: 2,
    fill: 'row',
  },
  breakpoints: {
    320: {
      spaceBetween:16,
      grid: {
        rows: 2,
      },
    },
    768: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 32,
      grid: {
        rows: 3,
      },
    },
  },
  pagination: {
    el: '.catalog__pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<button class="' + className + ' button button-secondary catalog__btn-page">' + (index + 1) + "</button>";
    },
  },
});

const burgerBtn = document.querySelector('.burger__button');
const burgerMenu = document.querySelector('.burger__menu');
burgerBtn.addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('burger__button--active');
  burgerMenu.classList.toggle('burger__menu--active');
  console.log('click!');
});
