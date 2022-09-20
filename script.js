const operations = document.querySelector(".operations");
const result = document.querySelector(".result");
const numbers = document.querySelectorAll(".numbers-container .number");
const operators = document.querySelectorAll(".operators-container .btn");
let operationsDisplay = '';
let number = '';
let operator = '';
numbers.forEach(number => {
    number.addEventListener("click", (e) => {
        if (operations.textContent == "*" || operations.textContent == "+" || operations.textContent == "-" || operations.textContent == "÷"){
            operations.textContent = "Error";
            operationsDisplay = "";
            result.style.fontSize = "25px";
            result.textContent = "Press AC to restart the calculator";
        }else{
        operations.textContent = operationsDisplay + e.target.textContent;
        operationsDisplay += e.target.textContent;
        };
    } )}); 

operators.forEach(operator => {
    operator.addEventListener("click",(e) => {
        if (operations.textContent[operations.textContent.length -1] == "*" || operations.textContent[operations.textContent.length -1] == "+" || operations.textContent[operations.textContent.length -1] == "-" || operations.textContent[operations.textContent.length -1] == "÷" ){
            operationsDisplay = operationsDisplay.slice(0,operationsDisplay.length - 1);
            operations.textContent = operationsDisplay + e.target.textContent;
            operationsDisplay += e.target.textContent;
        }else {
            operations.textContent = operationsDisplay + e.target.textContent;
            operationsDisplay += e.target.textContent;
        }
}) });







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

function operate(operator,a,b) {
    switch (operator){
        case "÷":
            div(a,b);
            break;
        case "*":
            mul(a,b);
            break;
        case "-":
            sub(a,b);
            break;
        case "+":
            add(a,b);
            break;
    }
}

