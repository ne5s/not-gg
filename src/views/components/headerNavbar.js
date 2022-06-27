// import { getUserData, removeUser } from '../utils/user.js';
function navber() {
	// 유저 데이터 가져와서 렌더링 후 작업 필요
	//   render: () => {
	// const { name, role } = getUserData();
	const body = document.querySelector('body');

	const navbar = `<nav class="navbar navbar-expand-lg bg-color-VeryPeri">
<div class="container-fluid">
  <button
    class="navbar-toggler border-none"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation "
  >
    <img src="../img/toggler.png" width="36px" height="24px" />
  </button>
  <a class="navbar-brand text-white mb-2 mt-2 SLE-logo" href="/"
    >이상한<br />
    <span class="color-red">리그</span>의<br />
    엘리스</a
  >
  <ul class="navbar-nav mb-lg-0 control-display-mobile">
    <li class="nav-item login">
      <a href="/login" class="btn loginBtn color-VeryPeri bg-color-white btn-login">
        로그인
      </a>
    </li>
    
  </ul>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link active text-white" aria-current="page" href="#"
          >랭킹조회</a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link active text-white" aria-current="page" href="/duo"
          >듀오</a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link active text-white" aria-current="page" href="/scrim"
          >내전</a
        >
      </li>
    </ul>
  </div>

  <ul class="navbar-nav mb-2 mb-lg-0 control-display-web">
    <li class="nav-item login">
      <a href="/login" class="btn color-VeryPeri bg-color-white btn-login">
        로그인
      </a>
    </li>
    <li class="nav-item signup">
      <a href="/signup" class="btn color-VeryPeri bg-color-white btn-sign-up">
        회원가입
      </a>
    </li>
    
  </ul>
</div>
</nav>`;

	body.insertAdjacentHTML('afterbegin', navbar);
	// 로그아웃 버튼 구현
	// componentDidMount: () => {
	//   let logouts = document.getElementsByClassName('logout');
	//   Array.from(logouts).forEach((logout) => {
	//     logout.addEventListener('click', removeUser);
	//   });
	// },
}

navber();

// 검색 기능.
//  <form class="d-flex me-2 control-display-web" role="search">
//     <input
//       class="form-control me-2 control-input"
//       type="search"
//       placeholder=""
//       aria-label="Search"
//     />
//   </form>
