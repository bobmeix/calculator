window.addEventListener('keydown', addKeyboardNumber);
window.addEventListener('keydown', getKeyboardControlValue);
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
    operatorButton.addEventListener('click', executeOperation);
})
const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', executeOperation);

const operatorsAndValues = {
    add(...numbers) {
        let result = 0;
        numbers.forEach(number => result += +number);
        return result;
    },
    subtract(number, ...numbers) {
        let result = +number;
        numbers.forEach(number => result -= +number);
        return result;
    },
    multiply(...numbers) {
        let result = 1;
        numbers.forEach(number => result *= +number);
        return result;
    },
    divide(number, ...numbers) {
        let result = +number;
        numbers.forEach(number => result /= +number);
        return result;
    },
    exponentiate(base, ...exponents) {
        let result = +base;
        exponents.forEach(number => result **= +number);
        return result;
    },
    raiseTwoToPower(...exponents) {
        let result = 2;
        exponents.forEach(exponent => result = operatorsAndValues.exponentiate(result, exponent));
        return result;
    },
    calculateNthRoot(radicand, ...degrees) {
        let result = +radicand;
        degrees.forEach(degree => result = operatorsAndValues.exponentiate(result, 1 / degree));
        return result;
    },
    reverseSign(number) {
        return -number;
    },
    calculatePercent(number) {
        return +number / 100;
    },
    displayBottomValueCurrent: 0,
    displayBottomValuePrevious: 0,
    displayTopValue: 0,

    resultCurrent: 0,
    resultPrevious: 0,

    operatorCurrent: null,
    operatorPrevious: null,

    operatorSymbol: '',
};


function reduceDisplayBottomFontSize() {
    if (displayBottom.textContent.length > 23) {
        displayBottom.setAttribute('style', 'font-size: 20px');
    } else if (displayBottom.textContent.length > 17  || displayBottom.textContent.includes('e')) {
        displayBottom.setAttribute('style', `font-size: 29.5px`);
    } else {
        displayBottom.setAttribute('style', `font-size: 40px`);
    }
}


function addMouseNumber(number) {
    if (displayBottom.textContent.length >= 34) return;

    displayBottom.textContent = operatorsAndValues.displayBottomValueCurrent;

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
    operatorsAndValues.displayBottomValueCurrent = displayBottom.textContent;



    console.log(getMouseNumberValue(number), `length: ${displayBottom.innerText.length}`);
    // console.log('current ' + operatorsAndValues.displayBottomValueCurrent);
    // console.log('previous ' + operatorsAndValues.displayBottomValuePrevious);


    reduceDisplayBottomFontSize();
    //return e.target.innerText;
}

function addKeyboardNumber(number) {
    if (displayBottom.textContent.length >= 34) return;

    displayBottom.textContent = operatorsAndValues.displayBottomValueCurrent;

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

    operatorsAndValues.displayBottomValueCurrent = displayBottom.textContent;
    console.log(getKeyboardNumberValue(number), `length: ${displayBottom.innerText.length}`);
    console.log(operatorsAndValues.displayBottomValue);

    reduceDisplayBottomFontSize();
    //return e.target.innerText;
}

function executeOperation(operator) {
    operatorsAndValues.operatorCurrent = getMouseOperator(operator);

    console.log('yes');
    console.log('current ' + operatorsAndValues.displayBottomValueCurrent);
    console.log('previous ' + operatorsAndValues.displayBottomValuePrevious);

    operatorsAndValues.resultCurrent = operate(operatorsAndValues.operatorCurrent,
        operatorsAndValues.resultPrevious,
        operatorsAndValues.displayBottomValueCurrent)
    displayBottom.textContent = operatorsAndValues.resultCurrent;
    displayTop.textContent = `${operatorsAndValues.resultCurrent} ${operatorsAndValues.operatorSymbol}`;

    operatorsAndValues.resultPrevious = operatorsAndValues.resultCurrent;
    operatorsAndValues.resultCurrent = 0;

    console.log('currentResult ' + operatorsAndValues.resultCurrent);
    console.log('previousResult ' + operatorsAndValues.resultPrevious);

    operatorsAndValues.operatorPrevious = operatorsAndValues.operatorCurrent;
    operatorsAndValues.operatorCurrent = null;

    operatorsAndValues.displayBottomValuePrevious = operatorsAndValues.displayBottomValueCurrent;
    operatorsAndValues.displayBottomValueCurrent = 0;

    reduceDisplayBottomFontSize();
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
    console.log(e.target.id);
    if (e.target.id === 'all-clear') clearAll();
    if (e.target.id === 'clear-entry') clearEntry();
    if (e.target.id === 'back') back();
}

