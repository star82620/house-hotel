// room.html 背景圖片 swiper
const roomCoverContainer = document.querySelector(".roomCoverContainer");
const roomCoverSwiper = document.querySelector(".roomCoverSwiper");
const roomSwiperWrapper = roomCoverSwiper.querySelector(".swiper-wrapper");
const photoZoomIn = document.querySelector(".photoZoomIn");
let roomImages = "";
let roomName = "";
let imgIndex = 0;
let isInMin = "";
let isInMax = "";
let prevState = "";
let nextState = "";

//Swiper 背景動態
function renderRoomCover() {
  roomImages = roomDes.imageUrl;
  roomName = roomDes.name;

  // 生成 swiper 元素
  let roomSwiperHtml = "";
  roomImages.forEach((img) => {
    const roomSwiperElement = `
      <div
        class="swiper-slide""
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

  //切換幻燈片時就修改 imgIndex
  roomSwiper.on("slideChange", function () {
    imgIndex = roomSwiper.activeIndex;
  });

  //點照片放大
  roomCoverContainer.addEventListener("click", openZoomIn);
}

//openZoomIn 生成 popup
function openZoomIn(e) {
  const isBackRoomList = e.target.classList.contains("backRoomList");
  const isPagination = e.target.classList.contains("swiper-pagination-bullet");
  const isBookingButton = e.target.classList.contains("bookingButton");

  //如果點到這些東西，不要打開 popup
  if (isBackRoomList || isPagination || isBookingButton) {
    return;
  }

  checkCoverRange();

  prevState = isInMin ? "" : "disable";
  nextState = isInMax ? "" : "disable";

  //生成 popup HTML
  const zoomPhotoElement = `
        <div class="zoomBackdrop">
            <img class="zoomPrevArrow ${prevState}" src="./img/room/icon-arrow-left-white.svg" alt="icon-arrow-left-white" />
          <div> 
            <img class="zoomPhoto" src="${roomImages[imgIndex]}" />
          </div>
            <img class="zoomNextArrow ${nextState}" src="./img/room/icon-arrow-right-white.svg" alt="icon-arrow-right-white" />
        </div>
        `;
  photoZoomIn.innerHTML = zoomPhotoElement;
  document.body.style.overflow = "hidden";

  //點擊 popup
  window.addEventListener("keydown", (keydownEvent) => {
    if (keydownEvent.key === "Escape") {
      closePopup(keydownEvent);
    }
  });

  photoZoomIn.addEventListener("click", closePopup);
}

//檢查目前狀態
function checkCoverRange() {
  isInMin = imgIndex > 0;
  isInMax = imgIndex < roomImages.length - 1;
}

//點擊 popup
function closePopup(e) {
  const zoomPhoto = document.querySelector(".zoomPhoto");
  const zoomPrevArrow = document.querySelector(".zoomPrevArrow");
  const zoomNextArrow = document.querySelector(".zoomNextArrow");
  const isPopupBackdrop = e.target.classList.contains("zoomBackdrop");
  const isZoomPrev = e.target.classList.contains("zoomPrevArrow");
  const isZoomNext = e.target.classList.contains("zoomNextArrow");

  //關閉 popup
  if (isPopupBackdrop || e.key === "Escape") {
    photoZoomIn.innerHTML = "";
  }

  const prevIndex = imgIndex - 1;
  const nextIndex = imgIndex + 1;

  //可以按 Prev
  if (isZoomPrev && isInMin) {
    console.log("點擊了 Prev");
    zoomPhoto.setAttribute("src", `${roomImages[prevIndex]}`);
    imgIndex = prevIndex;
    checkCoverRange();
    zoomPrevArrow.classList.toggle("disable", !isInMin);
    zoomNextArrow.classList.toggle("disable", !isInMax);
  }

  // 可以按 Next
  if (isZoomNext && isInMax) {
    zoomPhoto.setAttribute("src", `${roomImages[nextIndex]}`);
    imgIndex = nextIndex;
    checkCoverRange();
    zoomPrevArrow.classList.toggle("disable", !isInMin);
    zoomNextArrow.classList.toggle("disable", !isInMax);
  }
}
