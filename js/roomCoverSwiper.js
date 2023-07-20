// room.html 背景圖片 swiper
const roomCoverContainer = document.querySelector(".roomCoverContainer");
const roomCoverSwiper = document.querySelector(".roomCoverSwiper");
const roomSwiperWrapper = roomCoverSwiper.querySelector(".swiper-wrapper");
const photoZoomIn = document.querySelector(".photoZoomIn");

//Swiper 背景動態
function renderRoomCover() {
  const roomImages = roomDes.imageUrl;
  const roomName = roomDes.name;
  let imgIndex = 0;

  // 生成 swiper 元素
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

  //執行 Swiper 動態
  const roomSwiper = new Swiper(".roomCoverSwiper", {
    slidesPerView: 1,
    allowTouchMove: false,
    effect: "fade",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  //點照片放大
  roomCoverContainer.addEventListener("click", popupZoomIn);
}

//popupZoomIn 生成 popup
function popupZoomIn(e) {
  const activeSlide = document.querySelector(".swiper-slide-active");
  const activeSlideImg = activeSlide.style.backgroundImage.split('"')[1];
  const activeSlideIndex = activeSlide.dataset.imgindex;
  const isBackRoomList = e.target.classList.contains("backRoomList");
  const isPagination = e.target.classList.contains("swiper-pagination-bullet");
  const isBookingButton = e.target.classList.contains("bookingButton");

  //如果點到這些東西，不要打開 popup
  if (isBackRoomList || isPagination || isBookingButton) {
    return;
  }

  // popup 出現
  const zoomPhotoElement = `
        <div class="zoomBackdrop">
          <div class="zoomPrevArrow">
            <img src="./img/room/icon-arrow-left-white.svg" alt="icon-arrow-left-white" />
          </div>
          <div class="zoomPhoto"> 
            <img data-imgindex="${activeSlideIndex}" src="${activeSlideImg}" />
          </div>
          <div class="zoomNextArrow">
            <img src="./img/room/icon-arrow-right-white.svg" alt="icon-arrow-right-white" />
          </div>
        </div>
        `;
  photoZoomIn.innerHTML = zoomPhotoElement;

  //關閉 popup: esc、點擊空白處
  window.addEventListener("keydown", (keydownEvent) => {
    if (keydownEvent.key === "Escape") {
      closePopup(keydownEvent);
    }
  });

  photoZoomIn.addEventListener("click", closePopup);
}

//關閉 popup
function closePopup(e) {
  console.log("close!");

  const isPopupBackdrop = e.target.classList.contains("zoomBackdrop");

  if (isPopupBackdrop || e.key === "Escape") {
    photoZoomIn.innerHTML = "";
  }
}
