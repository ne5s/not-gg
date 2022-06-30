import * as Api from '/api.js';
import { timeForToday, makePositionKR, makeTierKR } from '/useful-functions.js';

const duoFormsBox = document.getElementById("duoFormsBox")
const duoSubmitBtn = document.getElementById("duoSubmitBtn")
const addRenderDuo = document.getElementById("addRenderDuo")

let duoDataNumber = 0
const duoDatas = await Api.get(`/api/duo?page=${duoDataNumber}`)

addAllElements();
addAllEvents();

function addAllEvents() {
    duoSubmitBtn.addEventListener('click', addHandleSubmit);
    duoFormsBox.addEventListener("click", btnClickEvent)
    addRenderDuo.addEventListener("click", addMakeDuo)
}

async function addAllElements() {
	makeDuo()
}

// 처음 렌더링
function makeDuo() {
    dataRender()
}

// 더보기 버튼 누르면 데이터 10개 추가
function addMakeDuo() {
    duoDataNumber++

    if(duoDatas.length > 10 && duoDatas === null) {
        addRenderDuo.classList.add("hide")
        return
    }

    dataRender()
}

// 듀오 등록하기
async function addHandleSubmit() {
    const myPosition = document.querySelector('input[name="myPosition"]:checked').id
    const SearchTier = document.getElementById("tierSelect").value
    const duoPosition = document.querySelector('input[name="duoPosition"]:checked').id
    const DuoComment = document.getElementById("duoComment").value

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

// 듀오 등록 취소버튼 클릭이벤트
async function btnClickEvent(e) {
    const btnDelete = e.target.closest('.btn--delete');

    if (btnDelete) {
        const targetId = btnDelete.name;
        const res = await Api.delete('/api/duo', '', {targetId});
        location.reload();
    }    
}

// 듀오등록 데이터 목록 렌더링
function dataRender() {
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