const BookingEnterDate = document.querySelector(".enterDate");
const BookingLeaveDate = document.querySelector(".leaveDate");

let calendar;
let inputCalendar;
let selectedDates = [];
let inputSelectedDates = [];
let inputSelectedEnterDates = [];
let inputSelectedLeaveDates = [];
let newFilterHolidays;

//新增入住日期 下拉式日曆，初始化inputCalendar
function initializeEnterCalendar(btn) {
  inputCalendar = new VanillaCalendar(btn, InputEnterOptions);
  inputCalendar.init();

  inputCalendar.settings.range.disabled = calendar.rangeDisabled;
  inputCalendar.update();
}

//新增退房日期 下拉式日曆，初始化inputCalendar
function initializeLeaveCalendar(btn) {
  inputCalendar = new VanillaCalendar(btn, InputLeaveOptions);
  inputCalendar.init();

  inputCalendar.settings.range.disabled = calendar.rangeDisabled;
  inputCalendar.update();
}

//下拉式日曆 入住日期&退房日期是否同天
function checkSameSelectedDates(
  inputSelectedEnterDates,
  inputSelectedLeaveDates,
  dates,
  HTMLInputElement
) {
  if (
    inputSelectedEnterDates.toString() === inputSelectedLeaveDates.toString()
  ) {
    inputSelectedLeaveDates = [];
    BookingLeaveDate.value = "";
  } else {
    HTMLInputElement.value = dates[0];
  }
}

