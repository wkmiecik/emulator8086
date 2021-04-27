function executeButton(event) {
    let command = inputCommand.value;
    if (command == "") return;

    error = executeCommand(command);
    if (error) {
        console.error("error: " + error);
    }
}

function executeCommand(command) {
    let instruction = command.split(/(?<=^\S+)\s/)[0];
    let arguments = command.split(/(?<=^\S+)\s/)[1];
    if (!arguments) {
        return "no arguments given";
    } 
    arguments = arguments.replace(/\s+/g, '');

    let arg1;
    let arg2;

    switch (instruction) {
        case "mov":
            arg1 = arguments.split(",")[0];
            arg2 = arguments.split(",")[1];
            return mov(arg1, arg2);

        case "xchg":
            arg1 = arguments.split(",")[0];
            arg2 = arguments.split(",")[1];
            return xchg(arg1, arg2);

        default:
            return "wrong instruction";
    }
}

function xchg(arg1, arg2) {
    let arg1Size;
    let arg2Size;

    // Check if register arg1 exist and save its size
    if ((arg1Size = getRegSize(arg1)) == undefined) {
        return "Wrong register name: " + arg1;
    }

    // Check if register arg2 exist and save its size
    if ((arg2Size = getRegSize(arg2)) == undefined) {
        return "Wrong register name: " + arg2;
    }

    // Check if size of registers matches
    if (arg1Size != arg2Size) {
        return "Registers size do not match";
    }

    let temp = "";
    let error = "";

    temp = getRegValue(arg1);

    error = setRegister(arg1, getRegValue(arg2));
    if (error) return error;
    error = setRegister(arg2, temp);
    return error;
}

function mov(arg1, arg2) {
    let arg1Size;
    let arg2Size;

    // Check if there is a second argument
    if (arg2 == undefined || arg2 == "") {
        return "Instruction mov needs second argument";
    }

    // Check if register arg1 exist and save its size
    if ((arg1Size = getRegSize(arg1)) == undefined) {
        return "Wrong register name: " + arg1;
    }

    // Check if register arg2 exist and save its size
    if ((arg2Size = getRegSize(arg2)) == undefined) {
        // If arg2 is value, just set it to register
        return setRegister(arg1, arg2);
    } else {
        // If arg2 is register, check if its size matches arg1 and set
        if (arg1Size == arg2Size) {
            return setRegister(arg1, getRegValue(arg2));
        } else {
            return "Registers size do not match";
        }
    }
}

function setRegister(register, value) {
    let hexValue = "";

    // Check size of register
    let registerSize = getRegSize(register);

    // Convert to hex if argument is dec
    if (value[value.length - 1] != "h" && value[value.length - 1] != "H") {
        // Argument is dec
        let onlyNumbers = /[^0-9]+/g;
        if (onlyNumbers.test(value)) {
            return "Argument is incorrect value";
        }

        value = parseInt(value);
        hexValue = value.toString(16);
    } else {
        // Argument is hex
        hexValue = value.slice(0, -1);

        let onlyHexNumbers = /[^0-9a-f]+/g;
        if (onlyHexNumbers.test(hexValue)) {
            return "Argument is incorrect value";
        }
    }

    // Pad value with 0s if too short
    hexValue = hexValue.padStart(registerSize, '0');
    // Check if value is not over register size
    if ((registerSize == 4 && hexValue.length > 4) || (registerSize == 2 && hexValue.length > 2)) {
        return "Argument over register size or incorrect argument";
    }
    
    // Set register if size 2
    if (registerSize == 2) {
        registers[register].value = hexValue;
    }

    // Set register if size 4
    if (registerSize == 4) {
        if (register[1] == "x") {
            registers[register[0].concat("h")].value = hexValue.slice(0, 2);
            registers[register[0].concat("l")].value = hexValue.substring(2, 4);
        } else {
            registers[register].value = hexValue;
        }
    }

    // Singnal no errors
    return false;
}

function getRegSize(register) {
    if (registers[register] == undefined) {
        return undefined;
    }

    if (register[1] == "x" || register[1] == "p" || register[1] == "i") {
        return 4;
    } else {
        return 2;
    }
}

function getRegValue(register) {
    if (registers[register] == undefined) {
        return undefined;
    }

    if (register[1] == "x") {
        let valueH = registers[register[0].concat("h")].value;
        let valueL = registers[register[0].concat("l")].value;
        valueH = valueH.padStart(2, '0');
        valueL = valueL.padStart(2, '0');
        return valueH.concat(valueL).concat("h");
    } else {
        if(getRegSize(register) == 2) {
            return registers[register].value.padStart(2, '0').concat("h");
        } else if (getRegSize(register) == 4) {
            return registers[register].value.padStart(4, '0').concat("h");
        }
    }
}


// Start
setRegister("dx", "100ch");