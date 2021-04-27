import { timerForm, curTime, endTime } from "./timer.js";
import { formatMessage } from "./common.js";
import {Howl} from 'howler';
import { DateTime } from "luxon";


export function timeRemaining(hours, minutes, seconds) {

    let userdt = DateTime.fromObject({hour: hours, minute: minutes, second: seconds})
 
    let timeInterval = setInterval(function () {
        userdt = userdt.minus({ seconds: 1});
        if (userdt.hour == 0 && userdt.minute == 0 && userdt.second == 0) { //если получился 0, то выводим сообщение, выходим из функции
            endTime.innerHTML = formatMessage('Отсчет времени окончен');
            let sound = new Howl({
                src: ['./sound.mp3']
              });
              
              sound.play();
            clearInterval(timeInterval);
            curTime.innerHTML = timeintervalToHTML({hour: 0, minute: 0, second: 0});
            return;
        }
        
        return curTime.innerHTML = timeintervalToHTML(userdt); //если не 0, то вызываем функцию для вывода оставшегося
    }, 1000);                            // времени на страницу
    
    
    timerForm.addEventListener('reset', function() { 
        clearInterval(timeInterval)  });

}
export function timeintervalToHTML(time) {
   
    return `
    Часов: <strong> ${ time.hour } </strong>, 
    Минут: <strong> ${ time.minute } </strong>, 
    Секунд: <strong> ${ time.second }  </strong> 
    `;
}




