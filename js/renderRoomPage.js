
let ary = [
  {roomEn: 'Single Room', roomCh: '單人間', bedEn: 'single', bedCh: '單人床', 'people': ''},
  {roomEn: 'Deluxe Single Room', roomCh: '豪華單人間', bedEn: 'small double', bedCh: '小雙人床', 'people': ''},
  {roomEn: 'Twin Room', roomCh: '雙人間', bedEn: 'double', bedCh: '雙人床', 'people': ''},
  {roomEn: 'Double Room', roomCh: '雙人間', bedEn: 'queen', bedCh: '皇后床', 'people': ''},
  {roomEn: 'Deluxe Double Room', roomCh: '豪華雙人間', bedEn: 'double', bedCh: '雙人床', 'people': ''}
]

let chAry = [
  {'name':'空調', 'order': '12', 'YN': ''},
  {'name': '早餐', 'order': '1', 'YN': ''},
  {'name': '適合兒童', 'order': '5', 'YN': ''},
  {'name': '漂亮的視野', 'order': '7', 'YN': ''},
  {'name': 'Mini Bar', 'order': '2', 'YN': ''},
  {'name': '攜帶寵物', 'order': '10', 'YN': ''},
  {'name': '冰箱', 'order': '8', 'YN': ''},
  {'name': 'Room Service', 'order': '3', 'YN': ''},
  {'name': '全面禁煙', 'order': '11', 'YN': ''},
  {'name': '沙發', 'order': '9', 'YN': ''},
  {'name': '電話', 'order': '6', 'YN': ''},
  {'name': 'Wifi', 'order': '4', 'YN': ''},
]

//房間內容渲染
function renderRoomPage(){
  const roomContent = document.querySelector('.roomContent');
// console.log(roomContent);
  // console.log(roomDes)

  ary.forEach((item, index)=>{
    // console.log(item)
    if(item.roomEn===roomDes.name){
      if(roomDes.descriptionShort.GuestMin===roomDes.descriptionShort.GuestMax){
        item.people = roomDes.descriptionShort.GuestMin
      }else{
        item.people = `${roomDes.descriptionShort.GuestMin}-${roomDes.descriptionShort.GuestMax}`
      }
    
      roomContent.innerHTML = `
        <div class="roomContentTitle">
          <h1 class="roomName fz-40">${roomDes.name}</h1>
          <div class="roomSummary fz-14">
            ${ary[index].people}人・ ${ary[index].roomCh}・ 附早餐・衛浴1間・${roomDes.descriptionShort.Footage}平方公尺
          </div>
        </div>
        <div class="roomCheckTime fz-14">
          平日（一～四）價格：${roomDes.normalDayPrice} / 假日（五〜日）價格：${roomDes.holidayPrice}<br />
          入住時間：${roomDes.checkInAndOut.checkInEarly}（最早）/ ${roomDes.checkInAndOut.checkInLate}（最晚） <br />
          退房時間：${roomDes.checkInAndOut.checkOut}
        </div>
        <ul class="roomNotice fz-14">
          <li>${ary[index].roomCh}僅供${ary[index].people}位客人使用。</li>
          <li>臥室配有${ary[index].bedCh}和私人浴室。</li>
          <li>
            您需要的一切為您準備：床單和毯子，毛巾，肥皂和洗髮水，吹風機。
          </li>
          <li>房間裡有AC，當然還有WiFi。</li>
        </ul>
        ${roomChangeIcon()}
        <div class="roomBookingState">
          <h3 class="fz-14">空房狀態查詢</h3>
          <div id='calendar' class="bookingCalender">
            <!-- 行事曆 -->
          </div>
          <div class="reSearch fz-14">重新選取</div>
        </div>
      `
      initializeCalendar();
      // initializeInputCalendar();

    }
    
    
  })

}

//房間內容icon渲染
function roomChangeIcon(){
  const roomFacilityIcons = document.querySelectorAll('.roomFacilityIcon');

  let amenities = roomDes.amenities;
  // console.log(amenities)
    

  //放入amenities值
  Object.values(amenities).forEach((value,index)=>{
    // console.log(value)
    chAry[index].YN=value;
  })
  // console.log(chAry)

  //排列render順序
  let sortedAry = chAry.sort((a, b) => a.order - b.order);
  // console.log(sortedAry)

  // render畫面
  let str = '';
  sortedAry.forEach((item, index)=>{
    if(item.YN){
      str+=`
        <li>
          <div class="roomFacilityIcon">
            <img
              class="FacilityIconMain"
              src="./img/room/icon/icon-${item.order}.svg"
              alt="${item.name}"
            />
            <img
              class="FacilityIconSmall"
              src="./img/room/icon/icon-0-check.svg"
              alt="icon-0-cancel"
            />
          </div>
          <p class="roomFacilityTitle fz-10">${item.name}</p>
        </li>
      `
    }else{
      str+=`
          <li class='iconOpacityEffect'>
            <div class="roomFacilityIcon">
              <img
                class="FacilityIconMain"
                src="./img/room/icon/icon-${item.order}.svg"
                alt="${item.name}"
              />
              <img
                class="FacilityIconSmall"
                src="./img/room/icon/icon-0-cancel.svg"
                alt="icon-0-cancel"
              />
            </div>
            <p class="roomFacilityTitle fz-10">${item.name}</p>
          </li>
        `
    }

  })

  // console.log(roomFacilityIcons)

  return `
    <ul class="roomFacilities">
      ${str}
    </ul>
  `
}

