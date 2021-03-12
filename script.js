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

function newCommandField() {
    field = document.createElement("div");
    field.className = "command-field";

    input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("class","command-field-input-box");
    let commandIndex = commands.length;
    input.setAttribute("id","command".concat(commandIndex));
    input.setAttribute("maxlength","64");
    input.setAttribute("size","30%");
    input.setAttribute("autocomplete","off");
    input.setAttribute("spellcheck","false");

    field.append(input);
    commandsContainer.append(field);

    field.addEventListener('input', (e)=>{
        let index = parseInt(e.target.getAttribute("id").substring(7));

        if (e.target.value.length > 0) {
            if (index == commands.length-1) {
                newCommandField();
            }
        } else {
            if (index != commands.length-1) {
                deleteCommandField(index);
            }
        }
    });

    commands.push(input);
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
            let commandIndex = parseInt(commands[i].getAttribute("id").substring(7))-1;
            commands[i].setAttribute("id","command".concat(commandIndex));
        }
    }
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



setRegister(ah, 12);
newCommandField();