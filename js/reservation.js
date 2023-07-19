//點擊按鈕'Booking Now'，顯示預約畫面
const bookingButton = document.querySelector('.bookingButton');
const booking = document.querySelector('.booking');
const success = document.querySelector('.success');
const fail = document.querySelector('.fail');
const submit = document.querySelector('.submit')
const popUpCloseBtn = document.querySelectorAll('.close')
const popUpScreen = document.querySelectorAll('[data-popUpBtn]')

// console.log(popUpScreen)

//顯示彈跳視窗
function bookingPopUp(e){
  e.stopPropagation()
  // console.log(e.target.getAttribute('class'))

  let getClass = e.target.getAttribute('class');
  if(getClass.includes('bookingButton')) return booking.style.display='block';
  if(getClass.includes('submit')) {
    success.style.display='block';
    booking.style.display='none';
  }
  if(getClass.includes('fail')) {
    fail.style.display='block';
  }

}

//關閉彈跳視窗
function popUpClose(e){
  // console.log(e)
  e.stopPropagation()
  let closeNum =  e.target.dataset.close;
  // console.log(closeNum)
  // console.log(popUpScreen[closeNum])
  popUpScreen[closeNum].style.display='none'
  
}

popUpCloseBtn.forEach((item)=>{
  item.addEventListener('click',popUpClose)
  
})
bookingButton.addEventListener('click',bookingPopUp)
submit.addEventListener('click',bookingPopUp)



