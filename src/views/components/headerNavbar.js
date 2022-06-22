// import { getUserData, removeUser } from '../utils/user.js';
function navber() {
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
  <a class="navbar-brand text-white mb-2 mt-2 SLE-logo" href="#"
    >이상한<br />
    <span class="color-red">리그</span>의<br />
    엘리스</a
  >
  <form class="d-flex me-2 control-display-mobile" role="search">
    <input
      class="form-control me-2 control-input"
      type="search"
      placeholder=""
      aria-label="Search"
    />
  </form>
  <ul class="navbar-nav mb-2 mb-lg-0 control-display-mobile">
    <!-- <li class="nav-item">
      <a
        class="nav-link active text-white login"
        aria-current="page"
        href="#"
        >로그인</a
      >
    </li> -->
    <li class="nav-item login">
      <button class="btn color-VeryPeri bg-color-white btn-sign-up">
        로그인
      </button>
    </li>
  </ul>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle text-white"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          >랭킹조회</a
        >
        <ul
          class="dropdown-menu bg-color-VeryPeri"
          aria-labelledby="navbarDropdown"
        >
          <li>
            <a class="dropdown-item text-white" href="#">티어별랭킹</a>
          </li>
          <li>
            <a class="dropdown-item text-white" href="#">엘리스랭킹</a>
          </li>
          <li>
            <a class="dropdown-item text-white" href="#">플레이타임</a>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <a class="nav-link active text-white" aria-current="page" href="#"
          >듀오</a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link active text-white" aria-current="page" href="#"
          >내전</a
        >
      </li>
    </ul>
  </div>
  <form class="d-flex me-2 control-display-web" role="search">
    <input
      class="form-control me-2 control-input"
      type="search"
      placeholder=""
      aria-label="Search"
    />
  </form>
  <ul class="navbar-nav mb-2 mb-lg-0 control-display-web">
    <!-- <li class="nav-item">
      <a
        class="nav-link active text-white login"
        aria-current="page"
        href="#"
        >로그인</a
      >
    </li> -->
    <li class="nav-item login">
      <button class="btn color-VeryPeri bg-color-white btn-sign-up">
        로그인
      </button>
    </li>
  </ul>
</div>
</nav>`;

	body.insertAdjacentHTML('afterbegin', navbar);
}

navber();
