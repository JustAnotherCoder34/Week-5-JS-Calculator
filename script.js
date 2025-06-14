//refrence display element
const display = document.getElementById('display');

//Track if we have performed a calculation

let justCalculated = false;

function appendToDisplay(value) {
    console.log('Button pressed:', value);
    alert('You pressed:' + value);   
}

function clearDisplay() {
    console.log('Clear button pressed');
    alert('Clear button was pressed');
}

function deleteLast() {
    console.log('Backspace button pressed');
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