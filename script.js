window.addEventListener('keydown', addKeyboardNumber);
window.addEventListener('keydown', getKeyboardControlValue);
window.addEventListener('keydown', executeKeyboardOperation);
window.addEventListener('keydown', calculateOnEnter);

const displayBottom = document.querySelector('.display-bottom');
const displayTop = document.querySelector('.display-top');
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(numberButton => {
    numberButton.addEventListener('mousedown', addMouseNumber);
})
const controlButtons = document.querySelectorAll('.control');
controlButtons.forEach(controlButton => {
    controlButton.addEventListener('mousedown', getMouseControlValue);
})
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('mousedown', executeOperation);
})
const equalButton = document.querySelector('.equal');
equalButton.addEventListener('mousedown', calculateResult);

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
    } else if (displayBottom.textContent.length > 17 || displayBottom.textContent.includes('e')) {
        displayBottom.setAttribute('style', `font-size: 29.5px`);
    } else if (displayBottom.textContent.length > 13 || displayBottom.textContent.includes('e')) {
        displayBottom.setAttribute('style', `font-size: 40px`);
    } else {
        displayBottom.setAttribute('style', `font-size: 50px`);
    }
}

function reduceDisplayTopFontSize() {
    if (displayTop.textContent.length > 34) {
        displayTop.setAttribute('style', 'font-size: 17px');
    } else if (displayTop.textContent.length > 22) {
        displayTop.setAttribute('style', `font-size: 20px`);
    } else {
        displayTop.setAttribute('style', `font-size: 30px`);
    }
}


function addMouseNumber(number) {
    if (displayBottom.textContent.length >= 34 ||
        displayBottom.textContent === 'Division by zero, not cool!' ||
        displayBottom.textContent === 'Infinity') return;

    displayBottom.textContent = operatorsAndValues.displayBottomValueCurrent;

    if (displayBottom.textContent === '0' && getMouseNumberValue(number) !== '.') {
        displayBottom.textContent = getMouseNumberValue(number);
    } else if (displayBottom.textContent !== '0' && getMouseNumberValue(number) !== '.') {
        displayBottom.textContent += getMouseNumberValue(number);
    } else if (displayBottom.textContent.includes('.')) {
        return;
    } else if (getMouseNumberValue(number) === '.') {
        displayBottom.textContent += '.';
    }
    operatorsAndValues.displayBottomValueCurrent = displayBottom.textContent;

    reduceDisplayBottomFontSize();
}

function addKeyboardNumber(number) {
    if (displayBottom.textContent.length >= 34 ||
        !((number.key >= 0 && number.key <= 9) || number.key === '.') ||
        number.key === ' ' ||
        displayBottom.textContent === 'Division by zero, not cool!' ||
        displayBottom.textContent === 'Infinity'
    ) return;

    displayBottom.textContent = operatorsAndValues.displayBottomValueCurrent;

    if (displayBottom.textContent === '0' && getKeyboardNumberValue(number) !== '.') {
        displayBottom.textContent = getKeyboardNumberValue(number) ? getKeyboardNumberValue(number) : '0';
    } else if (displayBottom.textContent !== '0' && getKeyboardNumberValue(number) !== '.') {
        displayBottom.textContent += getKeyboardNumberValue(number) ? getKeyboardNumberValue(number) : '';
    } else if (displayBottom.textContent.includes('.')) {
        return;
    } else if (getKeyboardNumberValue(number) === '.') {
        displayBottom.textContent += '.';
    }
    operatorsAndValues.displayBottomValueCurrent = displayBottom.textContent;

    reduceDisplayBottomFontSize();
}

function getMouseNumberValue(e) {
    return e.target.innerText;
}

function getKeyboardNumberValue(e) {
    if ((e.key >= 0 && e.key <= 9) || e.key === '.') {
        return e.key;
    }
}

function getMouseControlValue(e) {
    if (e.target.id === 'back') back();
    if (e.target.id === 'clear-entry') clearEntry();
    if (e.target.id === 'all-clear') clearAll();
}

function getKeyboardControlValue(e) {
    if (e.key === 'Backspace') back();
    if (e.key === 'Delete') clearEntry();
    if (e.key === 'Escape') clearAll();
}

