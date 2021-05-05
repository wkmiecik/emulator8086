// Add event listeners to control fields
execButton.addEventListener("click", executeButton);
randomButton.addEventListener("click", randomReg);
resetRegButton.addEventListener("click", resetReg);
resetDataButton.addEventListener("click", resetData);
resetStackButton.addEventListener("click", resetStack);

// Add checking if correct hex value in every register and memory input
for (element of allRegInputs) {
    element.addEventListener("input", checkRegInputForErrors);
}

// Update memory and stack when value is changed manually
for (element of allMemInputs) {
    element.addEventListener("input", updateMemoryOnInput);
}
for (element of allStackInputs) {
    element.addEventListener("input", updateStackOnInput);
}

function updateMemoryOnInput(event) {
    memory[event.target.parentElement.id] = event.target.value.toLowerCase();
}
function updateStackOnInput(event) {
    stack[event.target.parentElement.id.substring(1)] = event.target.value.toLowerCase();
    viewStackFrom(stackViewAddress);
}


function checkRegInputForErrors(event) {
    let onlyHexNumbers = /[^0-9a-fA-F]+/g;

    if (onlyHexNumbers.test(event.target.value)) {
        event.target.parentElement.classList.add("wrong");
    } else {
        event.target.parentElement.classList.remove("wrong");
    }
}


function viewMemoryFrom(startAddress) {
    startAddress = startAddress.toLowerCase();
    let part0 = startAddress.slice(0, -1) + '0';
    let part1 = (parseInt(part0, 16) + 16).toString(16).padStart(4, '0');
    let part2 = (parseInt(part1, 16) + 16).toString(16).padStart(4, '0');
    let part3 = (parseInt(part2, 16) + 16).toString(16).padStart(4, '0');

    memName0.innerHTML = part0;
    memName1.innerHTML = part1;
    memName2.innerHTML = part2;
    memName3.innerHTML = part3;

    for (input of allMemInputs) {
        let part;
        let address;

        // Get address of this input
        if (input.id[1] == "a") part = part0;
        if (input.id[1] == "b") part = part1;
        if (input.id[1] == "c") part = part2;
        if (input.id[1] == "d") part = part3;
        address = part.slice(0, -1) + input.id[0];
        address = address.toLowerCase();

        // Update its value
        if (memory[address] == undefined) {
            memory[address] = "00";
        }
        input.value = memory[address].toUpperCase();

        // Change colors
        if (startAddress == address) {
            input.parentElement.classList.add("lastViewed");
        } else {
            input.parentElement.classList.remove("lastViewed");
        }

        // Set id of parent to represent address in memory
        input.parentElement.id = address;
    }
}


function viewStackFrom(startAddress) {
    startAddress = startAddress.toLowerCase();
    let part0 = startAddress.slice(0, -1) + '0';
    let part1 = (parseInt(part0, 16) + 16).toString(16).padStart(4, '0');
    let part2 = (parseInt(part1, 16) + 16).toString(16).padStart(4, '0');
    let part3 = (parseInt(part2, 16) + 16).toString(16).padStart(4, '0');

    stackName0.innerHTML = part0;
    stackName1.innerHTML = part1;
    stackName2.innerHTML = part2;
    stackName3.innerHTML = part3;

    for (input of allStackInputs) {
        let part;
        let address;

        // Get address of this input
        if (input.id[2] == "a") part = part0;
        if (input.id[2] == "b") part = part1;
        if (input.id[2] == "c") part = part2;
        if (input.id[2] == "d") part = part3;
        address = part.slice(0, -1) + input.id[1];
        address = address.toLowerCase();

        // Update its value
        if (stack[address] == undefined) {
            stack[address] = "00";
        }
        input.value = stack[address].toUpperCase();

        // Set id of parent to represent address in memory
        input.parentElement.id = "s" + address;

        // Change colors
        if (registers["sp"].value.toLowerCase() == address) {
            input.parentElement.classList.add("lastViewed");
        } else {
            input.parentElement.classList.remove("lastViewed");
        }
    }
}

viewMemoryFrom("0000");
viewStackFrom("0000");