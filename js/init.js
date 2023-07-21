// init
// 這一頁的 fetch api 有兩支： allRoomApi、specifyRoomAPI

const roomPage = document.querySelector("#roomPage");
const hotelHome = document.querySelector("#hotelHome");
let allRoomData = []; //allRoomApi 抓到的全部房間資料
let roomDes = []; //個別房間的詳細資料
let roomBooking = []; //個別房間的預約資料
let urlId = ""; //url 上的 id
let dates = []; //bookingDate

function init() {
  const allRoomApi = "https://challenge.thef2e.com/api/thef2e2019/stage6/rooms";

  // GET 讀取所有房間資料
  fetch(allRoomApi, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer QHcLaqsSDAC5HS0fQ3wEiLKguA268w8f3Pz2LgosjLybpkztoGQXzwuHPAgO",
    },
  })
    .then((res) => res.json())
    .then((resJson) => {
      allRoomData = resJson.items;

      if (hotelHome) {
        renderRoomList(); //渲染全部房間列表（index.html）
      } else if (roomPage) {
        getUrlId(); //抓取 url 上的 id
        getSpecifyRoomData(); //get 個別房間資料（room.html）
      }
    });
}

// 抓取 URL 上的 ID
function getUrlId() {
  const url = location.href;
  urlId = url.split("?id=")[1];
}

// GET 抓取個別房間資料（含房間詳細說明、房間預定資料）
function getSpecifyRoomData() {
  const specifyRoomAPI = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${urlId}`;
  fetch(specifyRoomAPI, {
    headers: {
      Authorization:
        "Bearer QHcLaqsSDAC5HS0fQ3wEiLKguA268w8f3Pz2LgosjLybpkztoGQXzwuHPAgO",
    },
  })
    .then((res) => res.json())
    .then((resJson) => {
      roomDes = resJson.room[0];
      roomBooking = resJson.booking;

      renderRoomPage();

      dates = roomBooking.map((item) => item.date);

      initializeCalendar(dates);
      renderRoomCover();
    });
}

//執行 init
init();