function getMouseOperator(e) {
    switch (e.target.id) {
        case 'add':
            operatorsAndValues.operatorSymbol = '+';
            return operatorsAndValues.add;
        case 'subtract':
            operatorsAndValues.operatorSymbol = '-';
            return operatorsAndValues.subtract;
        case 'multiply':
            operatorsAndValues.operatorSymbol = '×';
            return operatorsAndValues.multiply;
        case 'divide':
            operatorsAndValues.operatorSymbol = '÷';
            return operatorsAndValues.divide;
        case 'exponentiate':
            operatorsAndValues.operatorSymbol = '^';
            return operatorsAndValues.exponentiate;
        case 'exponent-n':
            operatorsAndValues.operatorSymbol = '^';
            return operatorsAndValues.exponentiate;
        case 'raise-two-to-power':
            operatorsAndValues.operatorSymbol = '2 ^';
            return operatorsAndValues.raiseTwoToPower;
        case 'exponent-X':
            operatorsAndValues.operatorSymbol = '2 ^';
            return operatorsAndValues.raiseTwoToPower;
        case 'calculate-nth-root':
            operatorsAndValues.operatorSymbol = '√';
            return operatorsAndValues.calculateNthRoot;
        case 'degree-n':
            operatorsAndValues.operatorSymbol = '√';
            return operatorsAndValues.calculateNthRoot;
        case 'radicand-x':
            operatorsAndValues.operatorSymbol = '√';
            return operatorsAndValues.calculateNthRoot;
        case 'reverse-sign':
            operatorsAndValues.operatorSymbol = '±';
            return operatorsAndValues.reverseSign;
        case 'percent':
            operatorsAndValues.operatorSymbol = '%';
            return operatorsAndValues.calculatePercent;
    }
}

function getKeyboardOperator(e) {
    switch (e.key) {
        case '+':
            operatorsAndValues.operatorSymbol = '+';
            return operatorsAndValues.add;
        case '-':
            operatorsAndValues.operatorSymbol = '-';
            return operatorsAndValues.subtract;
        case '*':
            operatorsAndValues.operatorSymbol = '×';
            return operatorsAndValues.multiply;
        case '/':
            operatorsAndValues.operatorSymbol = '÷';
            return operatorsAndValues.divide;
        default:
            return;
    }
}

function calculateOnEnter(e) {
    if (e.key === 'Enter') calculateResult();
}

function executeOperation(operator) {
    if (operatorsAndValues.operatorCurrent) {
        calculateResult();
    }

    operatorsAndValues.operatorCurrent = getMouseOperator(operator);

    if (displayBottom.textContent === 'Division by zero, not cool!' ||
        displayBottom.textContent === 'Infinity') return;

    if (operator.target.id === 'add' ||
        operator.target.id === 'subtract' ||
        operator.target.id === 'multiply' ||
        operator.target.id === 'divide' ||
        operator.target.id === 'calculate-nth-root' ||
        operator.target.id === 'degree-n' ||
        operator.target.id === 'radicand-x' ||
        operator.target.id === 'exponentiate' ||
        operator.target.id === 'exponent-n') {
        operatorsAndValues.displayBottomValueCurrent = displayBottom.textContent;
        displayTop.textContent = operator.target.id === 'calculate-nth-root' ||
            operator.target.id === 'degree-n' ||
            operator.target.id === 'radicand-x' ?
            `${operatorsAndValues.operatorSymbol} ${operatorsAndValues.displayBottomValueCurrent} =` :
            `${operatorsAndValues.displayBottomValueCurrent} ${operatorsAndValues.operatorSymbol} `;

        updateDisplayBottomValue();
    }

    if (operator.target.id === 'raise-two-to-power' ||
        operator.target.id === 'exponent-X' ||
        operator.target.id === 'reverse-sign' ||
        operator.target.id === 'percent') {
        operatorsAndValues.displayBottomValueCurrent = displayBottom.textContent;
        operatorsAndValues.resultCurrent = operate(operatorsAndValues.operatorCurrent,
            operatorsAndValues.displayBottomValueCurrent)
        displayBottom.textContent = operatorsAndValues.resultCurrent;
        displayTop.textContent = operator.target.id === 'percent' ?
            `${operatorsAndValues.displayBottomValueCurrent} ${operatorsAndValues.operatorSymbol} =` :
            `${operatorsAndValues.operatorSymbol} ${operatorsAndValues.displayBottomValueCurrent} =`;
        operatorsAndValues.displayBottomValueCurrent = operatorsAndValues.resultCurrent;

        updateOperatorsAndValues();
    }

    reduceDisplayBottomFontSize();
    reduceDisplayTopFontSize();
}