//下拉式日曆 計算日期
function inputMakeSelectedDates(
  inputSelectedEnterDates,
  inputSelectedLeaveDates
) {
  if (inputSelectedEnterDates.length === 0) {
    inputSelectedEnterDates = selectedDates[0];
  }
  if (inputSelectedLeaveDates.length === 0) {
    inputSelectedLeaveDates = selectedDates[selectedDates.length - 1];
  }
  const startDate = new Date(inputSelectedEnterDates);
  const endDate = new Date(inputSelectedLeaveDates);
  const datesInRange = [];
  let currentDate;

  if (endDate < startDate) {
    currentDate = new Date(endDate);
    while (currentDate <= startDate) {
      datesInRange.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  } else {
    currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      datesInRange.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  selectedDates = datesInRange;

  bookingAmount();

  let ary = datesInRange.filter((item) => {
    return !dates.includes(item);
  });

  calendar.selectedDates = ary;
  calendar.update();
}

//日曆 計算日期
function makeSelectedDates(dates) {
  const startDate = new Date(dates[0]);
  const endDate = new Date(dates[dates.length - 1]);
  const datesInRange = [];
  let currentDate;

  currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    datesInRange.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  selectedDates = datesInRange;

  bookingAmount();

  let ary = datesInRange.filter((item) => {
    return !dates.includes(item);
  });
}

//渲染入住日期＆退房日期
function renderSelectedDates() {
  BookingEnterDate.value = "";
  BookingLeaveDate.value = "";
  if (selectedDates.length > 0) {
    if (selectedDates[0] === selectedDates[selectedDates.length - 1]) {
      BookingEnterDate.value = selectedDates[0];
      BookingLeaveDate.value = "";
    } else {
      BookingEnterDate.value = selectedDates[0];
      BookingLeaveDate.value = selectedDates[selectedDates.length - 1];
    }
  }
}

//渲染日曆disable
function initializeCalendar(obj) {
  calendar = new VanillaCalendar("#calendar", options);
  calendar.init();

  calendar.settings.range.disabled = obj;
  calendar.update();
}

//日曆樣式
const options = {
  type: "multiple",
  actions: {
    clickDay(event, dates) {
      dates.sort((a, b) => +new Date(a) - +new Date(b)); //預防點擊較晚日期排在最前面
      selectedDates = dates;
      makeSelectedDates(selectedDates);
    },
  },
  CSSClasses: {
    dayBtn: "dayBtn",
    dayBtnToday: "dayBtnToday",
    dayBtnSelected: "dayBtnSelected",
    daySelectedIntermediate: "daySelectedIntermediate",
    daySelectedLast: "daySelectedLast",
    daySelectedFirst: "daySelectedFirst",
    dayBtnDisabled: "dayBtnDisabled",
    month: "month",
    year: "year",
    dayBtnHover: "dayBtnHover",
  },
  settings: {
    iso8601: false, // true>'一'為當週第1天; false>'日'為當週第1天
    selection: {
      day: "multiple-ranged",
    },
    visibility: {
      daysOutside: false,
      weekend: false,
    },
    lang: "define",
    range: {
      disablePast: true, //不可選取過期日期
      disabled: ["2023-08-22"], //ex. 8/10-8/13 & 8/22不可選取
      min: "2023-07-01",
      max: "2023-09-30",
    },
  },
  locale: {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "Jue",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    weekday: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  },
  DOMTemplates: {
    default: `
                <div class="vanilla-calendar-header">
                    <#ArrowPrev />
                    <div class="vanilla-calendar-header__content">
                    <#Month /><span> </span><#Year />
                    </div>     
                </div>
                <div class="vanilla-calendar-wrapper">
                    <div class="vanilla-calendar-content">
                    <#Week />
                    <#Days />
                    </div>
                </div>
                <div class="vanilla-calendar-header">
                    <div class="vanilla-calendar-header__content">
                    <#Month /><span> </span><#Year />
                    </div>     
                    <#ArrowNext />
                </div>
                <div class="vanilla-calendar-wrapper">
                    <div class="vanilla-calendar-content">
                    <#Week />
                    <#Days />
                    </div>
                </div>
                `,
  },
};

//下拉式日曆樣式-入住
const InputEnterOptions = {
  input: true,
  actions: {
    clickDay(event, dates) {
      dates.sort((a, b) => +new Date(a) - +new Date(b)); //預防點擊較晚日期排在最前面
      inputSelectedEnterDates = dates;
      inputMakeSelectedDates(inputSelectedEnterDates, inputSelectedLeaveDates);
    },
    changeToInput(e, HTMLInputElement, dates, time, hours, minutes, keeping) {
      if (!dates[0]) return (HTMLInputElement.value = "");
      HTMLInputElement.value = dates[0];
    },
  },
  CSSClasses: {
    dayBtn: "dayBtn",
    dayBtnToday: "dayBtnToday",
    dayBtnSelected: "dayBtnSelected",
    daySelectedIntermediate: "daySelectedIntermediate",
    daySelectedLast: "daySelectedLast",
    daySelectedFirst: "daySelectedFirst",
    dayBtnDisabled: "dayBtnDisabled",
    month: "month",
    year: "year",
    dayBtnHover: "dayBtnHover",
  },
  settings: {
    iso8601: false, // true>'一'為當週第1天; false>'日'為當週第1天
    visibility: {
      daysOutside: false,
      weekend: false,
    },
    lang: "define",
    range: {
      disablePast: true, //不可選取過期日期
      disabled: ["2023-08-22"], //ex. 8/10-8/13 & 8/22不可選取
      min: "2023-07-01",
      max: "2023-09-30",
    },
  },
  locale: {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "Jue",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    weekday: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  },
  DOMTemplates: {
    default: `
                <div class="vanilla-calendar-header">
                    <#ArrowPrev />
                    <div class="vanilla-calendar-header__content">
                    <#Month /><span> </span><#Year />
                    </div>  
                    <#ArrowNext />
                </div>
                <div class="vanilla-calendar-wrapper">
                    <div class="vanilla-calendar-content">
                    <#Week />
                    <#Days />
                    </div>
                </div>
                `,
  },
};

//下拉式日曆樣式-退房
const InputLeaveOptions = {
  input: true,
  actions: {
    clickDay(event, dates) {
      dates.sort((a, b) => +new Date(a) - +new Date(b)); //預防點擊較晚日期排在最前面
      inputSelectedLeaveDates = dates;
      inputMakeSelectedDates(inputSelectedEnterDates, inputSelectedLeaveDates);
    },
    changeToInput(e, HTMLInputElement, dates, time, hours, minutes, keeping) {
      if (!dates[0]) return (HTMLInputElement.value = "");
      HTMLInputElement.value = dates[0];
    },
  },
  CSSClasses: {
    dayBtn: "dayBtn",
    dayBtnToday: "dayBtnToday",
    dayBtnSelected: "dayBtnSelected",
    daySelectedIntermediate: "daySelectedIntermediate",
    daySelectedLast: "daySelectedLast",
    daySelectedFirst: "daySelectedFirst",
    dayBtnDisabled: "dayBtnDisabled",
    month: "month",
    year: "year",
    dayBtnHover: "dayBtnHover",
  },
  settings: {
    iso8601: false, // true>'一'為當週第1天; false>'日'為當週第1天
    visibility: {
      daysOutside: false,
      weekend: false,
    },
    lang: "define",
    range: {
      disablePast: true, //不可選取過期日期
      disabled: ["2023-08-22"], //ex. 8/10-8/13 & 8/22不可選取
      min: "2023-07-01",
      max: "2023-09-30",
    },
  },
  locale: {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "Jue",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    weekday: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  },
  DOMTemplates: {
    default: `
        <div class="vanilla-calendar-header">
            <#ArrowPrev />
            <div class="vanilla-calendar-header__content">
            <#Month /><span> </span><#Year />
            </div>  
            <#ArrowNext />
        </div>
        <div class="vanilla-calendar-wrapper">
            <div class="vanilla-calendar-content">
            <#Week />
            <#Days />
            </div>
        </div>
        `,
  },
};

//初始化日曆
document.addEventListener("DOMContentLoaded", () => {
  calendar = new VanillaCalendar("#calendar", options);

  calendar.init();

  updateHolidays();
});

//更新台灣2023(五-日)
function updateHolidays() {
  fetch("https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/2023.json", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((TaiwanDays) => {
      let filterHolidays = TaiwanDays.filter((item) => {
        return item.week === "五" || item.week === "六" || item.week === "日";
      });

      newFilterHolidays = filterHolidays.map((item) => {
        const year = item.date.substr(0, 4);
        const month = item.date.substr(4, 2);
        const day = item.date.substr(6, 2);
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
      });

      calendar.settings.selected.holidays = newFilterHolidays;

      calendar.update();
    });
}
