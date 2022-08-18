window.addEventListener('keydown', addKeyboardNumber);
const displayBottom = document.querySelector('.display-bottom');
const displayTop = document.querySelector('.display-top');
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', addMouseNumber);
})
const controlButtons = document.querySelectorAll('.control');
controlButtons.forEach(controlButton => {
    controlButton.addEventListener('click', getMouseControlValue);
})
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', getMouseOperatorValue);
})
const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', getMouseEqualValue);

let displayBottomValue;
let displayTopValue;

function reduceDisplayBottomFontSize() {
    if (displayBottom.textContent.length > 23) {
        displayBottom.setAttribute('style', 'font-size: 20px');
    } else if (displayBottom.textContent.length > 17) {
        displayBottom.setAttribute('style', `font-size: 29.5px`);
    }
}

function addMouseNumber(number) {
    if (displayBottom.textContent.length >= 34) return;
    
    if (displayBottom.textContent === '0' && getMouseNumberValue(number) !== '.') {
        displayBottom.textContent = getMouseNumberValue(number);
    } else if (displayBottom.textContent !== '0' && getMouseNumberValue(number) !== '.') {
        displayBottom.textContent += getMouseNumberValue(number);
    } else if (displayBottom.textContent.includes('.')) {
        return;
    } else if (getMouseNumberValue(number) === '.') {
        console.log('right elseif');
        displayBottom.textContent += '.';
    }
    let displayBottomValue = displayBottom.textContent;
    console.log(getMouseNumberValue(number), `length: ${displayBottom.innerText.length}`);
    console.log(displayBottomValue);

    reduceDisplayBottomFontSize();
    //return e.target.innerText;
}

function addKeyboardNumber(number) {
    if (displayBottom.textContent.length >= 34) return;
    
    if (displayBottom.textContent === '0' && getKeyboardNumberValue(number) !== '.') {
        displayBottom.textContent = getKeyboardNumberValue(number) ? getKeyboardNumberValue(number) : '0';
    } else if (displayBottom.textContent !== '0' && getKeyboardNumberValue(number) !== '.') {
        console.log('wrong elseif');
        displayBottom.textContent += getKeyboardNumberValue(number) ? getKeyboardNumberValue(number) : '';
    } else if (displayBottom.textContent.includes('.')) {
        return;
    } else if (getKeyboardNumberValue(number) === '.') {
        console.log('right elseif');
        displayBottom.textContent += '.';
    }

        // if (getKeyboardNumberValue(number) === '.') {
    //     console.log(number.target);
    // }

    let displayBottomValue = displayBottom.textContent;
    console.log(getKeyboardNumberValue(number), `length: ${displayBottom.innerText.length}`);
    console.log(displayBottomValue);

    reduceDisplayBottomFontSize();
    //return e.target.innerText;
}


function getMouseNumberValue(e) {
    return e.target.innerText;
}

function getKeyboardNumberValue(e) {
    if ((e.key >= 0 && e.key <= 9) || e.key === ".") {
        console.log(e.key);
        return e.key;
    }
}

function getMouseControlValue(e) {
    console.log(e.target.innerText);
}

function getMouseOperatorValue(e) {
    console.log(e.target.innerText);
}

function getMouseEqualValue(e) {
    console.log(e.target.innerText);
}

function add(...numbers) {
    let result = 0;
    numbers.forEach(number => result += +number);
    return result;
}

function subtract(number, ...numbers) {
    let result = +number;
    numbers.forEach(number => result -= +number);
    return result;
}

function multiply(...numbers) {
    let result = 1;
    numbers.forEach(number => result *= +number);
    return result;
}

function divide(number, ...numbers) {
    let result = +number;
    numbers.forEach(number => result /= +number);
    return result;
}

function exponentiate(base, ...exponents) {
    let result = +base;
    exponents.forEach(number => result **= +number);
    return result;
}

function raiseTwoToPower(...exponents) {
    let result = 2;
    exponents.forEach(exponent => result = exponentiate(result, exponent));
    return result;
}

function calculateNthRoot(radicand, ...degrees) {
    let result = +radicand;
    degrees.forEach(degree => result = exponentiate(result, 1 / degree));
    return result;
}

function reverseSign(number) {
    return -number;
}

function calculatePercent(number) {
    return +number / 100;
}

function operate(operator, ...numbers) {
    return operator(...numbers);
}

// console.log(add(6, 10.8, 3.2));
// console.log(exponentiate(multiply(add(2, add(7, add(1, 5)), subtract(10)), 5, divide('2.5')), 4));
// console.log(add(2, subtract(multiply(2, -3, -2))));
// console.log(add(2, multiply(10, divide(2))));
// console.log(exponentiate(2, 4));

console.log(operate(add, 3, 2));
console.log(operate(subtract, 3, 2));
console.log(operate(multiply, 3, 2, 2));
console.log(operate(divide, '3', 4));
console.log(operate(exponentiate, '-3', 3, 3));
console.log(operate(reverseSign, '-2'))
console.log(operate(raiseTwoToPower, '-2', '-4'));
console.log(operate(calculateNthRoot, '81', 2, 3, 2));
console.log(operate(calculatePercent, '25'));