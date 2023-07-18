// 把房間名稱資料整理並渲染進 roomList

function renderRoomList() {
  // const roomsName = allRoomData.map(({ id, name }) => ({ id, name }));

  let roomHtml = "";
  allRoomData.forEach((room) => {
    const roomValue = `
    <li class="hotelRoomItem" style="background-image: url('${room.imageUrl}');">
            <div class="hotelRoomMask">
              <p class="hotelRoomName">${room.name}</p>
            </div>
          </li>
    `;
    roomHtml += roomValue;
  });

  roomList.innerHTML = roomHtml;
}
