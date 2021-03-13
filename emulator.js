function nextStep(event) {
    
}

function backStep(event) {

}

function executeCommand(command) {
    
}

function setRegister(register, value) {
    value = value.toString();
    
    if(value.length == 1) {
        value = ("0").concat(value);
    } else {
        value = value.slice(-2);
    }
    register.value = value;
}


// Start
setRegister(dl, 12);