const screenOperations = document.querySelector(".operations");
const screenResult = document.querySelector(".result");
const numbers = document.querySelectorAll(".numbers-container .number");
const operators = document.querySelectorAll(".operators-container .btn");
const decimal = document.querySelector(".dec");
const equality = document.querySelector(".equality");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace")
let operationsDisplay = '';
let operationSymbol = '';
let operationResult = 0;
let operateCounter = 0;
let a = '';
let b = '';
let lastOperation = ['','',''];
let backspaceCounter = 0;

numbers.forEach(number => {
    number.addEventListener("click", addNumber)
}); 

function addNumber(e) {
    if (screenOperations.textContent == "*" || screenOperations.textContent == "+" || screenOperations.textContent == "-" || screenOperations.textContent == "÷"){
        if (screenResult.textContent != "") {
            screenResult.textContent = "";
        }
        screenOperations.textContent = "";
        operationsDisplay = "";
        operationSymbol = "";   
        screenResult.textContent = "Error";
    }else{
        backspaceCounter = 0;
        if (screenResult.textContent != "") {
            screenResult.textContent = "";
        }
        if (operationSymbol == ""){
            a += e.target.textContent;
            lastOperation[0] += e.target.textContent;
        }else if (operationSymbol != "") {
            b += e.target.textContent;
            lastOperation[2] += e.target.textContent;
        }
        screenOperations.textContent = operationsDisplay + e.target.textContent;
        operationsDisplay += e.target.textContent;;
    }
}

operators.forEach(operator => {
    operator.addEventListener("click",addOperator) 
});

function addOperator(e) {
    if (screenResult.textContent != "") screenResult.textContent = "";
    if (screenOperations.textContent[screenOperations.textContent.length -1] == "*" || screenOperations.textContent[screenOperations.textContent.length -1] == "+" || screenOperations.textContent[screenOperations.textContent.length -1] == "-" || screenOperations.textContent[screenOperations.textContent.length -1] == "÷" ){
        operationsDisplay = operationsDisplay.slice(0,operationsDisplay.length - 1);
        screenOperations.textContent = operationsDisplay + e.target.textContent;
        operationsDisplay += e.target.textContent;
        operationSymbol = operationSymbol.slice(0 , operationSymbol.length - 1);
        lastOperation[1] = lastOperation[1].slice(0, lastOperation[1].length -1 );
        operationSymbol += e.target.textContent;
        lastOperation[1] += e.target.textContent;
    }else {
        backspaceCounter = 0;
        screenOperations.textContent = operationsDisplay + e.target.textContent;
        operationsDisplay += e.target.textContent;
        operationSymbol += e.target.textContent;
        lastOperation[1] += e.target.textContent;
        if (a != "" && b != "" ) {   
            if (b != "0"){                                      
                let result = operate(operationSymbol[0],parseFloat(a),parseFloat(b))
                result = Math.round(result * 100) / 100;
                operationResult = result;
                lastOperation[0] = a;
                lastOperation[1] = operationSymbol[0];
                lastOperation[2] = b;
                a = String(result);
                b = "";
                operationSymbol = operationSymbol.slice(-1);
            }else {
                alert("Division by zero is undefinedg");
                b = "";
                operationsDisplay = operationsDisplay.slice(0,operationsDisplay.length - 1);
                screenOperations.textContent = operationsDisplay;
            }
        }
    }
}

decimal.addEventListener("click", addDecimal);

function addDecimal(e){
    backspaceCounter = 0;
    if (operationSymbol == ""){
        if (!a.includes(".")) {
            a += e.target.textContent;
            screenOperations.textContent = operationsDisplay + e.target.textContent;
            operationsDisplay += e.target.textContent;
        }
    }else if (operationSymbol != "") {
       if (!b.includes(".")) {
        b += e.target.textContent;
        screenOperations.textContent = operationsDisplay + e.target.textContent;
        operationsDisplay += e.target.textContent;
        }
    }
}

equality.addEventListener("click", getResult);

