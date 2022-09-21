const screenOperations = document.querySelector(".operations");
const screenResult = document.querySelector(".result");
const numbers = document.querySelectorAll(".numbers-container .number");
const operators = document.querySelectorAll(".operators-container .btn");
const decimal = document.querySelector(".dec");
const equality = document.querySelector(".equality");
let operationsDisplay = '';
let operationSymbol = '';
let operationResult = 0;
let operateCounter = 0;
let a = '';
let b = '';
numbers.forEach(number => {
    number.addEventListener("click", (e) => {
        if (screenOperations.textContent == "*" || screenOperations.textContent == "+" || screenOperations.textContent == "-" || screenOperations.textContent == "÷"){
            if (screenResult.textContent != "") {
                screenResult.textContent = "";
            }
            screenOperations.textContent = "";
            operationsDisplay = "";
            operationSymbol = "";   
            screenResult.textContent = "Error";
        }else{
            if (screenResult.textContent != "") {
                screenResult.textContent = "";
            }
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
        if (screenResult.textContent != "") {
            screenResult.textContent = "";
        }

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
            if (a != "" && b != "" ) {                                         
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
    }else if (a == ""){
        screenResult.textContent = "Error";
    }
})
equality.addEventListener("click", () => {
    if (a != "" && b != "") {                                         
        let result = operate(operationSymbol,parseFloat(a),parseFloat(b))
        result = Math.round(result * 100) / 100;
        operationResult = result;
        operationSymbol = operationSymbol.slice(-1);
        a = String(result);
        b = "";
        screenResult.textContent = String(operationResult);
        operationSymbol = "";
    }else if (operationsDisplay != "" && operateCounter != 0 && b != "0" && operationSymbol != "÷" ){  /* Fix division by 0 error not showing up on screen */
        screenResult.textContent = String(operationResult);
    }else if (a == "" || operateCounter == 0){
        screenResult.textContent = "Error";
    }
    }
);






function add(a,b) {
    return a+b;
}

function mul(a,b) {
    return a*b;
}

function sub(a,b) {
    return a-b;
}

function div(a,b) {     /* Fix division by 0 error not showing up on screen */
    if (b == 0){
        screenResult.textContent = "Division by zero is a crime against maths";
        return "";
    }
    return a/b;
}

function operate(operator,a,b) {
    operateCounter++;
    if (b == ""){
        screenResult.textContent = "Error";
        return "";
    }
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

