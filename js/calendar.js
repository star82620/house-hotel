
    
    let calendar;

    const options = {
        type: 'multiple',
        actions: {
            changeToInput(e, HTMLInputElement, dates, time, hours, minutes, keeping) {
                dates.sort((a,b)=>+new Date(a) - +new Date(b));
                // console.log(dates)
                if(dates.length===1){
                    HTMLInputElement.value = dates[0]
                }else{
                HTMLInputElement.value = `${dates[0]} - ${dates[dates.length-1]}`;
                }
            }
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

    //渲染日曆disable
    function initializeCalendar(obj) {
        calendar = new VanillaCalendar('#calendar', options);
        calendar.init();

        calendar.settings.range.disabled = obj;
        calendar.update();
    }

    document.addEventListener('DOMContentLoaded', () => {
    calendar = new VanillaCalendar('#calendar', options);
        
        calendar.init();

        // renderRoomPage()

    });


    