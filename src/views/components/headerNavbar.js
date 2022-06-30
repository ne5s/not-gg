import { getUserData, removeUser } from '/utils/user.js';
const navber = () => {
	const { summonerName, role } = getUserData();
	const body = document.querySelector('body');

	const navbar = `
    <nav class="navbar navbar-expand-lg bg-color-VeryPeri">
      <div class="container-fluid">
        <button
          class="navbar-toggler border-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation "
          style='margin-right:15%'
        >
          <img src="/img/toggler.png" width="36px" height="24px" />
        </button>
        <a class="navbar-brand text-white mb-2 mt-2 SLE-logo" href="/"
          >이상한<br />
          <span class="color-red">리그</span>의<br />
          엘리스</a
        >
        <ul class="navbar-nav mb-lg-0 control-display-mobile">
          
            ${
							summonerName && role === 'basic-user'
								? `
                <li class="nav-item">
                <a href="/pvplog/${summonerName}" class="btn-name">
            ${summonerName}님
            </a>`
								: `
                <li class="nav-item login">
                <a href="/login" class="btn loginBtn color-VeryPeri bg-color-white btn-login">
              로그인
            </a>`
						}
          </li>
          
        </ul>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active text-white" aria-current="page" href="/ranking"
                ><img src="/img/whitesparkle.png" alt=""> 랭킹</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link active text-white" aria-current="page" href="/duo"
                ><img src="/img/whitesparkle.png" alt=""> 듀오</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link active text-white" aria-current="page" href="/scrim"
                ><img src="/img/whitesparkle.png" alt=""> 내전</a
              >
            </li>
            <li class="nav-item signup control-display-mobile" style='margin: 10px;'>
            <a href="/" class="btn btn-logout logout">
              로그아웃
            </a>
          </li>
          </ul>
        </div>

        <ul class="navbar-nav mb-2 mb-lg-0 control-display-web">
          
          ${
						summonerName && role === 'basic-user'
							? `<li class="nav-item">
              <a href="/pvplog/${summonerName}" class="btn-name">
            ${summonerName}님
          </a>
          </li>
          <li class="nav-item signup">
          <a href="/" class="btn btn-logout logout">
            로그아웃
          </a>
        </li>
          `
							: `<li class="nav-item login">
              <a href="/login" class="btn loginBtn color-VeryPeri bg-color-white btn-login">
            로그인
          </a>
          `
					}
          

          
        </ul>
      </div>
      </nav>`;
	body.insertAdjacentHTML('afterbegin', navbar);
	let logouts = document.getElementsByClassName('logout');
	if (logouts) {
		Array.from(logouts).forEach((logout) => {
			logout.addEventListener('click', removeUser);
		});
	}
};

navber();