//訂房內容渲染
function renderBookingPage(){
  ary.forEach((item,index)=>{
    if(item.roomEn===roomDes.name){
      const info = document.querySelector('.info');
      info.innerHTML = `
          <h2 class="fz-24">Single Room</h2>
          <p class="fz-14">
            ${ary[index].people}人・ ${ary[index].roomCh}・附早餐・ 衛浴1間・${roomDes.descriptionShort.Footage}平方公尺<br/>
            平日（一～四）價格：${roomDes.normalDayPrice} / 假日（五〜日）價格：${roomDes.holidayPrice}
          </p>
          <ul class="icon">
          ${bookingChangeIcon()}
          </ul>
          <h3>訂房資訊</h3>
          <ul class="bookingInfoList fz-12">
            <li>
              入住時間：最早${roomDes.checkInAndOut.checkInEarly}，最晚${roomDes.checkInAndOut.checkInLate}；退房時間：${roomDes.checkInAndOut.checkOut}，請自行確認行程安排。
            </li>
            <li>
              平日定義週一至週四；假日定義週五至週日及國定假日。
            </li>
            <li>
              好室旅店全面禁止吸菸。
            </li>
            <li>
              若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六 10:00 - 18:00 )。
            </li>
          </ul>
          <h3 class="fz-16">預約流程</h3>
          <ul class="bookingProcess fz-12">
            <li>
              <div class="pic">
                <img src="img/room/process/icon-post-form.png" alt="icon-post-form">
              </div>
              <p>送出線上預約單</p>
            </li>
            <li>
              <div class="pic">
                <img src="img/room/process/icon-system-reply@2x.png" alt="icon-system-reply">
              </div>
              <p>系統立即回覆是否預訂成功<br/>
              並以簡訊發送訂房通知<br/>
              (若未收到簡訊請來電確認)</p>
            </li>
            <li>
              <div class="pic">
                <img src="img/room/process/icon-payment.png" alt="icon-payment">
              </div>
              <p>入住當日憑訂房通知<br/>
              以現金或刷卡付款即可<br/>
              (僅接受VISA.JCB.銀聯卡)</p>
            </li>
          </ul>
        `;

      renderSelectedDates();
      bookingAmount();
    }
  })

}

//訂房icon渲染
function bookingChangeIcon(){
  let ary = chAry.filter((item)=>{
    return item.YN
  })
  // console.log(ary)
  let str = '';
  ary.forEach((item, index)=>{
    str+= `
      <li>
        <img src="../img/room/icon/icon-${index+1}.svg" alt='${item.name}'>
        <p class="fz-10">${item.name}</p>
      </li>
    `
  })
  return str
  
}

//訂房客戶住房天數
function renderBookingDayAndNight(holidaysCount, normalDaysCount, amount){
  const total = document.querySelector('.total');
  // console.log(days)
  let str = '';
  if(selectedDates.length===0){
    str = `
    <div class="total">
      <p class="days">${selectedDates.length}天</p>
      總計<br/>
      <h4 class="fz-26">$0</h4>
    </div>
  `
  }else{
    str = `
      <div class="total">
        <p class="days">${selectedDates.length}天，${holidaysCount}晚平日，${normalDaysCount}晚假日</p>
        總計<br/>
        <h4 class="fz-26">$${amount}</h4>
      </div>
    `
  }
  total.innerHTML = str;
}

//計算訂房價格
function bookingAmount(){
  console.log()
  // console.log(newFilterHolidays)
  let holidaysCount = 0;
  let normalDaysCount = 0;
  let filterSelectedDates = selectedDates.slice(0,-1)
  console.log(filterSelectedDates)
  filterSelectedDates.forEach((item,index)=>{
    if(filterSelectedDates.includes(item)){
      holidaysCount++
    }else{
      normalDaysCount++
    }
  });
  console.log(holidaysCount, normalDaysCount)
  let holidaysAmount = holidaysCount*roomDes.holidayPrice;
  let normalDaysAmount = normalDaysCount*roomDes.normalDayPrice;
  let amount = holidaysAmount + normalDaysAmount;
  
  renderBookingDayAndNight(holidaysCount, normalDaysCount, amount)
}