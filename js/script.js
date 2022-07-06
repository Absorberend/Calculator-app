const toggle = document.querySelector(".toggle__input");
const screenOutput = document.querySelector(".screen__output");
const body = document.getElementsByTagName('body');
const numbers = document.querySelectorAll('#key__number');
const operators = document.querySelectorAll('#key__operator');
const equals = document.getElementById('key__equals');
const delete_key = document.getElementById('key__delete');
const reset = document.getElementById('key__reset');

let themeMode = localStorage.getItem('theme');

const themesArray = ["blue__theme", "white__theme", "purple__theme"];

let numberInput;
let operatorInput;
let previousInput = '';
let operatorCheck = false;
let equalsCheck = false;
let equalsValue = '';
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

outputCheck = value => {
    //Clear the 0 from the screen depending on the input
    if (screenOutput.innerHTML === '0') {
        if (value === '0') {
            //do nothing
        } else if (value === '.') {
            screenOutput.innerHTML += value;
        } else {
            screenOutput.innerHTML = value;
        }
    //No unlimited periods
    } else if (value === '.') {
        if (!screenOutput.innerHTML.includes('.')) {
            screenOutput.innerHTML += value;
        } else {
            //do nothing
        } 
    //If we have pressed an operator we overrule the old screenvalue with the new value
    } else if (previousInput !== '') {
        if (operatorCheck === true) {
            screenOutput.innerHTML = value;
            operatorCheck = false;
        } else {
            screenOutput.innerHTML += value;
            operatorCheck = false;
        }
    } else {
        screenOutput.innerHTML += value;
    }
}

//Receive the number value when pressing a number key
numbers.forEach(number => {
    number.addEventListener("click", () => {
        numberInput = number.innerHTML;
        outputCheck(numberInput)
    });
})

//Reset all the values to the default values
reset.addEventListener("click", () => {
    numberInput = '';
    operatorInput = '';
    previousInput = '';
    operatorCheck = false;
    equalsCheck = false;
    equalsValue = '';
    screenOutput.innerHTML = '0';
});

delete_key.addEventListener("click", () => {
    if (screenOutput.innerHTML !== '0') {
    screenOutput.innerHTML = screenOutput.innerHTML.slice(0, -1);
        if (screenOutput.innerHTML === '' || screenOutput.innerHTML === '-')
        screenOutput.innerHTML = '0';
    } 
});

//Receive the operator when pressing an operator key
operators.forEach(operator => {
    operator.addEventListener("click", () => {
            operatorInput = operator.innerHTML;
            previousInput = screenOutput.innerHTML;
            operatorCheck = true;
            equalsCheck = false;
    });
})

equals.addEventListener('click', () => {


    if (Number.parseFloat(screenOutput.innerHTML) === 0 && !equalsCheck) {
        screenOutput.innerHTML = '0';
    } else if (operatorCheck = false) {
        screenOutput.innerHTML = screenOutput.innerHTML;       
    } else {
        if (operatorInput === '+') {
            if (!equalsCheck) {
                screenOutput.innerHTML = Number.parseFloat(previousInput) + Number.parseFloat(screenOutput.innerHTML);
                equalsCheck = true;
                equalsValue = Number.parseFloat(screenOutput.innerHTML) - Number.parseFloat(previousInput);
            } else {
                screenOutput.innerHTML = Number.parseFloat(screenOutput.innerHTML) + Number.parseFloat(equalsValue);    
            }
        } else if (operatorInput === 'x') {
            if (!equalsCheck) {
                screenOutput.innerHTML = Number.parseFloat(previousInput) * Number.parseFloat(screenOutput.innerHTML);
                equalsCheck = true;
                equalsValue = Number.parseFloat(screenOutput.innerHTML) / Number.parseFloat(previousInput);
            } else if (screenOutput.innerHTML === '0') {
                //do nothing
            } else {
                screenOutput.innerHTML = Number.parseFloat(screenOutput.innerHTML) * Number.parseFloat(equalsValue);    
            }
        } else if (operatorInput === '-') {
            if (!equalsCheck) {
                screenOutput.innerHTML = Number.parseFloat(previousInput) - Number.parseFloat(screenOutput.innerHTML);
                equalsCheck = true;
                equalsValue = Number.parseFloat(previousInput) - Number.parseFloat(screenOutput.innerHTML);
            } else {
                screenOutput.innerHTML = Number.parseFloat(screenOutput.innerHTML) - Number.parseFloat(equalsValue);    
            }
        } else if (operatorInput === '/') {
            if (!equalsCheck) {
                screenOutput.innerHTML = Number.parseFloat(previousInput) / Number.parseFloat(screenOutput.innerHTML);
                equalsCheck = true;
                equalsValue = Number.parseFloat(previousInput) / Number.parseFloat(screenOutput.innerHTML);
            } else {
                screenOutput.innerHTML = Number.parseFloat(screenOutput.innerHTML) / Number.parseFloat(equalsValue);    
            }
        }
    }
});