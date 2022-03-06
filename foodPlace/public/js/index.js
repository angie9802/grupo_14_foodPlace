let swiper = new Swiper(".swiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: 5,
      spaceBetween: 50,
// init: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    breakpoints: {
      100: {
      slidesPerView: 2,
      spaceBetween: 50,
      }
    } 

  });