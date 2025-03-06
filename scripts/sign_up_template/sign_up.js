/**
 * Validates the provided name by checking if it contains at least two words.
 * @param {string} name - The full name to validate.
 * @returns {boolean} True if the name contains at least two words, otherwise false.
 */
function validateName(name) {
    return name.trim().split(" ").length >= 2;
}

/**
 * Validates the provided email by checking if it contains "@" and ".".
 * @param {string} email - The email to validate.
 * @returns {boolean} True if the email is valid, otherwise false.
 */
function validateEmail(email) {
    return email.includes("@") && email.includes(".");
}

/**
 * Validates the provided password by checking length and matching the confirm password.
 * @param {string} pass - The password to validate.
 * @param {string} confirm - The confirmation password.
 * @returns {boolean} True if the password is at least 6 characters and matches the confirm password, otherwise false.
 */
function validatePassword(pass, confirm) {
    return pass.length >= 6 && pass === confirm;
}

/**
 * Checks if the checkbox (with id "logInCheckbox") is checked based on its src attribute.
 * @returns {boolean} True if the checkbox is checked, otherwise false.
 */
function isCheckboxChecked() {
    return document.getElementById("logInCheckbox").src.includes("checkboxChecked.svg");
}

/**
 * Displays an error message by removing the 'hide-alert-message' class.
 * @param {string} id - The ID of the element that displays the error message.
 */
function showError(id) {
    document.getElementById(id).classList.remove('hide-alert-message');
}

/**
 * Hides an error message by adding the 'hide-alert-message' class.
 * @param {string} id - The ID of the element that displays the error message.
 */
function hideError(id) {
    document.getElementById(id).classList.add('hide-alert-message');
}

/**
 * Handles user registration by validating inputs, checking the checkbox state, 
 * verifying if the email already exists, and adding the user to the database.
 * Displays success or error messages accordingly.
 * @async
 */
async function registerUser() {
    let userName = document.getElementById("userName").value;
    let userEmail = document.getElementById("userEmail").value;
    let userPassword = document.getElementById("userPassword").value;
    let confirmPassword = document.getElementById("userPasswordConfirmed").value;
    
    if (!validateInputs(userName, userEmail, userPassword, confirmPassword)) return;
    if (!isCheckboxChecked()) return blinkCheckbox();
    
    try {
        await getUsersData();
        if (isEmailExists(userEmail)) return showError('alertMessageEmailExists');
        let newUser = createUser(userName, userEmail, userPassword);
        await addUserToDatabase(newUser);
        showSuccessMessage();
    } catch (error) {
        console.error("Error during registration:", error);
    }
}

/**
 * Adds a new user to the database via a PUT request.
 * @async
 * @param {Object} user - The user object containing user details.
 * @throws Will throw an error if the response is not OK (response.ok === false).
 */
async function addUserToDatabase(user) {
    try {
        const databaseUrl = `https://join-67494-default-rtdb.europe-west1.firebasedatabase.app/users/${user.id}.json`;
        const response = await fetch(databaseUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        if (!response.ok) throw new Error("Error saving to database");
    } catch (error) {
        console.error("Error in addUserToDatabase:", error);
        throw error;
    }
}

/**
 * Validates user input for name, email, password, and confirm password fields.
 * Displays and hides error messages as needed.
 * @param {string} name - The user's full name.
 * @param {string} email - The user's email address.
 * @param {string} pass - The user's password.
 * @param {string} confirm - The confirm password input.
 * @returns {boolean} True if all inputs are valid, otherwise false.
 */
function validateInputs(name, email, pass, confirm) {
    if (!validateName(name)) return showError('alertMessageName'), false;
    if (!validateEmail(email)) return showError('alertMessageEmail'), false;
    if (!validatePassword(pass, confirm)) return showError('alertMessagePassword'), false;
    hideError('alertMessageName');
    hideError('alertMessageEmail');
    hideError('alertMessagePassword');
    return true;
}

/**
 * Checks if a given email already exists in the users object.
 * @param {string} email - The email to check against existing users.
 * @returns {boolean} True if the email already exists, otherwise false.
 */
function isEmailExists(email) {
    return Object.values(users.users || {}).some(user => user.email.toLowerCase() === email.toLowerCase());
}

/**
 * Creates a user object based on provided name, email, and password.
 * @param {string} name - The full name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The user's password.
 * @returns {Object} The new user object.
 */
function createUser(name, email, password) {
    let parts = name.trim().split(" ");
    return {
        id: `user_${Date.now()}`,
        firstName: capitalize(parts[0]),
        lastName: capitalize(parts.slice(1).join(" ")),
        email: email.toLowerCase(),
        password,
        contacts: {},
        tasks: {}
    };
}

/**
 * Capitalizes the first letter of a string and converts the rest to lowercase.
 * @param {string} str - The string to transform.
 * @returns {string} The capitalized string.
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Displays a success message overlay and redirects to login.html after a delay.
 */
function showSuccessMessage() {
    document.getElementById("successSignUpOverlay").classList.remove("d-none");
    setTimeout(() => window.location.href = "login.html", 2250);
}

/**
 * Toggles the checkbox image (checked/unchecked).
 */
function toggleCheckbox() {
    let checkbox = document.getElementById("logInCheckbox");
    checkbox.src = checkbox.src.includes("checkboxEmpty.svg") ? "./assets/img/checkboxChecked.svg" : "./assets/img/checkboxEmpty.svg";
}

/**
 * Blinks the 'rememberMeSection' to draw attention if the checkbox is not checked.
 */
function blinkCheckbox() {
    let section = document.getElementById('rememberMeSection');
    let count = 6;
    let interval = setInterval(() => {
        section.classList.toggle('d-none');
        if (--count <= 0) clearInterval(interval);
    }, 250);
}

/**
 * Updates the eye (visibility) icon based on whether the input field has a value.
 * If there is a value, shows the 'visibility_off' icon and attaches the toggle click event.
 * Otherwise, shows the lock icon.
 * @param {string} inputId - The ID of the password input field.
 * @param {string} imgId - The ID of the image element representing the visibility icon.
 */
function showClosedEyeImg(inputId, imgId) {
    let input = document.getElementById(inputId);
    let img = document.getElementById(imgId);
    img.src = input.value ? "./assets/img/visibility_off.svg" : "./assets/img/lock.svg";
    img.onclick = input.value ? () => togglePasswordVisibility(inputId, imgId) : null;
}

/**
 * Toggles the visibility of the password input and updates the icon accordingly.
 * @param {string} inputId - The ID of the password input field.
 * @param {string} imgId - The ID of the icon element.
 */
function togglePasswordVisibility(inputId, imgId) {
    let input = document.getElementById(inputId);
    let img = document.getElementById(imgId);
    let isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    img.src = isPassword ? "./assets/img/visibility.svg" : "./assets/img/visibility_off.svg";
}

/**
 * Renders the sign-up content into the element with id 'content'.
 */
function renderSignUpContent() {
    document.getElementById('content').innerHTML = getSignUpContent();
}
