import { formatError } from "./common.js";
import { timeRemaining, timeintervalToHTML } from "./timeremaining.js";


export const timerForm = document.getElementById('timer');
export const endTime = document.getElementById('endtime');
export const curTime = document.getElementById('currenttime');


timerForm.addEventListener('submit', handleTimer);


function handleTimer(event) {
    curTime.innerHTML = '';
    endTime.innerHTML = '';
    event.preventDefault();

    let { hours, minutes, seconds } = event.target.elements;
    
    hours = +hours.value, minutes = +minutes.value, seconds = +seconds.value;
    //если не ввели ни одного значения, выводим ошибку
    if (!hours && !minutes && !seconds) {
        endTime.innerHTML = formatError('Необходимо ввести хотя бы одно значение');
        return;
    }
     //если хоть 1 секунда есть, вызываем функцию для обратного отсчета
    curTime.innerHTML = timeintervalToHTML({hour: hours, minute: minutes, second: seconds});
    timeRemaining(hours, minutes, seconds);
   
}





