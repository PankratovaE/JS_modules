import { formatError } from "./common.js";
import { diffDates, diffToHTML } from "./diffdates.js";

const dateCalcForm = document.getElementById('datecalc');
const dateCalcResult = document.getElementById('datecalc__result');

dateCalcForm.addEventListener("submit", handleCalcDates);

function handleCalcDates(event) {
    dateCalcResult.innerHTML = '';
    event.preventDefault();

    let {firstDate, secondDate} = event.target.elements;
    firstDate = firstDate.value, secondDate = secondDate.value;

    if(firstDate && secondDate) 
        dateCalcResult.innerHTML = diffToHTML(diffDates(firstDate, secondDate))
    else dateCalcResult.innerHTML = formatError('Необходимо заполнить оба поля');
}