const toggle = document.querySelector(".toggle__input");
const screenOutput = document.querySelector(".screen__output");
const previousScreenOutput = document.querySelector(".screen__previous__output");
const body = document.getElementsByTagName('body');
const numbers = document.querySelectorAll('.key__number');
const operators = document.querySelectorAll('.key__operator');
const equals = document.getElementById('key__equals');
const delete_key = document.getElementById('key__delete');
const reset = document.getElementById('key__reset');

let themeMode = localStorage.getItem('theme');

const themesArray = ["blue__theme", "white__theme", "purple__theme"];

let operatorCheck = false;
let equalsCheck = false;
let numberInput;
let operatorInput = '';
let previousInput = '';
let currentValue;
let equalsValue;
screenOutput.innerHTML = '0';

//Switch themes by removing, and after that, adding a class to the HTML Body element
//Also save the theme we selected to the localStorage
const themeSwitcher = (value) => {
        body[0].removeAttribute("class");
        localStorage.setItem('theme', value);
        body[0].setAttribute("class", themesArray[Number.parseInt(value) - 1]);
}

//Load the theme we selected on a previous visit
window.onload = () => {
    if (themeMode === 'NaN' || themeMode === 'null' || themeMode === {NaN} || themeMode === null) {
        //do nothing
    } else {
        themeSwitcher(themeMode);
        //Set the range input value to the localStorage theme value
        toggle.value = Number.parseInt(localStorage.getItem('theme'));
    }
}
    
//Call the themeSwitcher function to switch the theme when toggling the range input
toggle.addEventListener("input", () => {
    themeSwitcher(toggle.value);
});

//Reset all the values to the default values
reset.addEventListener("click", () => {
    hardreset();
});

hardreset = () => {
    numberInput = '';
    operatorInput = '';
    previousInput = '';
    operatorCheck = false;
    equalsCheck = false;
    equalsValue = '';
    currentValue = '';
    screenOutput.innerHTML = '0';
    previousScreenOutput.innerHTML = null;  
}

//Delete the numberInput, can't delete when screeninput is 0 or after an equals.
delete_key.addEventListener("click", () => {
    if (screenOutput.innerHTML !== '0' && equalsCheck === false) {
    screenOutput.innerHTML = screenOutput.innerHTML.slice(0, -1);
        if (screenOutput.innerHTML === '' || screenOutput.innerHTML === '-')
        screenOutput.innerHTML = '0';
    } 
});

//Receive the number value when pressing a number key
numbers.forEach(number => {
    number.addEventListener("click", () => {
        numberInput = number.innerHTML;
        if (screenOutput.innerHTML.includes('.') > 0) {
            if (numberInput === '.') {

            } else {
                screenOutput.innerHTML += numberInput;
            }
        } else if (screenOutput.innerHTML === `Can't divide by zero`) {

        } else if (screenOutput.innerHTML === '0') {
            screenOutput.innerHTML = numberInput;
        } else {
        screenOutput.innerHTML += numberInput;

        }
    });
})

//Receive the operator when pressing an operator key
operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if (operatorCheck === false) {
            operatorInput = operator.innerHTML;
            previousInput = screenOutput.innerHTML;
            previousScreenOutput.innerHTML = `${previousInput} ${operatorInput}`;
            operatorCheck = true;
            equalsCheck = false;
            screenOutput.innerHTML = null;
        }        
    });
})

//Equals. Equals only works when we have an operator and a previousvalue. 
equals.addEventListener('click', () => {
    if (!equalsCheck && operatorCheck) {
        currentValue = screenOutput.innerHTML;

        if (currentValue === '') {

        } else {
            screenOutput.innerHTML = null;

            switch (operatorInput) {
                case '+':
                    equalsValue = Number.parseFloat(previousInput) + Number.parseFloat(currentValue);
                    previousScreenOutput.innerHTML = `${previousInput} ${operatorInput} ${currentValue} =`;
                    screenOutput.innerHTML = equalsValue;
                    operatorCheck = false;
                    break;
                case '-':
                    equalsValue = Number.parseFloat(previousInput) - Number.parseFloat(currentValue);
                    previousScreenOutput.innerHTML = `${previousInput} ${operatorInput} ${currentValue} =`;
                    screenOutput.innerHTML = equalsValue;
                    operatorCheck = false;
                    break;
                case 'x':
                    equalsValue = Number.parseFloat(previousInput) * Number.parseFloat(currentValue);
                    previousScreenOutput.innerHTML = `${previousInput} ${operatorInput} ${currentValue} =`;     
                    screenOutput.innerHTML = equalsValue;
                    operatorCheck = false;   
                    break;
                case '/':
                    if (Number.parseFloat(currentValue) === 0 || currentValue === '.') {
                        previousScreenOutput.innerHTML = '';
                        screenOutput.innerHTML = `Can't divide by zero`; 
                    } else {
                        equalsValue = Number.parseFloat(previousInput) / Number.parseFloat(currentValue);
                        previousScreenOutput.innerHTML = `${previousInput} ${operatorInput} ${currentValue} =`;
                        screenOutput.innerHTML = equalsValue; 
                        operatorCheck = false;
                    }
                    break;
                }

            equalsCheck = true;
        }
    } else {

    } 
});