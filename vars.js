// Register elements
const registers = {
    "ah": document.getElementById("ah"),
    "al": document.getElementById("al"),
    "bh": document.getElementById("bh"),
    "bl": document.getElementById("bl"),
    "ch": document.getElementById("ch"),
    "cl": document.getElementById("cl"),
    "dh": document.getElementById("dh"),
    "dl": document.getElementById("dl")
}

// Commands container element
const commandsContainer = document.getElementById("commands");

// List of all commands
let commandPointer = 0;
let commands = [];
let init = true;

// Control elements
const nextStepButton = document.getElementById("nextStepButton");
//const backStepButton = document.getElementById("stepBackButton");