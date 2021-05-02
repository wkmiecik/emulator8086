// Add event listeners to control fields
execButton.addEventListener("click", executeButton)

// Add checking if correct hex value in every register input
for (element of allRegInputs) {
    element.addEventListener("input", checkRegInputForErrors);
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
        input.value = memory[address];

        // Change colors
        if (startAddress == address) {
            input.parentElement.classList.add("lastViewed");
        } else {
            input.parentElement.classList.remove("lastViewed");
        }
    }
}