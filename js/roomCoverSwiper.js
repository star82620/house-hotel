// room.html 背景圖片 swiper

function renderRoomCover() {
  const roomCoverContainer = document.querySelector(".roomCoverContainer");
  const roomCoverSwiper = document.querySelector(".roomCoverSwiper");
  const roomSwiperWrapper = roomCoverSwiper.querySelector(".swiper-wrapper");
  const photoZoomIn = document.querySelector(".photoZoomIn");

  const roomImages = roomDes.imageUrl;
  const roomName = roomDes.name;

  // 生成 swiper
  let roomSwiperHtml = "";
  roomImages.forEach((img, index) => {
    const roomSwiperElement = `
      <div
        class="swiper-slide"
        data-imgindex="${index}"
        style="background-image:url('${img}');">
      </div>
    `;

    roomSwiperHtml += roomSwiperElement;
  });

  roomSwiperWrapper.innerHTML = roomSwiperHtml;

  const roomSwiper = new Swiper(".roomCoverSwiper", {
    slidesPerView: 1,
    allowTouchMove: false,
    effect: "fade",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  roomCoverContainer.addEventListener("click", popupZoomIn);
  console.log(roomCoverContainer);

  // console.log(document.body.clientWidth);
  //popupZoomIn 生成 popup
  function popupZoomIn(e) {
    console.log("DDD");
    const activeSlide = document.querySelector(".swiper-slide-active");
    const activeSlideImg = activeSlide.style.backgroundImage.split('"')[1];
    const activeSlideIndex = activeSlide.dataset.imgindex;
    // const imgWidth = document.body.clientWidth;

    console.log(activeSlideImg);

    const zoomPhotoElement = `
        <div class="zoomBackdrop">
          <div class="zoomPrevArrow"></div>
            <img data-imgindex="${activeSlideIndex}" src="${activeSlideImg}" />
          <div class="zoomNextArrow"></div>
        </div>
        `;

    photoZoomIn.innerHTML = zoomPhotoElement;

    // showPopup(e);
  }
}

// import PhotoSwipeLightbox from "https://unpkg.com/photoswipe/dist/photoswipe-lightbox.esm.js";

// const lightbox = new PhotoSwipeLightbox({
//   gallery: "#my-gallery",
//   children: "a",
//   pswpModule: () => import("https://unpkg.com/photoswipe"),
//   zoom: false,
//   counter: false,
//   padding: { top: 72, bottom: 72 },
// });
// lightbox.init();

// function showPopup(e) {
//   e.preventDefault();
//   popup.classList.add("d-flex");
//   popupBackdrop.classList.add("d-flex");
// }
// function closePopup(e) {
//   e.preventDefault();
//   popup.classList.remove("d-flex");
//   popupBackdrop.classList.remove("d-flex");
// }
