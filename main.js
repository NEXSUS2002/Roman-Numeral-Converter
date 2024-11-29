// Wait until the DOM is fully loaded before running the code event
document.addEventListener("DOMContentLoaded", () => {   
    // Define the Roman numerals and their corresponding values
    const numberInput = document.getElementById("number");
    const convertBtn = document.getElementById("convert-btn");
    const clearBtn = document.getElementById("clear-btn");
    const output = document.getElementById("output");
    const themeSwitch = document.getElementById("theme-switch");
    const body = document.body;

    const romanNumerals = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };

    // Function to show error messages in the output element
    function showError(message) {
        output.style.display = "inline-block";
        output.textContent = message;
    }

    // Function to convert the input number into roman numeral
    function convertToRoman() {
        let userInput = numberInput.value.trim();   //Get and trim the input value
        output.style.display = "inline-block";
        output.textContent = "";

        // Validate the input and show error if necessary
        if (!userInput) {
            showError("Please enter a valid number");
            return;
        } else if (isNaN(userInput)) {
            showError("Input should only contain digits");
            return;
        }

        // Convert the input to a number
        userInput = Number(userInput);

        // Use a switch to handle various input errors
        switch (true) {
            case (userInput <= 0):
                showError("Please enter a number greater than or equal to 1");
                return;
            case (userInput > 3999):
                showError("Please enter a number less than or equal to 3999");
                return;
            case (!Number.isInteger(userInput)):
                showError("Please enter a valid integer");
                return;
            default:
                break;
        }

        let romanResult = "";   // Initialize an empty string to build the Roman numeral
        // Loop through the Roman numerals object and build the Roman numeral
        for (const [roman, value] of Object.entries(romanNumerals)) {
            while (userInput >= value) {
                userInput -= value;
                romanResult += roman;
            }
        }

        // Display the result in the output element
        output.textContent = `The Roman numeral for ${numberInput.value} is ${romanResult}`;
    }

    // Function to clear the input and output elements
    function clearOutput() {
        numberInput.value = "";
        output.style.display = "none";
        output.textContent = "";
    }

    // Function to toggle between light and dark themes
    function toggleTheme() {
        body.classList.toggle("dark");
    }

    // Then finally add eventListeners to the buttons and input fields
    convertBtn.addEventListener("click", convertToRoman);
    clearBtn.addEventListener("click", clearOutput);
    numberInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            convertToRoman();
        }
    });
    themeSwitch.addEventListener("change", toggleTheme);
});
