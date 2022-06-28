import * as Api from '/api.js';

addAllElements();

const duoForms = await Api.get()
console.log(duoForms)

async function addAllElements() {
	getDuoForms();
}

async function getDuoForms() {
    //듀오 폼 가져와서 
    //renderDuoForms으로 forEach
}

function renderDuoForms(object) {
    //듀오 폼 하나하나 렌더링
}