
    const BookingEnterDate = document.querySelector('.enterDate');
    const BookingLeaveDate = document.querySelector('.leaveDate');
    // console.log(BookingEnterDate, BookingLeaveDate)
    

    let calendar;
    let selectedDates = [];
    let newFilterHolidays;

    //新增入住日期&退房日期 下拉式日曆
    function inputCalendar(){
        // testCalendar();
        console.log(calendar)

        // calendar.input = true;

        // calendar.update()


    }


    // function addChangeToInput(){
    //     return changeToInput(e, HTMLInputElement, dates, time, hours, minutes, keeping){
    //         // dates.sort((a,b)=>+new Date(a) - +new Date(b));
    //         // console.log(dates)
    //         if(dates.length===1){
    //             HTMLInputElement.value = dates[0]
    //         }else{
    //         HTMLInputElement.value = `${dates[0]} - ${dates[dates.length-1]}`;
    //         }
    //     }
    // }

    //初始化inputCalendar
    // function initializeInputCalendar(obj) {
    //     calendar = new VanillaCalendar(BookingEnterDate, options);
    //     // calendar.type = 'default';
    //     calendar.input = true;
    //     calendar.settings.selection.day = 'single';
    //     calendar.actions.changeToInput=
        

    //     if(dates.length===1){
    //         HTMLInputElement.value = dates[0];
    //         calendar.HTMLElement.classList.add('vanilla-calendar_hidden');

    //     }
    //     calendar.init();

        
    //     calendar.update();
    // }

    //渲染入住日期＆退房日期
    function renderSelectedDates(){
        // console.log(selectedDates)
        if(selectedDates.length>0){
            BookingEnterDate.value=selectedDates[0];
            BookingLeaveDate.value=selectedDates[selectedDates.length-1];
        }
    }

    //渲染日曆disable
    function initializeCalendar(obj) {
        calendar = new VanillaCalendar('#calendar', options);
        calendar.init();

        calendar.settings.range.disabled = obj;
        calendar.update();
    }

    //日曆樣式
    const options = {
        type: 'multiple',
        actions: {
            clickDay(event, dates) {
                dates.sort((a, b) => +new Date(a) - +new Date(b)) //預防點擊較晚日期排在最前面
            // console.log(dates); //ex. ['2023-07-22']
            // console.log(calendar)
            selectedDates = dates;
            },
            
            // changeToInput(e, HTMLInputElement, dates, time, hours, minutes, keeping) {
            //     // dates.sort((a,b)=>+new Date(a) - +new Date(b));
            //     // console.log(dates)
            //     if(dates.length===1){
            //         HTMLInputElement.value = dates[0]
            //     }else{
            //     HTMLInputElement.value = `${dates[0]} - ${dates[dates.length-1]}`;
            //     }
            // }
        },
        CSSClasses: {
            dayBtn: 'dayBtn',
            dayBtnToday: 'dayBtnToday',
            dayBtnSelected: 'dayBtnSelected',
            daySelectedIntermediate: 'daySelectedIntermediate',
            daySelectedLast: 'daySelectedLast',
            daySelectedFirst: 'daySelectedFirst',
            dayBtnDisabled: 'dayBtnDisabled',
            month: 'month',
            year: 'year',
            dayBtnHover: 'dayBtnHover'
        },
        settings: {
            iso8601: false, // true>'一'為當週第1天; false>'日'為當週第1天
            selection: {
                day: 'multiple-ranged',
            },
            visibility: {
                daysOutside: false,
                weekend: false,
            },
            lang: 'define',
            range: {
                disablePast: true, //不可選取過期日期
                disabled: ['2023-08-22'], //ex. 8/10-8/13 & 8/22不可選取
            },

        },
        locale: {
            months: ['January', 'February', 'March', 'April', 'May', 'Jue', 'July', 'August', 'September', 'October', 'November', 'December'],
            weekday: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
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
        }
    }

    //初始化日曆
    document.addEventListener('DOMContentLoaded', () => {
    calendar = new VanillaCalendar('#calendar', options);
        

        calendar.init();

        updateHolidays()


    });

    //更新台灣2023(五-日)
    function updateHolidays(){
        fetch('https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/2023.json', {
            method: "GET",
        })
        .then((res) => res.json())
        .then((TaiwanDays) => {
            // console.log(TaiwanDays)
            let filterHolidays = TaiwanDays.filter((item)=>{
                return item.week === '五' || item.week === '六' || item.week === '日'
    
            })
            // console.log(filterHolidays);

            newFilterHolidays = filterHolidays.map((item)=>{
                const year = item.date.substr(0, 4);
                const month = item.date.substr(4, 2);
                const day = item.date.substr(6, 2);
                const formattedDate = `${year}-${month}-${day}`;

                return formattedDate;
            })

            // console.log(newFilterHolidays)

            calendar.settings.selected.holidays = newFilterHolidays
            
            calendar.update()

            // console.log(calendar.selectedHolidays);

    
        });
    }
    


    //測試區
    // const testOptions = {
    //     type: 'default',
    //     input: true
    // };
    

    // function testCalendar(){
    //     const hello = new VanillaCalendar(BookingLeaveDate, testOptions);
    //     hello.init();

    //     console.log(hello)
        
    // }