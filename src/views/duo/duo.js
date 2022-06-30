import * as Api from '/api.js';
import { timeForToday } from '/useful-functions.js';

const duoFormsBox = document.getElementById("duoFormsBox")
const duoSubmitBtn = document.getElementById("duoSubmitBtn")

const duoDatas = await Api.get('/api/duo?page=0')

addAllElements();
addAllEvents();

function addAllEvents() {
    duoSubmitBtn.addEventListener('click', addHandleSubmit);
}

async function addAllElements() {
	makeDuo()
}

async function addHandleSubmit() {
    const myPosition = document.querySelector('input[name="myPosition"]:checked').id
    const SearchTier = document.getElementById("tierSelect").value
    const duoPosition = document.querySelector('input[name="duoPosition"]:checked').id
    const DuoComment = document.getElementById("duoComment").value

    // let MainPosition = makePositionKR(myPosition.slice(10))
    // let SearchPosition = makePositionKR(duoPosition.slice(11))
    let MainPosition = myPosition.slice(10)
    let SearchPosition = duoPosition.slice(11)

    // 듀오등록 api 요청
    try {
        const data = { MainPosition, SearchTier, SearchPosition, DuoComment }
        console.log(data)
        await Api.post('/api/duo', data)
        console.log("등록성공")

        // window.location.href = '/duo';
    } catch (err) {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}

function makeDuo() {
    duoDatas.forEach(data => {
        const duoComment = data.DuoComment;
        const MainPosition = data.MainPosition;
        const myTier = data.MyTier;
        const searchPosition = data.SearchPosition
        const searchTier = data.SearchTier
        const summonerName = data.SummonerName
        const createdAt = data.createdAt
        const itemId = data._id

        let tierIcon = makePositionKR(MainPosition)
        let krPosition = makePositionKR(searchPosition)
        let krTier = makeTierKR(searchTier)
        let time = timeForToday(createdAt)

        duoFormsBox.innerHTML += `
            <ul class="duo-forms-item-box">
                <li>
                    <span class="components">${summonerName}</span>
                    <span>님이</span>
                    <span class="components">${krPosition} ${krTier}</span>
                    <span>를 찾고 있습니다</span>
                </li>
                <li>
                    <img src="../img/${tierIcon}.png" alt="">
                </li>
                <li>${myTier}</li>
                <li>
                    <span class="comment">${duoComment}</span>
                </li>
                <li>${time}</li>
                <li id="deleteItem">
                    <button class="btn--delete" name=${itemId}>
                        <span class="material-icons">
                        clear
                        </span>
                    </button>
                </li>
            </ul>
        `
    })
}


function makePositionKR(position) {
    const positionKR = {
        TOP : "탑",
        JUNGLE : "정글", 
        MIDDLE : "미드",
        BOTTOM : "원딜",
        UTIL : "서폿"
    }
    return positionKR[position]
}
function makeTierKR(tier) {
    const tierKR = {
        IRON : "아이언",
        BRONZE : "브론즈", 
        SILVER : "실버",
        GOLD : "골드",
        PLATINUM : "플래티넘",
        DIAMOND : "다이아",
        MASTER : "마스터",
        GRANDMASTER : "그마",
        CHALLENGER : "챌린저"
    }
    return tierKR[tier]
}