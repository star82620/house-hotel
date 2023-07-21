//點擊按鈕'Booking Now'，顯示預約畫面
const bookingButton = document.querySelector(".bookingButton");
const booking = document.querySelector(".booking");
const alertElement = document.querySelector(".alert");
const success = document.querySelector(".success");
const fail = document.querySelector(".fail");
const submit = document.querySelector(".submit");
const popUpCloseBtn = document.querySelectorAll(".close");
const popUpScreen = document.querySelectorAll("[data-popUpBtn]");
const customerName = document.querySelector(".name");
const customerPhone = document.querySelector(".phone");

// console.log(name, phone)

//新增訂房日期API
function addBookingDates() {
  console.log(selectedDates);
  let jsonStyle = {
    name: customerName.value,
    tel: customerPhone.value,
    date: selectedDates,
  };

  fetch(
    "https://challenge.thef2e.com/api/thef2e2019/stage6/room/3Elqe8kfMxdZv5xFLV4OUeN6jhmxIvQSTyj4eTgIowfIRvF4rerA2Nuegzc2Rgwu",
    {
      method: "POST",
      headers: {
        Authorization:
          "Bearer QHcLaqsSDAC5HS0fQ3wEiLKguA268w8f3Pz2LgosjLybpkztoGQXzwuHPAgO",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonStyle),
    }
  )
    .then((res) => {
      console.log(res);
      customerName.value = "";
      customerPhone.value = "";
      BookingEnterDate.value = "";
      BookingLeaveDate.value = "";
      init();
    })
    .catch((err) => console.log(err.response.data.message));
}

//確認選擇日期是否包含已訂房日
function checkBookingFull() {
  // console.log(selectedDates)
  // console.log(dates)

  for (let i = 0; i < selectedDates.length; i++) {
    if (dates.includes(selectedDates[i])) {
      fail.style.display = "block";
      return;
    }
  }

  addBookingDates();
  success.style.display = "block";
  booking.style.display = "none";
}

//顯示彈跳視窗
function bookingPopUp(e) {
  e.stopPropagation();
  // console.log(e.target.getAttribute('class'))

  let getClass = e.target.getAttribute("class");
  if (getClass.includes("bookingButton")) {
    booking.style.display = "block";
    renderBookingPage();
    BookingEnterDate.addEventListener(
      "click",
      initializeEnterCalendar(BookingEnterDate)
    );
    BookingLeaveDate.addEventListener(
      "click",
      initializeLeaveCalendar(BookingLeaveDate)
    );
    document.body.style.overflow = "hidden";
  }
  if (getClass.includes("submit")) {
    validateCustomerInfo();
    document.body.style.overflow = "hidden";
  }
  if (getClass.includes("fail")) {
    fail.style.display = "block";
    document.body.style.overflow = "hidden";
  }
}

//關閉彈跳視窗
function popUpClose(e) {
  // console.log(e)
  e.stopPropagation();
  let closeNum = e.target.dataset.close;
  // console.log(closeNum)
  // console.log(popUpScreen[closeNum])
  // console.log(calendar)

  const isBooking = e.target.classList.contains("booking");
  const isAlertElement = e.target.classList.contains("alert");

  if (closeNum) {
    popUpScreen[closeNum].style.display = "none";
  } else {
    if (isBooking) {
      booking.style.display = "none";
    }
    if (isAlertElement) {
      alertElement.style.display = "none";
    }
  }
}

popUpCloseBtn.forEach((item) => {
  item.addEventListener("click", popUpClose);
});
bookingButton.addEventListener("click", bookingPopUp);
submit.addEventListener("click", bookingPopUp);

booking.addEventListener("click", popUpClose);
alertElement.addEventListener("click", popUpClose);