function getKeyboardControlValue(e) {
    if (e.key === 'Backspace') back();
    if (e.key === 'Delete') clearEntry();
    if (e.key === 'Escape') clearAll();
}

function getMouseOperator(e) {
    console.log(e.target.id);

    switch (e.target.id) {
        case 'add':
            console.log(operatorsAndValues.add);
            operatorsAndValues.operatorSymbol = '+';
            return operatorsAndValues.add;
        case 'subtract':
            console.log(operatorsAndValues.subtract);
            operatorsAndValues.operatorSymbol = '-';
            return operatorsAndValues.subtract;
        case 'multiply':
            operatorsAndValues.operatorSymbol = '×';
            console.log(operatorsAndValues.multiply);
            return operatorsAndValues.multiply;
        case 'divide':
            operatorsAndValues.operatorSymbol = '÷';
            console.log(operatorsAndValues.divide);
            return operatorsAndValues.divide;
    }
}

function operate(operator, ...numbers) {
    return operator(...numbers);
}

function clearAll() {
    displayBottom.textContent = '0';
    displayBottom.setAttribute('style', `font-size: 40px`);
    displayTop.textContent = '';

    operatorsAndValues.displayBottomValueCurrent = 0;
    operatorsAndValues.displayBottomValuePrevious = 0;
    operatorsAndValues.displayTopValue = 0;

    operatorsAndValues.resultCurrent = 0;
    operatorsAndValues.resultPrevious = 0;

    operatorCurrent = null;
    operatorPrevious = null;

    operatorSymbol = '';
}

function clearEntry() {
    displayBottom.textContent = '0';
    displayBottom.setAttribute('style', `font-size: 40px`);
    operatorsAndValues.displayBottomValueCurrent = displayBottom.textContent;
}

function back() {
    reduceDisplayBottomFontSize();
    if (displayBottom.textContent.length === 1) {
        displayBottom.textContent = '0';
        displayBottom.setAttribute('style', `font-size: 40px`);
        operatorsAndValues.displayBottomValueCurrent = displayBottom.textContent;
        return;
    }
    displayBottom.textContent = displayBottom.textContent.slice(0, -1);
    operatorsAndValues.displayBottomValueCurrent = displayBottom.textContent;
}

// console.log(add(6, 10.8, 3.2));
// console.log(exponentiate(multiply(add(2, add(7, add(1, 5)), subtract(10)), 5, divide('2.5')), 4));
// console.log(add(2, subtract(multiply(2, -3, -2))));
// console.log(add(2, multiply(10, divide(2))));
// console.log(exponentiate(2, 4));

console.log(operate(operatorsAndValues.add, 3, 2));
console.log(operate(operatorsAndValues.subtract, 3, 2));
console.log(operate(operatorsAndValues.multiply, 3, 2, 2));
console.log(operate(operatorsAndValues.divide, '3', 4));
console.log(operate(operatorsAndValues.exponentiate, '-3', 3, 3));
console.log(operate(operatorsAndValues.reverseSign, '-2'))
console.log(operate(operatorsAndValues.raiseTwoToPower, '-3', '-3'));
console.log(Math.round(operate(operatorsAndValues.calculateNthRoot, '64', 3)));
console.log(operate(operatorsAndValues.calculatePercent, '25'));