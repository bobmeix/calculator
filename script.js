window.addEventListener('keydown', addKeyboardNumber);
window.addEventListener('keydown', getKeyboardControlValue);
window.addEventListener('keydown', executeKeyboardOperation);
window.addEventListener('keydown', calculateOnEnter);

const displayBottom = document.querySelector('[data-display-bottom]');
const displayTop = document.querySelector('[data-display-top]');
const numberButtons = document.querySelectorAll('[data-number]');
numberButtons.forEach(numberButton => {
    numberButton.addEventListener('mousedown', addMouseNumber);
})
const controlButtons = document.querySelectorAll('[data-control]');
controlButtons.forEach(controlButton => {
    controlButton.addEventListener('mousedown', getMouseControlValue);
})
const operatorButtons = document.querySelectorAll('[data-operator]');
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('mousedown', executeOperation);
})
const equalButton = document.querySelector('[data-equal]');
equalButton.addEventListener('mousedown', calculateResult);

const letters = /[a-zA-Z]/;

const calculator = {
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
        exponents.forEach(exponent => result = calculator.exponentiate(result, exponent));
        return result;
    },
    calculateNthRoot(radicand, ...degrees) {
        let result = +radicand;
        degrees.forEach(degree => result = calculator.exponentiate(result, 1 / degree));
        return result;
    },
    reverseSign(number) {
        return -number;
    },
    calculatePercent(number) {
        return +number / 100;
    },
    convertFtoC(number) {
        return (+number - 32) / 1.8 ;
    },
    convertLBtoKG(number) {
        return (+number * 0.45359237);
    },
    convertINtoCM(number) {
        return (+number * 2.54);
    },
    convertMItoKM(number) {
        return (+number * 1.609344)
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
        displayBottom.textContent === 'Infinity' ||
        displayBottom.textContent === '-Infinity' ||
        displayBottom.textContent === 'NaN') return;

    displayBottom.textContent = addThousandSeparators(String(calculator.displayBottomValueCurrent));

    if (displayBottom.textContent === '0' && getMouseNumberValue(number) !== ',') {
        displayBottom.textContent = getMouseNumberValue(number);
    } else if (displayBottom.textContent !== '0' && getMouseNumberValue(number) !== ',') {
        displayBottom.textContent = removeThousandSeparators(displayBottom.textContent);
        displayBottom.textContent += getMouseNumberValue(number);
        displayBottom.textContent = addThousandSeparators(displayBottom.textContent);
    } else if (displayBottom.textContent.includes(',')) {
        return;
    } else if (getMouseNumberValue(number) === ',') {
        displayBottom.textContent += ',';
    }
    calculator.displayBottomValueCurrent = removeThousandSeparators(displayBottom.textContent);

    reduceDisplayBottomFontSize();
}

