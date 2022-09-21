const screenOperations = document.querySelector(".operations");
const screenResult = document.querySelector(".result");
const numbers = document.querySelectorAll(".numbers-container .number");
const operators = document.querySelectorAll(".operators-container .btn");
const decimal = document.querySelector(".dec");
let operationsDisplay = '';
let operationSymbol = '';
let operationResult = 0;
let a = '';
let b = '';
numbers.forEach(number => {
    number.addEventListener("click", (e) => {
        if (screenOperations.textContent == "*" || screenOperations.textContent == "+" || screenOperations.textContent == "-" || screenOperations.textContent == "÷"){
            screenOperations.textContent = "Error";
            operationsDisplay = "";
            screenResult.style.fontSize = "25px";   /* Swap font-size to 45px in AC function!!!! */
            screenResult.textContent = "Press AC to restart the calculator";
        }else{
            if (operationSymbol == ""){
                a += e.target.textContent;
            }else if (operationSymbol != "") {
                b += e.target.textContent;
            }
            screenOperations.textContent = operationsDisplay + e.target.textContent;
            operationsDisplay += e.target.textContent;;
    } })}); 

operators.forEach(operator => {
    operator.addEventListener("click",(e) => {
        if (screenOperations.textContent[screenOperations.textContent.length -1] == "*" || screenOperations.textContent[screenOperations.textContent.length -1] == "+" || screenOperations.textContent[screenOperations.textContent.length -1] == "-" || screenOperations.textContent[screenOperations.textContent.length -1] == "÷" ){
            operationsDisplay = operationsDisplay.slice(0,operationsDisplay.length - 1);
            screenOperations.textContent = operationsDisplay + e.target.textContent;
            operationsDisplay += e.target.textContent;
            operationSymbol = operationSymbol.slice(0 , operationSymbol.length - 1);
            operationSymbol += e.target.textContent;
        }else {
            screenOperations.textContent = operationsDisplay + e.target.textContent;
            operationsDisplay += e.target.textContent;
            operationSymbol += e.target.textContent;
            if (a != "" && b != "" && operationSymbol.length == 2) {                                         
                let result = operate(operationSymbol[0],parseFloat(a),parseFloat(b))
                result = Math.round(result * 100) / 100;
                operationResult = result;
                operationSymbol = operationSymbol.slice(-1);
                a = String(result);
                b = "";
            } 
        }
}) });

decimal.addEventListener("click", (e) =>{
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
})







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

