function executeButton(event) {
    if (document.querySelectorAll(".wrong").length > 0) {
        console.error("error: One or more registers have incorrect value");
        return;
    }

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
    arguments = arguments.toLowerCase();

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



    // Check if arg1 is memory location
    if (arg1[0] == "[") {
        let address = calcMemAddress(arg1);
        if (address.length > 5) return address;

        // Check if register arg2 exist and save its size
        if ((arg2Size = getRegSize(arg2)) == undefined) {
            return "Wrong register name: " + arg2;
        }

        let temp = "";
        let error = "";
    
        temp = getRegValue(arg2);
    
        if (arg2Size == 2) {
            error = setRegister(arg2, getMemory(address) + "h");
        } else {
            let value = getMemory((parseInt(address, 16) + 1).toString(16).padStart(4, '0')) + getMemory(address) + "h";
            error = setRegister(arg2, value);
        }
        if (error) return error;

        error = setMemory(address, temp);

        return error;
    }

    // Check if arg2 is memory location
    if (arg2[0] == "[") {
        let address = calcMemAddress(arg2);
        if (address.length > 5) return address;

        // Check if register arg1 exist and save its size
        if ((arg1Size = getRegSize(arg1)) == undefined) {
            return "Wrong register name: " + arg1;
        }

        let temp = "";
        let error = "";
    
        temp = getRegValue(arg1);
    
        if (arg1Size == 2) {
            error = setRegister(arg1, getMemory(address) + "h");
        } else {
            let value = getMemory((parseInt(address, 16) + 1).toString(16).padStart(4, '0')) + getMemory(address) + "h";
            error = setRegister(arg1, value);
        }
        if (error) return error;
        
        error = setMemory(address, temp);

        return error;
    }





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



    // Check if arg1 is memory location
    if (arg1[0] == "[") {
        let address = calcMemAddress(arg1);
        if (address.length > 5) return address;

        // Check if register arg2 exist and save it to memory
        if ((arg2Size = getRegSize(arg2)) == undefined) {
            return setMemory(address, arg2);
        } else {
            return setMemory(address, getRegValue(arg2));
        }
    }
    // Check if arg2 is memory location
    if (arg2[0] == "[") {
        let address = calcMemAddress(arg2);
        if (address.length > 5) return address;

        // Check if register arg1 exist and save it's value from memory
        if ((arg1Size = getRegSize(arg1)) == undefined) {
            return "Wrong register name: " + arg1;
        } else {
            if (arg1Size == 2) {
                return setRegister(arg1, getMemory(address) + "h");
            } else {
                let value = getMemory((parseInt(address, 16) + 1).toString(16).padStart(4, '0')) + getMemory(address) + "h";
                return setRegister(arg1, value);
            }
        }
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

function getMemory(address) {
    if (memory[address] == undefined) {
        memory[address] = "00";
    }
    return memory[address];
}

function calcMemAddress(param) {
    param = param.slice(1,-1);
    let regs = param.split("+");

    let sum = 0;

    for (let reg of regs) {
        if (reg == "bx" || reg == "bp" || reg == "si" || reg == "di" || reg == "disp") {
            sum += parseInt(registers[reg].value, 16);
        } else {
            return reg + " can't be used to adress memory";
        }
    }

    return sum.toString(16).padStart(4, '0');
}

function setMemory(address, value) {
    // Trim address if too big
    address = address.substring(address.length - 4);

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

        let onlyHexNumbers = /[^0-9a-fA-F]+/g;
        if (onlyHexNumbers.test(hexValue)) {
            return "Argument is incorrect value";
        }
    }

    // Pad value with 0s if too short and change to upper case
    hexValue = hexValue.toUpperCase();

    if (hexValue.length <= 2) {
        hexValue = hexValue.padStart(2, '0');
        memory[address] = hexValue;
    } else if (hexValue.length > 2) {
        hexValue = hexValue.padStart(4, '0');
        if (hexValue.length > 4) {
            hexValue = hexValue.substring(hexValue.length - 4);
        }

        memory[(parseInt(address, 16) + 1).toString(16).padStart(4, '0')] = hexValue.slice(0, 2);
        memory[address] = hexValue.substring(2, 4);
    }

    viewMemoryFrom(address);
    return false;
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

        let onlyHexNumbers = /[^0-9a-fA-F]+/g;
        if (onlyHexNumbers.test(hexValue)) {
            return "Argument is incorrect value";
        }
    }

    // Pad value with 0s if too short and change to upper case
    hexValue = hexValue.padStart(registerSize, '0');
    hexValue = hexValue.toUpperCase();

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