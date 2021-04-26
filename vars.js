// Register elements
const registers = {
    "ah": document.getElementById("ah"),
    "al": document.getElementById("al"),
    "bh": document.getElementById("bh"),
    "bl": document.getElementById("bl"),
    "ch": document.getElementById("ch"),
    "cl": document.getElementById("cl"),
    "dh": document.getElementById("dh"),
    "dl": document.getElementById("dl"),

    "ax": document.getElementById("al"),
    "bx": document.getElementById("bl"),
    "cx": document.getElementById("cl"),
    "dx": document.getElementById("dl"),

    "bp": document.getElementById("bp"),
    "si": document.getElementById("si"),
    "di": document.getElementById("di"),
    "sp": document.getElementById("sp")
}

// Memory
var memory = {
    
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