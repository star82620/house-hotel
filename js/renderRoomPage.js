

function renderRoomPage(){
  const roomContent = document.querySelector('.roomContent');
// console.log(roomContent);
  // console.log(roomDes)
  roomContent.innerHTML = `
          <div class="roomContentTitle">
            <h1 class="roomName fz-40">${roomDes.name}</h1>
            <div class="roomSummary fz-14">
              1人・ 單人床・ 附早餐・衛浴1間・${roomDes.descriptionShort.Footage}平方公尺
            </div>
          </div>
          <div class="roomCheckTime fz-14">
            平日（一～四）價格：${roomDes.normalDayPrice} / 假日（五〜日）價格：${roomDes.holidayPrice}<br />
            入住時間：${roomDes.checkInAndOut.checkInEarly}（最早）/ ${roomDes.checkInAndOut.checkInLate}（最晚） <br />
            退房時間：${roomDes.checkInAndOut.checkOut}
          </div>
          <ul class="roomNotice fz-14">
            <li>單人間僅供一位客人使用。</li>
            <li>臥室配有單人床和私人浴室。</li>
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
}

function roomChangeIcon(){
  const roomFacilityIcons = document.querySelectorAll('.roomFacilityIcon');

  let amenities = roomDes.amenities;
  // console.log(amenities)
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
    if(item.YN===true){
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
    }
  if(item.YN===false){
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