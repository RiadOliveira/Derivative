const inputs = Array.from(document.querySelectorAll('input'));

function passInput(event, inputRef) {
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
        const functionReturn = document.getElementById('function-return').value.replace(',', '.');
        const functionPoint = Number(document.getElementById('function-point').value.replace(',', '.'));
        const functionAddition = Number(document.getElementById('function-addition').value.replace(',', '.'));
        
        if(!functionReturn || typeof functionPoint != 'number' || !functionAddition) {
            throw new Error();
        }

        let letter;
        const signals =  ['+', '-', '*', '/', '%'];

        for(let ind of functionReturn) {
            let verifyIfIsSignal = signals.find((item) => item === ind);
            
            if(typeof Number(ind) !== 'number' && !verifyIfIsSignal) {
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

        document.getElementById('result-head').innerText = "Resultado da derivada:";
        document.getElementById('final-value').innerText = String(derivativeResult).replace('.', ',');
    } catch {
        document.getElementById('result-head').innerText = "";
        document.getElementById('final-value').innerText = "";

        setTimeout(() => {
            alert("Ocorreu um erro: Verifique atentamente os dados preenchidos.");
        }, 2);
    }
}

function toggleCredits() {
    const creditDiv = document.getElementById('credits');
    const creditsStatus = window.getComputedStyle(creditDiv).display;
    creditDiv.style.display = creditsStatus === 'none' ? 'flex' : 'none'; 
}
