// 요소(element), input 혹은 상수
const cards = document.getElementsByClassName('card')

addAllElements();
addAllEvents();

async function addAllElements() {
}

function addAllEvents() {
  cards[1].addEventListener('mouseover', cardMouseover1)
  cards[1].addEventListener('mouseout', cardMouseout1)
  cards[2].addEventListener('mouseover', cardMouseover2)
  cards[2].addEventListener('mouseout', cardMouseout2)
}

function cardMouseover1(e) {
  cards[0].classList.remove('spread')
  cards[1].classList.add('spread')
}
function cardMouseout1(e) {
  cards[0].classList.add('spread')
  cards[1].classList.remove('spread')
}
function cardMouseover2(e) {
  cards[0].classList.remove('spread')
  cards[2].classList.add('spread')
}
function cardMouseout2(e) {
  cards[0].classList.add('spread')
  cards[2].classList.remove('spread')
}