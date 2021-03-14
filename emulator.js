function nextStep(event) {
    if (commandPointer < commands.length - 1) {
        let command = commands[commandPointer].value;
        executeCommand(command);

        commands[commandPointer].style.backgroundColor = "rgb(223, 223, 223)";
        commands[commandPointer + 1].style.backgroundColor = "rgb(144, 238, 144)";

        commandPointer += 1;
    } else {
        console.log("Finished");
    }
}
// function backStep(event) { }

function executeCommand(command) {
    let instruction = command.split(/(?<=^\S+)\s/)[0];
    let arguments = command.split(/(?<=^\S+)\s/)[1];
    if (!arguments) {
        console.error("wrong command");
        return;
    } 
    arguments = arguments.replace(/\s+/g, '');

    switch (instruction) {
        case "mov":
            let arg1 = arguments.split(",")[0];
            let arg2 = arguments.split(",")[1];
            mov(arg1, arg2);
            break;

        default:
            console.error("wrong command");
            break;
    }
}

function mov(arg1, arg2) {
    console.log(registers[arg2]);
    if (registers[arg2] == undefined) {
        setRegister(registers[arg1], arg2);
    } else {
        setRegister(registers[arg1], registers[arg2].value);
    }
}

function setRegister(register, value) {
    value = value.toString();
    
    if (value.length == 1) {
        value = ("0").concat(value);
    } else {
        value = value.slice(-2);
    }
    register.value = value;
}


// Start
setRegister(dl, 12);