function addKeyboardNumber(number) {
    if (displayBottom.textContent.length >= 34 ||
        !((number.key >= 0 && number.key <= 9) || number.key === '.') ||
        number.key === ' ' ||
        displayBottom.textContent === 'Division by zero, not cool!' ||
        displayBottom.textContent === 'Infinity' ||
        displayBottom.textContent === '-Infinity' ||
        displayBottom.textContent === 'NaN') return;

    displayBottom.textContent = addThousandSeparators(String(calculator.displayBottomValueCurrent));

    if (displayBottom.textContent === '0' && getKeyboardNumberValue(number) !== '.') {
        displayBottom.textContent = getKeyboardNumberValue(number) ? getKeyboardNumberValue(number) : '0';
    } else if (displayBottom.textContent !== '0' && getKeyboardNumberValue(number) !== '.') {
        displayBottom.textContent = removeThousandSeparators(displayBottom.textContent);
        displayBottom.textContent += getKeyboardNumberValue(number) ? getKeyboardNumberValue(number) : '';
        displayBottom.textContent = addThousandSeparators(displayBottom.textContent);
    } else if (displayBottom.textContent.includes(',')) {
        return;
    } else if (getKeyboardNumberValue(number) === '.') {
        displayBottom.textContent += ',';
    }
    calculator.displayBottomValueCurrent = removeThousandSeparators(displayBottom.textContent);

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
            calculator.operatorSymbol = '+';
            return calculator.add;
        case 'subtract':
            calculator.operatorSymbol = '-';
            return calculator.subtract;
        case 'multiply':
            calculator.operatorSymbol = '×';
            return calculator.multiply;
        case 'divide':
            calculator.operatorSymbol = '÷';
            return calculator.divide;
        case 'exponentiate':
            calculator.operatorSymbol = '^';
            return calculator.exponentiate;
        case 'exponent-n':
            calculator.operatorSymbol = '^';
            return calculator.exponentiate;
        case 'raise-two-to-power':
            calculator.operatorSymbol = '2 ^';
            return calculator.raiseTwoToPower;
        case 'exponent-X':
            calculator.operatorSymbol = '2 ^';
            return calculator.raiseTwoToPower;
        case 'calculate-nth-root':
            calculator.operatorSymbol = '√';
            return calculator.calculateNthRoot;
        case 'degree-n':
            calculator.operatorSymbol = '√';
            return calculator.calculateNthRoot;
        case 'radicand-x':
            calculator.operatorSymbol = '√';
            return calculator.calculateNthRoot;
        case 'reverse-sign':
            calculator.operatorSymbol = '±';
            return calculator.reverseSign;
        case 'percent':
            calculator.operatorSymbol = '%';
            return calculator.calculatePercent;
        case 'fahrenheit-celsius':
            calculator.operatorSymbol = '°F';
            return calculator.convertFtoC;
        case 'pound-kg':
            calculator.operatorSymbol = 'lbs';
            return calculator.convertLBtoKG;
        case 'inch-cm':
            calculator.operatorSymbol = 'in';
            return calculator.convertINtoCM;
        case 'mile-km':
            calculator.operatorSymbol = 'mi';
            return calculator.convertMItoKM;
    }
}

function getKeyboardOperator(e) {
    switch (e.key) {
        case '+':
            calculator.operatorSymbol = '+';
            return calculator.add;
        case 'a':
            calculator.operatorSymbol = '+';
            return calculator.add;
        case 'A':
            calculator.operatorSymbol = '+';
            return calculator.add;
        case '-':
            calculator.operatorSymbol = '-';
            return calculator.subtract;
        case 's':
            calculator.operatorSymbol = '-';
            return calculator.subtract;
        case 'S':
            calculator.operatorSymbol = '-';
            return calculator.subtract;
        case '*':
            calculator.operatorSymbol = '×';
            return calculator.multiply;
        case 'x':
            calculator.operatorSymbol = '×';
            return calculator.multiply;
        case 'X':
            calculator.operatorSymbol = '×';
            return calculator.multiply;
        case '/':
            calculator.operatorSymbol = '÷';
            return calculator.divide;
        case 'd':
            calculator.operatorSymbol = '÷';
            return calculator.divide;
        case 'D':
            calculator.operatorSymbol = '÷';
            return calculator.divide;
        default:
            return;
    }
}

function calculateOnEnter(e) {
    if (e.key === 'Enter' || e.key === '=') calculateResult();
}

