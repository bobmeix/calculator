function add(...numbers) {
    let result = 0;
    numbers.forEach (number => result += +number);
    return result;
}

function subtract(number, ...numbers) {
    let result = number;
    numbers.forEach (number => result -= +number);
    return result;
}

function multiply(...numbers) {
    let result = 1;
    numbers.forEach (number => result *= +number);
    return result;
}

function divide(number, ...numbers) {
    let result = number;
    numbers.forEach (number => result /= +number);
    return result;
}

function exponentiate(base, ...exponents) {
    let result = base;
    exponents.forEach (number => result **= +number);
    return result;
}

function operate (operator, ...numbers) {
    return operator(...numbers);
}

// console.log(add(6, 10.8, 3.2));
// console.log(exponentiate(multiply(add(2, add(7, add(1, 5)), subtract(10)), 5, divide('2.5')), 4));
// console.log(add(2, subtract(multiply(2, -3, -2))));
// console.log(add(2, multiply(10, divide(2))));
// console.log(exponentiate(2, 4));

console.log(operate(add, 3, 2));
console.log(operate(subtract, 3, 2));
console.log(operate(multiply, 3, 2));
console.log(operate(divide, 3, 2));
console.log(operate(exponentiate, 3, 2));