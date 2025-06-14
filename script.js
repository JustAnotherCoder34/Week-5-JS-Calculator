//refrence display element
const display = document.getElementById('display');

//Track if we have performed a calculation

let justCalculated = false;

function appendToDisplay(value) {
    console.log('Button pressed:', value);
    let currentValue = display.value;
    if (justCalculated && !isNaN(value)){
        display.value = value;
        justCalculated = false;
        return;
    }
    // if current display shows zero and user enters a number we wanna replace the zero

    if (currentValue === "0" && !isNaN(value)){
        display.value = value;
    //I the current display shows zero and the user enters decimal, keep the zero
    }else if (currentValue === '0' && value ==='.') {
        display.value = currentValue + value;
    } else {
        display.value = currentValue + value;
    }
    // Reset the justCalculated flag when user strats typing
    justCalculated = false;
  console.log('Display updated to:', display.value);  
}

function clearDisplay() {
    console.log('Clear button pressed');
    alert('Clear button was pressed');
}

function deleteLast() {
    console.log('Backspace button pressed');
    let currentValue = display.value;
    //If theres only one charector or is zero, reset to zero
    if (currentValue.length <= 1 || currentValue ==='0') {
        display.value = '0';
    } else {
        display.value = currentValue.slice(0, -1);
    }
    alert('Backspace button was pressed');
}

function calculate() {
    console.log('Equals button pressed');
    alert('Equals button was pressed');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Calculate loaded succefully');
    console.log('Display elemt', display);

    if (display) {
        console.log('Current display value:', display.value);
    } else{
        console.log('Display element not found');
    }
}
)