function executeOperation(operator) {
    if (calculator.operatorCurrent) {
        calculateResult();
    }

    calculator.operatorCurrent = getMouseOperator(operator);

    if (displayBottom.textContent === 'Division by zero, not cool!' ||
        displayBottom.textContent === 'Infinity' ||
        displayBottom.textContent === '-Infinity' ||
        displayBottom.textContent === 'NaN') return;

    if (operator.target.id === 'add' ||
        operator.target.id === 'subtract' ||
        operator.target.id === 'multiply' ||
        operator.target.id === 'divide' ||
        operator.target.id === 'calculate-nth-root' ||
        operator.target.id === 'degree-n' ||
        operator.target.id === 'radicand-x' ||
        operator.target.id === 'exponentiate' ||
        operator.target.id === 'exponent-n') {
        calculator.displayBottomValueCurrent = replaceCommaWithDot(removeThousandSeparators(displayBottom.textContent));

        displayTop.textContent = operator.target.id === 'calculate-nth-root' ||
            operator.target.id === 'degree-n' ||
            operator.target.id === 'radicand-x' ?
            `${calculator.operatorSymbol} ${addThousandSeparators(replaceDotWithComma(calculator.displayBottomValueCurrent))} =` :
            `${addThousandSeparators(replaceDotWithComma(calculator.displayBottomValueCurrent))} ${calculator.operatorSymbol} `;

        updateDisplayBottomValue();
    }

    if (operator.target.id === 'raise-two-to-power' ||
        operator.target.id === 'exponent-X' ||
        operator.target.id === 'reverse-sign' ||
        operator.target.id === 'percent') {
        calculator.displayBottomValueCurrent = replaceCommaWithDot(removeThousandSeparators(displayBottom.textContent));
        calculator.resultCurrent = operate(calculator.operatorCurrent,
            calculator.displayBottomValueCurrent)
        displayBottom.textContent = addThousandSeparators(replaceDotWithComma(String(calculator.resultCurrent)));
        displayTop.textContent = operator.target.id === 'percent' ?
            `${addThousandSeparators(replaceDotWithComma(calculator.displayBottomValueCurrent))} ${calculator.operatorSymbol} =` :
            `${calculator.operatorSymbol} ${addThousandSeparators(replaceDotWithComma(calculator.displayBottomValueCurrent))} =`;
        calculator.displayBottomValueCurrent = calculator.resultCurrent;

        updateCalculator();
    }

    if (operator.target.id === 'fahrenheit-celsius') {
        displayBottom.textContent.search(letters) !== -1 ? 
            calculator.displayBottomValueCurrent = replaceCommaWithDot(removeThousandSeparators(displayBottom.textContent.slice(0, -3))) :
            calculator.displayBottomValueCurrent = replaceCommaWithDot(removeThousandSeparators(displayBottom.textContent));
        
        calculator.resultCurrent = operate(calculator.operatorCurrent,
            calculator.displayBottomValueCurrent)
        displayBottom.textContent = `${addThousandSeparators(replaceDotWithComma(String(calculator.resultCurrent)))} °C`;
        displayTop.textContent = `${addThousandSeparators(replaceDotWithComma(calculator.displayBottomValueCurrent))} ${calculator.operatorSymbol} =`;
        calculator.displayBottomValueCurrent = calculator.resultCurrent;
        
        reduceDisplayBottomFontSize();
        updateCalculator();
    }

    if (operator.target.id === 'pound-kg') {
        displayBottom.textContent.search(letters) !== -1 ? 
            calculator.displayBottomValueCurrent = replaceCommaWithDot(removeThousandSeparators(displayBottom.textContent.slice(0, -3))) :
            calculator.displayBottomValueCurrent = replaceCommaWithDot(removeThousandSeparators(displayBottom.textContent));

        calculator.resultCurrent = operate(calculator.operatorCurrent,
            calculator.displayBottomValueCurrent)
        displayBottom.textContent = `${addThousandSeparators(replaceDotWithComma(String(calculator.resultCurrent)))} kg`;
        displayTop.textContent = `${addThousandSeparators(replaceDotWithComma(calculator.displayBottomValueCurrent))} ${calculator.operatorSymbol} =`;
        calculator.displayBottomValueCurrent = calculator.resultCurrent;
        
        reduceDisplayBottomFontSize();
        updateCalculator();
    }

    if (operator.target.id === 'inch-cm') {
        displayBottom.textContent.search(letters) !== -1 ? 
            calculator.displayBottomValueCurrent = replaceCommaWithDot(removeThousandSeparators(displayBottom.textContent.slice(0, -3))) :
            calculator.displayBottomValueCurrent = replaceCommaWithDot(removeThousandSeparators(displayBottom.textContent));

        calculator.resultCurrent = operate(calculator.operatorCurrent,
            calculator.displayBottomValueCurrent)
        displayBottom.textContent = `${addThousandSeparators(replaceDotWithComma(String(calculator.resultCurrent)))} cm`;
        displayTop.textContent = `${addThousandSeparators(replaceDotWithComma(calculator.displayBottomValueCurrent))} ${calculator.operatorSymbol} =`;
        calculator.displayBottomValueCurrent = calculator.resultCurrent;
        
        reduceDisplayBottomFontSize();
        updateCalculator();
    }
    
    if (operator.target.id === 'mile-km') {
        displayBottom.textContent.search(letters) !== -1 ? 
            calculator.displayBottomValueCurrent = replaceCommaWithDot(removeThousandSeparators(displayBottom.textContent.slice(0, -3))) :
            calculator.displayBottomValueCurrent = replaceCommaWithDot(removeThousandSeparators(displayBottom.textContent));

        calculator.resultCurrent = operate(calculator.operatorCurrent,
            calculator.displayBottomValueCurrent)
        displayBottom.textContent = `${addThousandSeparators(replaceDotWithComma(String(calculator.resultCurrent)))} km`;
        displayTop.textContent = `${addThousandSeparators(replaceDotWithComma(calculator.displayBottomValueCurrent))} ${calculator.operatorSymbol} =`;
        calculator.displayBottomValueCurrent = calculator.resultCurrent;
        
        reduceDisplayBottomFontSize();
        updateCalculator();
    }

    reduceDisplayBottomFontSize();
    reduceDisplayTopFontSize();

    if (displayBottom.textContent === 'Infinity' ||
        displayBottom.textContent === '-Infinity') {
        displayBottom.setAttribute('style', 'font-family: monospace');
    }
}

