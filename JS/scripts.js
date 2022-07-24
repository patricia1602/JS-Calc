const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

//*console.log(buttons);*//

class Calculator {

    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    //add  digit to calculator screen(adicionar dígito à tela da calculadora)
    addDigit(digit){
        console.log(digit);
    }
}

    const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        //*console.log(value);*//

        if(+value >= 0 || value === "."){
            calc.addDigit(value);
        }else {
            console.log("Op:" + value)
        }
    });
});