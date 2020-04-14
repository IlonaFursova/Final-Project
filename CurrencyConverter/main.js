let body = document.getElementsByTagName('body')[0];
body.onload = onCreate;


/*
 * Объект перечисления валют и их названия
 * От этого зависит выпадающий список
 */
let objNames = { 
    "UAH" : "Украинская гривна", 
    "USD" : "Доллар США", 
    "EUR" : "Евро", 
    "TRY" : "Турецкая лира", 
    "JPY" : "Японская йена",
    "RUB" : "Русские рубли"
};

/**
 * Объект с множителями всех валют
 * От этого зависит умножение значений 
 */
const objCurrencys = {
    "UAH_to_USD" : 0.04,
    "UAH_to_EUR" : 0.034,
    "UAH_to_TRY" : 0.25,
    "UAH_to_JPY" : 4.02,

    "USD_to_UAH" : 27.23,
    "USD_to_EUR" : 0.92,
    "USD_to_TRY" : 6.77,
    "USD_to_JPY" : 108.83,

    "EUR_to_USD" : 1.09,
    "EUR_to_UAH" : 29.54,
    "EUR_to_TRY" : 7.39,
    "EUR_to_JPY" : 118.64,

    "TRY_to_USD" : 0.15,
    "TRY_to_EUR" : 0.14,
    "TRY_to_UAH" : 4.01,
    "TRY_to_JPY" : 16.08,

    "JPY_to_USD" : 0.0092,
    "JPY_to_EUR" : 0.0084,
    "JPY_to_TRY" : 0.062,
    "JPY_to_UAH" : 0.25,

};

let form = document.getElementById('conv');
let inputCurrency = document.createElement("input"); 
inputCurrency.setAttribute('type',"number");
let selectFrom = document.createElement("select"); 

let newStroke = document.createElement('h4');
newStroke.innerText = "\n";
newStroke.onselectstart = function(){ return false; };

let outputCurrency = document.createElement("input"); 
outputCurrency.setAttribute('type', "number");

let selectTo = document.createElement("select"); 

let keys =  Object.keys(objNames);
let arrlength = keys.length;

for (let i = 0; i < arrlength; i++) {
    let optionFrom = document.createElement('option');
    let currentKey = keys[i];

    optionFrom.value = currentKey;
    optionFrom.text = objNames[currentKey] + " " + "(" + currentKey + ")";
    
    let optionTo = document.createElement('option');
    optionTo.value =  currentKey;
    optionTo.text =  objNames[currentKey] + " " + "(" + currentKey + ")";;
    
    selectFrom.appendChild(optionFrom);
    selectTo.appendChild(optionTo);
}
selectFrom.selectedIndex = Math.random() * arrlength;
selectTo.selectedIndex = Math.random() * arrlength;

inputCurrency.oninput = recalculateCurrency;
outputCurrency.oninput = recalculateCurrency;


  
    /***
     * Ф-ия обработки страницы после её создания (создания body)
     */
function onCreate() {
    form.appendChild(newStroke);
    form.appendChild(inputCurrency);
    form.appendChild(selectFrom);
    form.appendChild(newStroke);
    form.appendChild(outputCurrency);
    form.appendChild(selectTo);
}


/**
 * Возвращает множитель в зависимости от выбраных валют
 * В случае, когда выбранные валюты совпадают возвращает  1
 * Выбрасывает ошибку, если не находит множитель в объекте : objCurrencys
 */
function getfactor() {
    let from = selectFrom.selectedOptions[0].value;
    let to = selectTo.selectedOptions[0].value;

    if(from === to){
        return 1;
    }

    let key = from + "_to_" + to;
    if (!objCurrencys[key]) {
        throw new Error("Add "+ key +" to Object!")

    }
    return objCurrencys[key]
}

/**
 * Переписывает значение поля вывода в зависимости от выбраных валют(уже сконвертированое значение)
 */
function recalculateCurrency(){
    outputCurrency.value = inputCurrency.value * getfactor();
}

