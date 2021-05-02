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
    "sp": document.getElementById("sp"),

    "disp": document.getElementById("disp"),
}
var allRegInputs = document.querySelectorAll(".register-input-box,.register-input-box2");

// Memory
var memory = {
    "0000": "00"
}
var allMemInputs = document.querySelectorAll(".memory-input-box");

var memName0 = document.getElementById("memory-name0");
var memName1 = document.getElementById("memory-name1");
var memName2 = document.getElementById("memory-name2");
var memName3 = document.getElementById("memory-name3");

// Commands
const inputCommand = document.getElementById("command0");

// Control elements
const execButton = document.getElementById("execButton");