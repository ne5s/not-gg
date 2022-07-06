import * as Api from '/api.js';

// 요소(element), input 혹은 상수
const idInput = document.querySelector('#idInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const fullNameInput = document.querySelector('#fullNameInput');
const submitButton = document.querySelector('#submitButton');
const summonerInput = document.querySelector('#summonerInput');

const failidMessage = document.querySelector('.failid-message');
const failpassMessage = document.querySelector('.failpass-message');
const failpassconfirmMessage = document.querySelector('.failpassconfirm-message');
const failnameMessage = document.querySelector('.failname-message');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
}

// 두 값이 일치하는지 확인하는 Match 함수 작성
function Match(password1, password2) {
	return password1 === password2;
}

// 유효성 검사
idInput.onkeyup = function () {
	const id = idInput.value;
	id.length >= 4 ? failidMessage.classList.add('hide') : failidMessage.classList.remove('hide');
};

passwordInput.onkeyup = function () {
	const pass = passwordInput.value;
	pass.length >= 4 ? failpassMessage.classList.add('hide') : failpassMessage.classList.remove('hide');
};

passwordConfirmInput.onkeyup = function () {
  const pass = passwordInput.value;
	const passConfirm = passwordConfirmInput.value;
	Match(pass, passConfirm) ? failpassconfirmMessage.classList.add('hide') : failpassconfirmMessage.classList.remove('hide');
};

fullNameInput.onkeyup = function () {
  const name = fullNameInput.value;
  name.length >= 2 ? failnameMessage.classList.add('hide') : failnameMessage.classList.remove('hide');
};

// 회원가입 진행
async function handleSubmit(e) {
  e.preventDefault();

  const id = idInput.value;
  const summonerName = summonerInput.value;
  const fullName = fullNameInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;

  // 잘 입력했는지 확인
  const isIdValid = id.length >= 4;
  const isFullNameValid = fullName.length >= 2;
  const isPasswordValid = password.length >= 4;

  if (!isIdValid || !isFullNameValid || !isPasswordValid) {
    return alert('이름은 2글자 이상, 아이디/비밀번호는 4글자 이상이어야 합니다.');
  }

  if (!Match(password, passwordConfirm)) {
    return alert('비밀번호가 일치하지 않습니다.');
  }

  // 회원가입 api 요청
  try {
    const data = { name: fullName, id, password, summonerName };

    await Api.post('/api/register', data);

    alert(`정상적으로 회원가입되었습니다.`);

    const result = await Api.post('/api/login', {id, password})
    const token = result.token;

    localStorage.setItem('token', token);

    // 홈페이지 이동
    window.location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

