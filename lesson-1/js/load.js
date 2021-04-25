// function loadScript(url, callback) {
//     const element = document.createElement("script");

//     element.type = "text/javascript";
//     element.src = url;
//     element.onload = callback;

//     document.body.appendChild(element);
// }
/*В качестве эксперимента доработайте нашу функцию loadScript
Её аргументы:
Первый аргумент: коллбек или строка с url до файла или массив с url до файлов зависимостей;
Второй аргумент: необязательный коллбек (только если первый аргумент строка или массив)
Её задачи:
обнаруживать повторно запрашиваемые зависимости и не загружать их: ситуация, когда модуль А зависит от В, и С зависит от В.
Подумайте, как реализовать вызов callback модуля А после того, как разрешатся все зависимости модуля В, и отработает его callback. 
 */
// let loadedDepend = new Set();

// function loadScript(arg1, callback) {
    
//     const element = document.createElement("script");
//     element.type = "text/javascript";

//     switch (typeof arg1) {
//         case 'function':
//             arg1();
//             break;
//         case 'string':
//             if (!loadedDepend.has(arg1)) {
//                 element.src = arg1;
//                 element.onload = callback;
//                 loadedDepend.add(arg1);
//             }
//             break;
//         case 'object':
//             for (let url of arg1) {
//                 loadScript(url, callback);
//             }
//             return;
//     }
            
//     document.body.appendChild(element);
// }

function loadScript(urls, callback) {
    if(typeof urls === "function") return urls();
    if(typeof urls === "string") urls = [urls];
  
    const existedScripts = Array.from(document.getElementsByTagName('script'), elem => elem.src);
    const promises = [];
  
    if (!Array.isArray(urls))
      throw new TypeError();
    
    urls.forEach(url => {
      if (existedScripts.includes(url)) return;
      
      const element = document.createElement("script");
      element.type = "text/javascript";
      element.src = url;
      promises.push(new Promise(resolve => {
        element.onload = resolve;
      }));
      
      document.body.appendChild(element);
    });
  
    Promise.all(promises).then(callback);
  }