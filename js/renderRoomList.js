// 把所有房間資料渲染進 roomList

function renderRoomList() {
  let roomHtml = "";
  allRoomData.forEach((room) => {
    const roomValue = `
    <li class="hotelRoomItem" style="background-image: url('${room.imageUrl}');">
      <a href="./room.html?id=${room.id}" class="hotelRoomName" >${room.name}</a>
    </li>
    `;
    roomHtml += roomValue;
  });

  roomList.innerHTML = roomHtml;
}
