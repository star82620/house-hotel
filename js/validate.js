const form = document.querySelector("form");
const nameMessage = document.querySelector(".nameMessage");
const phoneMessage = document.querySelector(".phoneMessage");
const enterDateMessage = document.querySelector(".enterDateMessage");
const leaveDateMessage = document.querySelector(".leaveDateMessage");

function validateCustomerInfo() {
  const result = validate(form, constraints);

  if (!result) {
    nameMessage.innerHTML = "";
    phoneMessage.innerHTML = "";
    enterDateMessage.innerHTML = "";
    leaveDateMessage.innerHTML = "";
    checkBookingFull();
    return;
  }

  nameMessage.innerHTML = result.name || "";
  phoneMessage.innerHTML = result.phone || "";
  enterDateMessage.innerHTML = result.enterDate || "";
  leaveDateMessage.innerHTML = result.leaveDate || "";
}

var constraints = {
  name: {
    presence: {
      message: "^請填寫姓名",
    },
  },
  phone: {
    presence: {
      message: "^請填寫手機號碼，共10碼",
    },
    length: {
      minimum: 10,
      maximum: 10,
      message: "^請填寫手機號碼，共10碼",
    },
  },
  enterDate: {
    presence: {
      message: "^請選擇入住日期",
    },
  },
  leaveDate: {
    presence: {
      message: "^請選擇退房日期",
    },
  },
};
