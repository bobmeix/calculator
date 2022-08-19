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
    operatorButton.addEventListener('click', executeOperation);
})
const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', getMouseEqualValue);

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

    operatorCurrent: '',
    operatorPrevious: '',
};


function reduceDisplayBottomFontSize() {
    if (displayBottom.textContent.length > 23) {
        displayBottom.setAttribute('style', 'font-size: 20px');
    } else if (displayBottom.textContent.length > 17) {
        displayBottom.setAttribute('style', `font-size: 29.5px`);
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
    operatorsAndValues.operatorCurrent = getMouseOperatorValue(operator);


    switch (operatorsAndValues.operatorCurrent) {
        case 'add':
            console.log('yes');
            console.log('current ' + operatorsAndValues.displayBottomValueCurrent);
            console.log('previous ' + operatorsAndValues.displayBottomValuePrevious);

            operatorsAndValues.resultCurrent = operate(operatorsAndValues.add,
                operatorsAndValues.resultPrevious,
                operatorsAndValues.displayBottomValueCurrent)
            displayBottom.textContent = operatorsAndValues.resultCurrent;
            displayTop.textContent = `${operatorsAndValues.resultCurrent} +`;

            operatorsAndValues.resultPrevious = operatorsAndValues.resultCurrent;
            operatorsAndValues.resultCurrent = 0;

            console.log('currentResult ' + operatorsAndValues.resultCurrent);
            console.log('previousResult ' + operatorsAndValues.resultPrevious);

            break;
        case 'subtract':
            console.log('yes');
            console.log('current ' + operatorsAndValues.displayBottomValueCurrent);
            console.log('previous ' + operatorsAndValues.displayBottomValuePrevious);

            operatorsAndValues.resultCurrent = operate(operatorsAndValues.subtract,
                operatorsAndValues.resultPrevious,
                operatorsAndValues.displayBottomValueCurrent)
            displayBottom.textContent = operatorsAndValues.resultCurrent;
            displayTop.textContent = `${operatorsAndValues.resultCurrent} -`;

            operatorsAndValues.resultPrevious = operatorsAndValues.resultCurrent;
            operatorsAndValues.resultCurrent = 0;

            console.log('currentResult ' + operatorsAndValues.resultCurrent);
            console.log('previousResult ' + operatorsAndValues.resultPrevious);

            break;
    }
    operatorsAndValues.operatorPrevious = operatorsAndValues.operatorCurrent;
    operatorsAndValues.operatorCurrent = '';
    
    operatorsAndValues.displayBottomValuePrevious = operatorsAndValues.displayBottomValueCurrent;
    operatorsAndValues.displayBottomValueCurrent = 0;
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
    console.log(e.target.id);
    return e.target.id;
}

function getMouseEqualValue(e) {
    console.log(e.target.innerText);
}

function operate(operator, ...numbers) {
    return operator(...numbers);
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