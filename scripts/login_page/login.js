// Counter for failed login attempts
let loginAttempts = 0;

// Loads user data initially
getUsersData();


/**
 * Validates the login input fields.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {boolean} Returns true if valid, false otherwise.
 */
function validateLoginInput(email, password) {
  return email.trim() !== "" && password.trim() !== "";
}

 
/**
 * Finds a user by email and password.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Object|null} Returns the user object if found, otherwise null.
 */
function findUserByEmailAndPassword(email, password) {
  return Object.values(users.users).find(
    user => user.email === email && user.password === password
  ) || null;
}

 
/**
 * Handles a failed login attempt by showing error messages and blinking effect.
 */
function handleFailedLogin() {
  loginAttempts++; let eM=document.getElementById('alertMessageEmail'),
  eF=document.getElementById('emailInputField'),pF=document.getElementById('passwordInputField');
  [eF,pF].forEach(el=>el.classList.add('border-col'));
  if(loginAttempts===1) eM.classList.remove('hide-alert-message');
  else {
    let c=6,i=setInterval(()=>{ eM.classList.toggle('hide-alert-message');
      if(--c<=0){clearInterval(i);eM.classList.remove('hide-alert-message');}
    },200);
  }
}


/**
 * Handles a successful login by storing user data and redirecting.
 * @param {Object} user - The logged-in user.
 */
function handleSuccessfulLogin(user) {
  localStorage.setItem('currentUserId', user.id);
  window.location.href = 'summary.html';
}

 
/** Main login function. */
function login() {
  let e=document.getElementById('email').value,p=document.getElementById('password').value;
  if(!validateLoginInput(e,p)){handleFailedLogin();return;}
  let u=findUserByEmailAndPassword(e,p);
  if(!u) handleFailedLogin(); else handleSuccessfulLogin(u);
}


/**
 * Updates the password lock image based on user input.
 */
function updatePasswordLockImg() {
  let passwordInput = document.getElementById('password').value;
  let passwordLockImg = document.getElementById('passwordLockImg');
  if(passwordInput.length===0){
    passwordLockImg.src="./assets/img/lock.svg";
    passwordLockImg.onclick=null;
  } else {
    passwordLockImg.src="./assets/img/visibility_off.svg";
    passwordLockImg.onclick=togglePasswordVisibility;
  }
}

 
/**
 * Toggles the visibility of the password input field.
 */
function togglePasswordVisibility() {
  let passwordInput = document.getElementById('password');
  let passwordLockImg = document.getElementById('passwordLockImg');
  if(passwordInput.type==="password"){
    passwordInput.type="text";
    passwordLockImg.src="./assets/img/visibility.svg";
  } else {
    passwordInput.type="password";
    passwordLockImg.src="./assets/img/visibility_off.svg";
  }
}

 
/**
 * Renders the login content into the designated container.
 */
function renderLoginContent() {
  document.getElementById('content').innerHTML = getLoginContent();
}


/**
 * Logs in as a guest user by setting the user ID in local storage
 * and redirecting to the summary page.
 */
function guestLogin() {
  let guestUser = users.users["guest_user"];

  // Proceed only if the guest user exists in the database
  if (guestUser) {
      localStorage.setItem('currentUserId', guestUser.id);
      window.location.href = 'summary.html';
  } else {
      console.error("Guest user not found in the database.");
  }
}
