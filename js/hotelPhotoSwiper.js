// index.html 背景圖片 swiper

const hotelPhotoSwiper = new Swiper(".hotelPhotoSwiper", {
  slidesPerView: 1,
  allowTouchMove: false,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