function executeKeyboardOperation(operator) {
    if (!(operator.key === '+' ||
        operator.key === 'a' ||
        operator.key === 'A' ||
        operator.key === '-' ||
        operator.key === 's' ||
        operator.key === 'S' ||
        operator.key === '*' ||
        operator.key === 'x' ||
        operator.key === 'X' ||
        operator.key === '/' ||
        operator.key === 'd' ||
        operator.key === 'D') ||
        displayBottom.textContent === 'Division by zero, not cool!' ||
        displayBottom.textContent === 'Infinity' ||
        displayBottom.textContent === '-Infinity' ||
        displayBottom.textContent === 'NaN') return;

    if (operator.key === '+' ||
        operator.key === 'a' ||
        operator.key === 'A' ||
        operator.key === '-' ||
        operator.key === 's' ||
        operator.key === 'S' ||
        operator.key === '*' ||
        operator.key === 'x' ||
        operator.key === 'X' ||
        operator.key === '/' ||
        operator.key === 'd' ||
        operator.key === 'D') {

        if (calculator.operatorCurrent) {
            calculateResult();
        }

        calculator.operatorCurrent = getKeyboardOperator(operator);
        calculator.displayBottomValueCurrent = replaceCommaWithDot(removeThousandSeparators(displayBottom.textContent));
        displayTop.textContent = `${addThousandSeparators(replaceDotWithComma(calculator.displayBottomValueCurrent))} ${calculator.operatorSymbol} `;

        updateDisplayBottomValue();
    }

    reduceDisplayBottomFontSize();
    reduceDisplayTopFontSize();
}

