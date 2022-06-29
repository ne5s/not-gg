import * as Api from '/api.js';
import { timeForToday } from '/useful-functions.js';

const duoFormsBox = document.getElementById("duoFormsBox")
addAllElements();

const duoDatas = await Api.get('/api/duo?page=0')
console.log(duoDatas)
makeDuo()

function makeDuo() {
    duoDatas.forEach(data => {
        const duoComment = data.DuoComment;
        const MainPosition = data.MainPosition;
        const myTier = data.MyTier;
        const searchPosition = data.SearchPosition
        const searchTier = data.SearchTier
        const summonerName = data.SummonerName
        const createdAt = data.createdAt

        let tierIcon = ''
        switch(MainPosition) {
            case 'TOP':
                tierIcon = '탑';
                break;
            case 'JUNGLE':
                tierIcon = '정글';
                break;
            case 'MIDDLE':
                tierIcon = '미드';
                break;
            case 'BOTTOM':
                tierIcon = '원딜';
                break;
            case 'UTILITY':
                tierIcon = '서폿';
                break;
        }

        let krPosition = ''
        switch(searchPosition) {
            case 'TOP':
                krPosition = '탑';
                break;
            case 'JUNGLE':
                krPosition = '정글';
                break;
            case 'MIDDLE':
                krPosition = '미드';
                break;
            case 'BOTTOM':
                krPosition = '원딜';
                break;
            case 'UTIL':
                krPosition = '서폿';
                break;
        }

        let krTier = ''
        switch(searchTier) {
            case 'IRON':
                krTier = '아이언';
                break;
            case 'BRONZE':
                krTier = '브론즈';
                break;
            case 'SILVER':
                krTier = '실버';
                break;
            case 'GOLD':
                krTier = '골드';
                break;
            case 'PLATINUM':
                krTier = '플래티넘';
                break;
            case 'DIAMOND':
                krTier = '다이아';
                break;
            case 'MASTER':
                krTier = '마스터';
                break;
            case 'GRANDMASTER':
                krTier = '그마';
                break;
            case 'CHALLENGER':
                krTier = '챌린저';
                break;
        }

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
                <li>
                    <div class="btn--delete">
                        <span class="material-icons">
                        clear
                        </span>
                    </div>
                </li>
            </ul>
        `
    })
}

async function addAllElements() {
	getDuoDatas();
}

async function getDuoDatas() {
    //듀오 폼 가져와서 
    //renderDuoForms으로 forEach
}

function renderDuoData(object) {
    //듀오 폼 하나하나 렌더링
    const DuoComment = duoDatas
}