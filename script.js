//Refrence display element
const display = document.getElementById('display');

//Track if we have performed a calculation

let justCalculated = false;

function isOperator(char) {
    return ['+','-','*','/'].includes(char);
}
function getLastChar() {
    return display.value.slice(-1);
}

function safeEval(expression) {
    try {
        let jsExpression = expression
        .replace(/x/g, '*')
        .replace(/÷/g, '/');

        if (!/^[0-9+\-*/.()]+$/.test(jsExpression)){
            throw new Error('Invalid characters in expression');
        }

        const result = Function ('"use strict"; return (' + jsExpression + ')')();

        if (!isFinite (result)){
            throw new Error('Invslid calculation reuslt');   
        }
        return result;

    } catch (error) {
        console.error('Calculation error:', error);
        return'Error';
    }
}

function appendToDisplay(value) {
    console.log('Button pressed:', value);
    let currentValue = display.value;
    if (justCalculated && !isNaN(value)){
        display.value = value;
        justCalculated = false;
        return;
    }

    if (justCalculated && isOperator (value)){
        display.value = currentValue + value;
        justCalculated = false;
        return;
    }
    //Handles operators

    if (isOperator(value)){
        //Dont allow operator as first char, (exception for minus)
        if (currentValue === '0' && value !== '-'){
            return; //Do nothing
        }

        //If the last charactor is already an operator, repla
        // ce it
        if (isOperator(getLastChar ())) {
            display.value = currentValue.slice(0,-1) + value;
        } else {
            display.value = currentValue + value;
        } // if current display shows zero and user enters a number we wanna replace the zero
        }else if (!isNaN(value)){ 
        if (currentValue === '0'){
            display.value = value;
        } else {
            display.value = currentValue + value;
        }

    //I the current display shows zero and the user enters decimal, keep the zero
    }else if (value === '.') {
        if (currentValue === '0'){;
        display.value = currentValue = value;
    }else {
        //Get the last number in the display after the last operator
        let parts = currentValue.split('/[+\-*/]');
        let lastNumber = parts[parts.length -1];
        //Only add decimal if number doesnt already have one

        if (lastNumber.includes('.')){
            display.value = currentValue + value;
        }
    }
    }else {
        display.value = currentValue + value;
    }
    // Reset the justCalculated flag when user strats typing
    justCalculated = false;
    console.log('Display updated to:', display.value);  
}

function clearDisplay() {
    console.log('Clear button pressed.');
    display.value = '0';
    justCalculated = false;

    display.style.backgroundColor = '#f0f0f0';
    setTimeout(() => {
        display.style.backgroundColor = '';
    }, 150);
}

function deleteLast() {
    console.log('Backspace button pressed');
    let currentValue = display.value;
    //If theres only one charector or is zero, reset to zero
    if (currentValue.length <= 1 || currentValue === '0') {
        display.value = '0';
    } else {
        display.value = currentValue.slice(0, -1);
    }
}

function calculate() {
    let expression = display.value;
    // dont calc if display is zero or empty
    if (expression === '0'|| expression === ''){
        return;
    }
    //Dont calc if expression ends with an operator

    if (isOperator(getLastChar())){
        return;
    }

    let result = safeEval(expression);
    if (result === 'Error') {
        display.value = 'Error';
        setTimeout(() => {
            clearDisplay()
        }, 2000);
    } else{
        if (Number.isInteger(result)) {
            display.value = result.toString();
        } else {
            display.value = parseFloat(result.toFixed(10)).toString();
        }

        justCalculated = true;
    }
    display.style.backgroundColor = '#e8f5e8';
    setTimeout(() => {
        display.style.backgroundColor = '';
    }, 300);
}
document.addEventListener('keydown', function(event){
    console.log('Key pressed', event.key);

    if(event.key>= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '.') {
        appendToDisplay('.');
    } else if (event.key === '+') {
        appendToDisplay('+');
    } else if (event.key === '-') {
        appendToDisplay ('-');
    } else if (event.key === '/') {
        appendToDisplay('/');
    } else if (event.key === '*') {
        appendToDisplay('*'); 
    }
    
    else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Escape' || event.key ==='c' || event.key ==='C') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        deleteLast();
    }
})

document.addEventListener('DOMContentLoaded', function() {
    console.log('Calculate loaded succefully');
    console.log('Display elemt', display);

    if (display) {
        console.log('Current display value:', display.value);
    } else{
        console.log('Display element not found');
    }
})