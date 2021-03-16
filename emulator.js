function nextStep(event) {
    if (commandPointer < commands.length - 1) {
        let command = commands[commandPointer].value;
        if (command == "") return;
        error = executeCommand(command);

        if (!error) {
            commandPointer += 1;
            setCurrentCommand(commands[commandPointer]);
        } else {
            console.error("error while executing command: " + error);
        }
    } else {
        console.log("Finished");
    }
}

function executeCommand(command) {
    let instruction = command.split(/(?<=^\S+)\s/)[0];
    let arguments = command.split(/(?<=^\S+)\s/)[1];
    if (!arguments) {
        return "no arguments given";
    } 
    arguments = arguments.replace(/\s+/g, '');

    switch (instruction) {
        case "mov":
            let arg1 = arguments.split(",")[0];
            let arg2 = arguments.split(",")[1];
            return mov(arg1, arg2);

        default:
            return "wrong instruction";
    }
}

function mov(arg1, arg2) {
    // Add checking if arg2 is ax,bx,cx,dx and read whole register

    // Error checking
    if (registers[arg1] == undefined) {
        return "Wrong register name: " + arg1;
    }
    if (arg2 == undefined || arg2 == "") {
        return "Instruction mov needs second argument";
    }

    if (registers[arg2] == undefined) {
        return setRegister(arg1, arg2);
    } else {
        if (arg2[1] == "x") {
            let arg2a = registers[arg2[0].concat("h")].value;
            let arg2b = registers[arg2[0].concat("l")].value;
            return setRegister(arg1, arg2a.concat(arg2b).concat("h"));
        } else {
            return setRegister(arg1, registers[arg2].value.concat("h"));
        }
    }
}

function setRegister(register, value) {
    // Add checking if value is same size as given register
    registerSize = (register[1] == "x") ? 4:2;

    // Convert to hex
    if (value[value.length - 1] != "h" && value[value.length - 1] != "H") {
        value = parseInt(value);
        hexValue = value.toString(16);
    } else {
        hexValue = value.slice(0, -1);
    }

    // Check if correct size
    if ((registerSize == 4 && hexValue.length > 4) || (registerSize == 2 && hexValue.length > 2)) {
        return "Argument over register size or incorrect argument";
    }
    
    // Set register
    if (registerSize == 2) {
        if (hexValue.length == 1) {
            hexValue = ("0").concat(hexValue);
        }
        registers[register].value = hexValue;
    }

    if (registerSize == 4) {
        if (hexValue.length == 1) {
            hexValue = ("000").concat(hexValue);
        }
        else if (hexValue.length == 2) {
            hexValue = ("00").concat(hexValue);
        }
        else if (hexValue.length == 3) {
            hexValue = ("0").concat(hexValue);
        }
        registers[register[0].concat("h")].value = hexValue.slice(0, 2);
        registers[register[0].concat("l")].value = hexValue.substring(2, 4);
    }

    // Singnal no errors
    return false;
}


// Start
setRegister("dl", 12);