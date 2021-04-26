// Add event listeners to control buttons
nextStepButton.addEventListener('click', nextStep);
//backStepButton.addEventListener('click', backStep);

function newCommandField(index) {
    field = document.createElement("div");
    field.className = "command-field";

    input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("class","command-field-input-box");
    input.setAttribute("id","command".concat(init ? index : index + 1));
    input.setAttribute("maxlength","64");
    input.setAttribute("size","30%");
    input.setAttribute("autocomplete","off");
    input.setAttribute("spellcheck","false");
    if (init) input.style.backgroundColor = "rgb(144, 238, 144)";

    field.append(input);
    if (init) {
        commandsContainer.append(field);
    } else {
        field.appendAfter(commands[index].parentNode);
    }


    field.addEventListener('input', (event)=>{
        let thisIndex = parseInt(event.target.getAttribute("id").substring(7));

        if (event.target.value.length > 0) {
            if (thisIndex == commands.length - 1) {
                newCommandField(thisIndex);
            }
        } else {
            if (thisIndex != commands.length - 1) {
                deleteCommandField(thisIndex);
            }
        }
    });

    field.addEventListener("keyup", function(event) {
        let thisIndex = parseInt(event.target.getAttribute("id").substring(7));

        if (event.key === "Enter") {
            newCommandField(thisIndex);
        }
    });

    field.addEventListener("keyup", function(event) {
        let thisIndex = parseInt(event.target.getAttribute("id").substring(7));

        if (event.key === "Backspace") {
            if(event.target.value.length == 0 && thisIndex != 0) {
                deleteCommandField(thisIndex);
            }
        }
    });

    commands.splice(index + 1, 0, input);
    for (let i = index + 2; i < commands.length; i++) {
        let commandIndex = parseInt(commands[i].getAttribute("id").substring(7)) + 1;
        commands[i].setAttribute("id","command".concat(commandIndex));
    }

    return input;
}

function deleteCommandField(index) {
    if (index == commands.length-1) {
        commands[index].parentElement.remove();
        commands.pop();
    } else {
        commands[index].parentElement.remove();
        commands.splice(index, 1);

        for (let i = index; i < commands.length; i++) {
            let commandIndex = parseInt(commands[i].getAttribute("id").substring(7)) - 1;
            commands[i].setAttribute("id","command".concat(commandIndex));
        }
    }

    setCurrentCommand(commands[commandPointer]);
}

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
},false;

function setCurrentCommand(command) {
    for (com of commands) {
        com.style.backgroundColor = "rgb(223, 223, 223)";
    }
    command.style.backgroundColor = "rgb(144, 238, 144)";
}


// Start
newCommandField(0);
init = false;
