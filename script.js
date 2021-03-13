// Register elements
const ah = document.getElementById("ah");
const al = document.getElementById("al");

const bh = document.getElementById("bh");
const bl = document.getElementById("bl");

const ch = document.getElementById("ch");
const cl = document.getElementById("cl");

const dh = document.getElementById("dh");
const dl = document.getElementById("dl");

// Commands container element
const commandsContainer = document.getElementById("commands");

// List of all commands
let commands = [];
let init = true;

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

    field.append(input);
    if(init) {
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
}

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
  },false;

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
setRegister(ah, 12);
newCommandField(0);
init = false;
