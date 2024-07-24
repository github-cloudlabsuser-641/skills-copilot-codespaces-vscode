document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let operator = null;
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                operator = null;
                firstOperand = null;
                display.textContent = '0';
            } else if (value === '=') {
                if (operator && firstOperand !== null) {
                    currentInput = calculate(firstOperand, currentInput, operator);
                    display.textContent = currentInput;
                    operator = null;
                    firstOperand = null;
                }
            } else if (['+', '-', '*', '/', '√', '^'].includes(value)) {
                if (currentInput) {
                    if (firstOperand === null) {
                        firstOperand = currentInput;
                    } else if (operator) {
                        firstOperand = calculate(firstOperand, currentInput, operator);
                    }
                    operator = value;
                    currentInput = '';
                }
            } else {
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });

    function calculate(first, second, operator) {
        const a = parseFloat(first);
        const b = parseFloat(second);
        switch (operator) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '*': return (a * b).toString();
            case '/': return (a / b).toString();
            case '√': return Math.sqrt(a).toString();
            case '^': return Math.pow(a, b).toString();
            default: return second;
        }
    }
});