function getResult() {
    if (screenOperations.textContent[screenOperations.textContent.length -1] == "*" || screenOperations.textContent[screenOperations.textContent.length -1] == "+" || screenOperations.textContent[screenOperations.textContent.length -1] == "-" || screenOperations.textContent[screenOperations.textContent.length -1] == "÷" ){
        screenResult.textContent = "Malformed expression";
        return;
    }else if (a != "" && b != "") {   
        backspaceCounter = 0;
        if (b != "0"){                                      
            let result = operate(operationSymbol,parseFloat(a),parseFloat(b))
            result = Math.round(result * 100) / 100;
            operationResult = result;
            lastOperation[0] = a;
            lastOperation[1] = operationSymbol;
            lastOperation[2] = b;
            operationSymbol = operationSymbol.slice(-1);
            a = String(result);
            b = "";
            screenResult.textContent = String(operationResult);
            operationSymbol = "";
        }else {
            alert("Division by zero is undefined");
            b = "";
            operationsDisplay = operationsDisplay.slice(0,operationsDisplay.length - 1);
            screenOperations.textContent = operationsDisplay;
        }
    }else if (a == "" || operateCounter == 0){
        screenResult.textContent = "Error";
    }else if (operationsDisplay != "" ){  
        screenResult.textContent = String(operationResult);
    }
}

clear.addEventListener("click", reset);

function reset(){
    operationsDisplay = '';
     screenResult.textContent = "";
     screenOperations.textContent = "";
     operationSymbol = '';
     operationResult = 0;
     previousOperationResult = 0;
     operateCounter = 0;
     a = '';
     b = '';
}

backspace.addEventListener("click", undo);

function undo() {
    backspaceCounter++ ;
    if (backspaceCounter <= 2){
        a = lastOperation[0];
        operationSymbol = lastOperation[1];
        b = lastOperation[2];
        if (screenResult.textContent != "" && operateCounter == 1){
            screenResult.textContent = "";
            operateCounter--;
            operationResult = 0;
        }else if (screenResult.textContent != "" && operateCounter > 1){
            screenResult.textContent = "";
            operateCounter--;
            operationResult = Number(lastOperation[0]);
        }else if ((screenOperations.textContent[screenOperations.textContent.length -1] == "*" || screenOperations.textContent[screenOperations.textContent.length -1] == "+" || screenOperations.textContent[screenOperations.textContent.length -1] == "-" || screenOperations.textContent[screenOperations.textContent.length -1] == "÷") && b!="" && operateCounter == 1){
            operateCounter--;
            operationResult = 0;
            screenOperations.textContent = screenOperations.textContent.slice(0,screenOperations.textContent.length - 1);
            operationsDisplay = operationsDisplay.slice(0,operationsDisplay.length - 1);
        }else if ((screenOperations.textContent[screenOperations.textContent.length -1] == "*" || screenOperations.textContent[screenOperations.textContent.length -1] == "+" || screenOperations.textContent[screenOperations.textContent.length -1] == "-" || screenOperations.textContent[screenOperations.textContent.length -1] == "÷") && b!="" && operateCounter > 1){
            operateCounter--;
            operationResult = Number(lastOperation[0]);
            screenOperations.textContent = screenOperations.textContent.slice(0,screenOperations.textContent.length - 1);
            operationsDisplay = operationsDisplay.slice(0,operationsDisplay.length - 1);
        }else if ((screenOperations.textContent[screenOperations.textContent.length -1] != "*" || screenOperations.textContent[screenOperations.textContent.length -1] != "+" || screenOperations.textContent[screenOperations.textContent.length -1] != "-" || screenOperations.textContent[screenOperations.textContent.length -1] != "÷") && b != ""){
            lastOperation[2] = lastOperation[2].slice(0,lastOperation[2].length - 1);
            b = lastOperation[2];
            screenOperations.textContent = screenOperations.textContent.slice(0,screenOperations.textContent.length - 1);
            operationsDisplay = operationsDisplay.slice(0,operationsDisplay.length - 1);
        }else if ((screenOperations.textContent[screenOperations.textContent.length -1] == "*" || screenOperations.textContent[screenOperations.textContent.length -1] == "+" || screenOperations.textContent[screenOperations.textContent.length -1] == "-" || screenOperations.textContent[screenOperations.textContent.length -1] == "÷") && b == "" && operateCounter == 0){
            lastOperation[1] = lastOperation[1].slice(0, lastOperation[1].length - 1);
            operationSymbol = lastOperation[1];
            screenOperations.textContent = screenOperations.textContent.slice(0,screenOperations.textContent.length - 1);
            operationsDisplay = operationsDisplay.slice(0,operationsDisplay.length - 1);
        }else if ((screenOperations.textContent[screenOperations.textContent.length -1] != "*" || screenOperations.textContent[screenOperations.textContent.length -1] != "+" || screenOperations.textContent[screenOperations.textContent.length -1] != "-" || screenOperations.textContent[screenOperations.textContent.length -1] != "÷") && b == "" && operateCounter == 0 ){
            lastOperation[0] = lastOperation[0].slice(0, lastOperation[0].length - 1);
            a = lastOperation[0];
            screenOperations.textContent = screenOperations.textContent.slice(0,screenOperations.textContent.length - 1);
            operationsDisplay = operationsDisplay.slice(0,operationsDisplay.length - 1);
        }
    }else return;
}

