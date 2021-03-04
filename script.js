function passInput(event, inputRef) {
    const inputs = Array.from(document.querySelectorAll('input'));
    const inputIndex = inputs.findIndex((input) => input === inputRef);

    if(event.charCode === 13) {
        if(inputIndex === inputs.length - 1) {
            inputs[inputIndex].blur();
            createDerivative();
        } else {
            inputs[inputIndex+1].focus();
        }
    }
}

function createDerivative() {
    try {
        const functionReturn = document.getElementById('function-return').value;
        const functionPoint = Number(document.getElementById('function-point').value);
        const functionAddition = Number(document.getElementById('function-addition').value.replace(',', '.'));
        
        if(!functionReturn || !functionPoint || !functionAddition) {
            throw new Error();
        }

        let letter;
        const signals =  ['+', '-', '*', '/', '%'];

        for(let ind of functionReturn) {
            let verifyIfIsSignal = signals.find((item) => item === ind);
            
            if(!Number(ind) && !verifyIfIsSignal) {
                letter = ind;
                break;
            }
        }

        const functionReturnFixed = functionReturn.replaceAll(letter, 'x');

        const derivativeFunction = (x) => eval(functionReturnFixed);

        const derivative = (p, h, derivativeFunctionCall) => {
            const result = (derivativeFunctionCall(p+h)-derivativeFunctionCall(p))/h;
            
            return result;
        }

        const derivativeResult = derivative(functionPoint, functionAddition, derivativeFunction);

        document.getElementById('final-value').innerText = derivativeResult;
        document.getElementById('result-head').innerText = "Resultado da derivada:";
    } catch {
        alert("Ocorreu um erro: Verifique atentamente os dados preenchidos.");
    }
}