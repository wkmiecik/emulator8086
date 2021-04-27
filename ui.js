// TODO: Add event listeners to register inputs (red if incorrrect char)

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