function operate(operator,a,b) {
    operateCounter++;
    let result = ""
    switch (operator){
        case "÷":
            result = div(a,b);
            break;
        case "*":
            result = mul(a,b);
            break;
        case "-":
            result = sub(a,b);
            break;
        case "+":
            result = add(a,b);
            break;
    }
    return result;
}

function add(a,b) {
    return a+b;
}

function mul(a,b) {
    return a*b;
}

function sub(a,b) {
    return a-b;
}

function div(a,b) {    
    return a/b;
}

window.addEventListener("keydown", (e) => {
    for (let i=0 ; i<10 ; i++) {
        if (e.key == `${i}`){
            addNumberKeyboard(e);
            break;
        }
    }

    switch(e.key){
        case "Escape":
            reset();
            break;
        case "Backspace":
            undo();
            break;
        case "Enter":
            getResult();
            break;
        case ".":
            addDecimalKeyboard(e);
            break;
        case "+":
            addOperatorKeyboard(e);
            break;
        case "-":
            addOperatorKeyboard(e);
            break;
        case "*":
            addOperatorKeyboard(e);
            break;
        case "÷":
            addOperatorKeyboard(e);
            break;
    }
})


function addNumberKeyboard(e) {
    if (screenOperations.textContent == "*" || screenOperations.textContent == "+" || screenOperations.textContent == "-" || screenOperations.textContent == "÷"){
        if (screenResult.textContent != "") {
            screenResult.textContent = "";
        }
        screenOperations.textContent = "";
        operationsDisplay = "";
        operationSymbol = "";   
        screenResult.textContent = "Error";
    }else{
        backspaceCounter = 0;
        if (screenResult.textContent != "") {
            screenResult.textContent = "";
        }
        if (operationSymbol == ""){
            a += e.key;
            lastOperation[0] += e.key;
        }else if (operationSymbol != "") {
            b += e.key;
            lastOperation[2] += e.key;
        }
        screenOperations.textContent = operationsDisplay + e.key;
        operationsDisplay += e.key;
    }
}

function addOperatorKeyboard(e) {
    if (screenResult.textContent != "") screenResult.textContent = "";
    if (screenOperations.textContent[screenOperations.textContent.length -1] == "*" || screenOperations.textContent[screenOperations.textContent.length -1] == "+" || screenOperations.textContent[screenOperations.textContent.length -1] == "-" || screenOperations.textContent[screenOperations.textContent.length -1] == "÷" ){
        operationsDisplay = operationsDisplay.slice(0,operationsDisplay.length - 1);
        screenOperations.textContent = operationsDisplay + e.key;
        operationsDisplay += e.key;
        operationSymbol = operationSymbol.slice(0 , operationSymbol.length - 1);
        lastOperation[1] = lastOperation[1].slice(0, lastOperation[1].length -1 );
        operationSymbol += e.key;
        lastOperation[1] += e.key;
    }else {
        backspaceCounter = 0;
        screenOperations.textContent = operationsDisplay + e.key;
        operationsDisplay += e.key;
        operationSymbol += e.key;
        lastOperation[1] += e.key;
        if (a != "" && b != "" ) {   
            if (b != "0"){                                      
                let result = operate(operationSymbol[0],parseFloat(a),parseFloat(b))
                result = Math.round(result * 100) / 100;
                operationResult = result;
                lastOperation[0] = a;
                lastOperation[1] = operationSymbol[0];
                lastOperation[2] = b;
                a = String(result);
                b = "";
                operationSymbol = operationSymbol.slice(-1);
            }else {
                alert("Division by zero is undefinedg");
                b = "";
                operationsDisplay = operationsDisplay.slice(0,operationsDisplay.length - 1);
                screenOperations.textContent = operationsDisplay;
            }
        }
    }
}

function addDecimalKeyboard(e){
    backspaceCounter = 0;
    if (operationSymbol == ""){
        if (!a.includes(".")) {
            a += e.key;
            screenOperations.textContent = operationsDisplay + e.key;
            operationsDisplay += e.key;
        }
    }else if (operationSymbol != "") {
       if (!b.includes(".")) {
        b += e.key;
        screenOperations.textContent = operationsDisplay + e.key;
        operationsDisplay += e.key;
        }
    }
}