function executeKeyboardOperation(operator) {
    if (!(operator.key === '+' ||
        operator.key === '-' ||
        operator.key === '*' ||
        operator.key === '/') ||
        displayBottom.textContent === 'Division by zero, not cool!' ||
        displayBottom.textContent === 'Infinity') return;

    if (operator.key === '+' ||
        operator.key === '-' ||
        operator.key === '*' ||
        operator.key === '/') {

        if (operatorsAndValues.operatorCurrent) {
            calculateResult();
        }

        operatorsAndValues.operatorCurrent = getKeyboardOperator(operator);
        operatorsAndValues.displayBottomValueCurrent = displayBottom.textContent;
        displayTop.textContent = `${operatorsAndValues.displayBottomValueCurrent} ${operatorsAndValues.operatorSymbol} `;

        updateDisplayBottomValue();
    }

    reduceDisplayBottomFontSize();
    reduceDisplayTopFontSize();
}

function calculateResult() {
    if (!operatorsAndValues.operatorCurrent ||
        !operatorsAndValues.displayBottomValueCurrent ||
        displayBottom.textContent === 'Division by zero, not cool!' ||
        displayBottom.textContent === 'Infinity') return;

    if (operatorsAndValues.operatorCurrent.name === 'divide' && operatorsAndValues.displayBottomValueCurrent === '0') {
        displayBottom.textContent = 'Division by zero, not cool!';
        displayTop.append(' 0 =')
        reduceDisplayBottomFontSize();
        return;
    }

    if (operatorsAndValues.operatorCurrent.name === 'calculateNthRoot') {
        displayTop.prepend(`${operatorsAndValues.displayBottomValueCurrent} `);
    } else {
        displayTop.append(`${operatorsAndValues.displayBottomValueCurrent} =`);
    }

    operatorsAndValues.resultCurrent = operate(operatorsAndValues.operatorCurrent,
        operatorsAndValues.displayBottomValuePrevious, operatorsAndValues.displayBottomValueCurrent);
    displayBottom.textContent = operatorsAndValues.resultCurrent;
    operatorsAndValues.displayBottomValueCurrent = operatorsAndValues.resultCurrent;

    updateOperatorsAndValues();
    reduceDisplayBottomFontSize();
    reduceDisplayTopFontSize();
}

function operate(operator, ...numbers) {
    return Math.round(operator(...numbers) * 1000000000000) / 1000000000000;
}

function updateDisplayBottomValue() {
    operatorsAndValues.displayBottomValuePrevious = operatorsAndValues.displayBottomValueCurrent;
    operatorsAndValues.displayBottomValueCurrent = 0;
}

function updateOperatorsAndValues() {
    operatorsAndValues.operatorPrevious = operatorsAndValues.operatorCurrent;
    operatorsAndValues.operatorCurrent = null;

    operatorsAndValues.displayBottomValuePrevious = operatorsAndValues.displayBottomValueCurrent;
    operatorsAndValues.displayBottomValueCurrent = 0;

    operatorsAndValues.resultPrevious = operatorsAndValues.resultCurrent;
    operatorsAndValues.resultCurrent = 0;
}

function clearAll() {
    displayBottom.textContent = '0';
    displayBottom.setAttribute('style', `font-size: 50px`);
    displayTop.textContent = '';

    operatorsAndValues.displayBottomValueCurrent = 0;
    operatorsAndValues.displayBottomValuePrevious = 0;
    operatorsAndValues.displayTopValue = 0;

    operatorsAndValues.resultCurrent = 0;
    operatorsAndValues.resultPrevious = 0;

    operatorsAndValues.operatorCurrent = null;
    operatorsAndValues.operatorPrevious = null;

    operatorsAndValues.operatorSymbol = '';
}

function clearEntry() {
    if (displayBottom.textContent === 'Division by zero, not cool!' ||
        displayBottom.textContent === 'Infinity') {
        clearAll();
    };
    displayBottom.textContent = '0';
    displayBottom.setAttribute('style', `font-size: 50px`);
    operatorsAndValues.displayBottomValueCurrent = displayBottom.textContent;
}

function back() {
    if (displayBottom.textContent === 'Division by zero, not cool!' ||
        displayBottom.textContent === 'Infinity') {
        clearAll();
    };
    reduceDisplayBottomFontSize();
    if (displayBottom.textContent.length === 1) {
        displayBottom.textContent = '0';
        displayBottom.setAttribute('style', `font-size: 50px`);
        operatorsAndValues.displayBottomValueCurrent = displayBottom.textContent;
        return;
    }
    displayBottom.textContent = displayBottom.textContent.slice(0, -1);
    operatorsAndValues.displayBottomValueCurrent = displayBottom.textContent;
}