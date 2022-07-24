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
        console.log(digit);
        //Check if number already has a dot(Verifica se o número já tem um ponto)
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //Process all constructor operations(processa todas as operações da calculadora)
    processOperation(operation) {
        //Check if current value is empty(Verifique se o valor atual está vazio) 
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            //Change operation(Mudar operação)
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

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
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperator();
                break;
            case "C":
                this.processClearOperator();
                break;
            case "=":
                this.processEqualOperator();
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
        if (operationValue === null) {
            // Append number to current value(Anexa o número ao valor atual)
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //Check if value is zero, if it is just add current value
            //(Verifique se o valor é zero, se for apenas adicione o valor atual)
            if (previous === 0) {
                operationValue = current;
            }

            //Add current value to previous(Adicionar valor atual ao anterior)
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    //Change math operation(Alterar operação matemática)
    changeOperation(operation) {
        const mathOperations = ["*", "-", "+", "/"];

        if (mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText =
            this.previousOperationText.slice(0, -1) + operation;
    }

    //Delete a digit(Excluir um digito)
    processDelOperator() {
        this.currentOperationText.innerText =
            this.currentOperationText.innerText.slice(0, -1);
    }

    //Clear current operation(Limpar operação atual)
    processClearOperator() {
        this.currentOperationText.innerText = "";
    }

    //Clear all operations(Limpar todas as operações)
    processClearOperator() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    //Process an operation(Processo da operação)
    processEqualOperator() {
        let operation = this.previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
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