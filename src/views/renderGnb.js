export const renderGnb = () => {
	console.log(hasLoginToken());
	if (hasLoginToken()) {
		renderLogout();
	} else {
		renderLogin();
	}
};

const deleteLoginToken = () => {
	localStorage.removeItem('token');
};

const hasLoginToken = () => {
	return Boolean(localStorage.getItem('token'));
};

const renderLogout = async() => {
	const navBar = document.querySelector('#navbar');

	const logout = createListTag('/', '로그아웃');
	const myPage = createListTag('/mypage', '마이페이지');

	logout.addEventListener('click', (e) => {
		e.preventDefault();

		deleteLoginToken();
		location.reload();
	});

	navBar.prepend(logout, myPage);
};

const renderLogin = () => {
	const navBar = document.querySelector('#navbar');
	
	const loc = location.href
	const encodeURI = encodeURIComponent(loc)
	const login = createListTag(
		`/login?beforeURI=${encodeURI}`,
		'로그인',
	);
	const signup = createListTag(`/signup?beforeURI=${encodeURI}`, '회원가입');

	navBar.prepend(login, signup);
};

function createListTag(href, text) {
	const liTag = document.createElement('li');
	const aTag = document.createElement('a');
	aTag.href = href;
	aTag.textContent = text;
	liTag.append(aTag);
	return liTag;
}
