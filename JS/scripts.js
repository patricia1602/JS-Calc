const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    //add  digit to calculator screen(adicionar dígito à tela da calculadora)
    addDigit(digit) {

        //check digit to calculator  screen(dígito de verificação para a tela da calculadora)
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //Process all constructor operations(processa todas as operações da calculadora)
    processOperation(operation) {
        //Get current and previous value(Obter valor atual e anterior)
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            default:
                return;
        }
    }

    //Change values of the calculator screen(Alterar valores da tela da calculadora)
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

        console.log(operationValue, operation, current, previous);

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //Check if value is zero, if it is just add current value
            //(Verifique se o valor é zero, se for apenas adicione o valor atual)
            if (previous === 0) {
                operationValue = current
            }

            //Add current value to previous(Adicionar valor atual ao anterior)
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});