function calculateResult() {
    if (!calculator.operatorCurrent ||
        !calculator.displayBottomValueCurrent ||
        displayBottom.textContent === 'Division by zero, not cool!' ||
        displayBottom.textContent === 'Infinity' ||
        displayBottom.textContent === '-Infinity' ||
        displayBottom.textContent === 'NaN') return;

    if (calculator.operatorCurrent.name === 'divide' && calculator.displayBottomValueCurrent === '0') {
        displayBottom.textContent = 'Division by zero, not cool!';
        displayTop.append(' 0 =')
        reduceDisplayBottomFontSize();
        return;
    }

    if (calculator.operatorCurrent.name === 'calculateNthRoot') {
        displayTop.prepend(`${addThousandSeparators(calculator.displayBottomValueCurrent)} `);
    } else {
        displayTop.append(`${addThousandSeparators(calculator.displayBottomValueCurrent)} =`);
    }

    calculator.resultCurrent = operate(calculator.operatorCurrent,
        calculator.displayBottomValuePrevious, replaceCommaWithDot(calculator.displayBottomValueCurrent));
    displayBottom.textContent = addThousandSeparators(replaceDotWithComma(String(calculator.resultCurrent)));
    calculator.displayBottomValueCurrent = calculator.resultCurrent;

    updateCalculator();
    reduceDisplayBottomFontSize();
    reduceDisplayTopFontSize();

    if (displayBottom.textContent === 'Infinity' ||
        displayBottom.textContent === '-Infinity') {
        displayBottom.setAttribute('style', 'font-family: monospace');
    }
}

function operate(operator, ...numbers) {
    return Math.round(operator(...numbers) * 1000000000000) / 1000000000000;
}

function updateDisplayBottomValue() {
    calculator.displayBottomValuePrevious = calculator.displayBottomValueCurrent;
    calculator.displayBottomValueCurrent = 0;
}

function updateCalculator() {
    calculator.operatorPrevious = calculator.operatorCurrent;
    calculator.operatorCurrent = null;

    calculator.displayBottomValuePrevious = calculator.displayBottomValueCurrent;
    calculator.displayBottomValueCurrent = 0;

    calculator.resultPrevious = calculator.resultCurrent;
    calculator.resultCurrent = 0;
}

function clearAll() {
    displayBottom.textContent = '0';
    displayBottom.setAttribute('style', `font-size: 50px`);
    displayTop.textContent = '';

    calculator.displayBottomValueCurrent = 0;
    calculator.displayBottomValuePrevious = 0;
    calculator.displayTopValue = 0;

    calculator.resultCurrent = 0;
    calculator.resultPrevious = 0;

    calculator.operatorCurrent = null;
    calculator.operatorPrevious = null;

    calculator.operatorSymbol = '';
}

function clearEntry() {
    if (displayBottom.textContent === 'Division by zero, not cool!' ||
        displayBottom.textContent === 'Infinity' ||
        displayBottom.textContent === '-Infinity' ||
        displayBottom.textContent === 'NaN') {
        clearAll();
    };
    displayBottom.textContent = '0';
    displayBottom.setAttribute('style', `font-size: 50px`);
    calculator.displayBottomValueCurrent = displayBottom.textContent;
}

function back() {
    if (displayBottom.textContent === 'Division by zero, not cool!' ||
        displayBottom.textContent === 'Infinity' ||
        displayBottom.textContent === '-Infinity' ||
        displayBottom.textContent === 'NaN') {
        clearAll();
    };
    reduceDisplayBottomFontSize();
    if (displayBottom.textContent.length === 1) {
        displayBottom.textContent = '0';
        displayBottom.setAttribute('style', `font-size: 50px`);
        calculator.displayBottomValueCurrent = displayBottom.textContent;
        return;
    }
    displayBottom.textContent = removeThousandSeparators(displayBottom.textContent);
    displayBottom.textContent = displayBottom.textContent.slice(0, -1);
    displayBottom.textContent = addThousandSeparators(displayBottom.textContent);
    calculator.displayBottomValueCurrent = removeThousandSeparators(displayBottom.textContent);
}

function addThousandSeparators(number) {
    let integerPart;
    let fractionalPart;
    let addedSeparators;

    if (number.includes(',')) {
        integerPart = number.split(',')[0];
        fractionalPart = number.split(',')[1];
        addedSeparators = `${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${fractionalPart}`;
    } else {
        addedSeparators = `${number.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    }
    return addedSeparators;
}

function removeThousandSeparators(number) {
    return number.replace(/\./g, '');
}

function replaceCommaWithDot(number) {
    return number.replace(',', '.');
}

function replaceDotWithComma(number) {
    return number.replace('.', ',');
}