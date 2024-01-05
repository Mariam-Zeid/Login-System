"use strict";

// ? Pages
const SignUpForm = document.querySelector("#SignUpForm");
const loginForm = document.querySelector("#loginForm");

// ? Buttons go through specific pages
const signupLinkBtn = document.querySelector("#signupLink");
const loginLinkBtn = document.querySelector("#loginLink");

// ? Buttons to perform specific actions on elements
const signupBtn = document.querySelector("#signupBtn");

// ? Alerts
const newUserNameAlert = document.querySelector("#newUserNameAlert");
const newUserEmailAlert = document.querySelector("#newUserEmailAlert");
const newUserPasswordAlert = document.querySelector("#newUserPasswordAlert");
const newUserRePasswordAlert = document.querySelector(
  "#newUserRePasswordAlert"
);

// ? User Inputs

// * New User
const newUserNameInput = document.querySelector("#newUserName");
const newUserEmailInput = document.querySelector("#newUserEmail");
const newUserPasswordInput = document.querySelector("#newUserPassword");
const newUserRePasswordInput = document.querySelector("#newUserRePassword");

// ? Validation Variables
let validateUserName;
let validateUserEmail;
let validateUserPassword;
let validateUserRePassword;

// ? Users Array Storage
let users = [];
if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
}

// ? ================================== Transitioning between pages in a dynamic manner. ==================================

// Goes to sign up form
signupLinkBtn.addEventListener("click", function () {
  SignUpForm.classList.remove("d-none");
  loginForm.classList.add("d-none");
});

// Goes to login form
loginLinkBtn.addEventListener("click", function () {
  SignUpForm.classList.add("d-none");
  loginForm.classList.remove("d-none");
});


// ? ================================== Sign Up Validation ==================================


// Each input has its own validation using the same code
function validateSignupInput(regex, inputElement) {
  let isValid = regex.test(inputElement.value);

  if (isValid) {
    inputElement.classList.add("is-valid");
    inputElement.classList.remove("is-invalid");
  } else {
    inputElement.classList.remove("is-valid");
    inputElement.classList.add("is-invalid");
  }
  return isValid;
}

// validate the User name
newUserNameInput.addEventListener("change", function () {
  const regexName = /^[a-zA-Z0-9_]{3,20}$/;
  validateUserName = validateSignupInput(regexName, newUserNameInput); // Returing boolean value

  if (newUserNameInput.value == "") {
    newUserNameAlert.innerText = "Username field can't be empty";
  } else if (!validateUserName) {
    newUserNameAlert.classList.replace("d-none", "d-block");
  }
});

// validate the User email
newUserEmailInput.addEventListener("change", function () {
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  validateUserEmail = validateSignupInput(regexEmail, newUserEmailInput); // Returing boolean value

  if (newUserEmailInput.value == "") {
    newUserEmailAlert.innerText = "Email field can't be empty";
  } else if (!validateUserEmail) {
    newUserEmailAlert.classList.replace("d-none", "d-block");
  }
});

// validate the User password
newUserPasswordInput.addEventListener("change", function () {
  const regexPassword = /^.{8,}$/;
  validateUserPassword = validateSignupInput(
    regexPassword,
    newUserPasswordInput
  ); // Returing boolean value

  if (newUserPasswordInput.value == "") {
    newUserPasswordAlert.innerText = "Password field can't be empty";
  } else if (!validateUserPassword) {
    newUserPasswordAlert.classList.replace("d-none", "d-block");
  }
});

// validate the re-password by the original password
newUserRePasswordInput.addEventListener("change", function () {
  validateUserRePassword =
    newUserPasswordInput.value === newUserRePasswordInput.value ? true : false;

  if (validateUserRePassword) {
    newUserRePasswordInput.classList.add("is-valid");
    newUserRePasswordInput.classList.remove("is-invalid");
  } else if (!validateUserRePassword) {
    newUserRePasswordAlert.classList.replace("d-none", "d-block");
    newUserRePasswordInput.classList.remove("is-valid");
    newUserRePasswordInput.classList.add("is-invalid");
  }
});


// ? ================================== Sign Up ==================================

// If all the inputs have been filled correctly, the user can be added
function validateSignupInputs() {
  let isValid =
    validateUserName &&
    validateUserEmail &&
    validateUserPassword &&
    validateUserRePassword
      ? true
      : false;
  return isValid;
}

// Clearing all the signup input fields.
function clearSignUpForm() {
  newUserNameInput.value = "";
  newUserNameInput.classList.remove("is-valid");

  newUserEmailInput.value = "";
  newUserEmailInput.classList.remove("is-valid");

  newUserPasswordInput.value = "";
  newUserPasswordInput.classList.remove("is-valid");

  newUserRePasswordInput.value = "";
  newUserRePasswordInput.classList.remove("is-valid");
}

// Sign up as a new user
signupBtn.addEventListener("click", function () {
  let newUser = {
    userName: newUserNameInput.value,
    userEmail: newUserEmailInput.value,
    userPassword: newUserPasswordInput.value,
    userRePassword: newUserRePasswordInput.value,
  };

  // Checking if the user is already exist
  let isExist = users.findIndex((user) => user.userEmail === newUser.userEmail);

  // not exist
  if (isExist == -1) {
    // If the inputs are empty, show an alert to the user
    if (
      newUserNameInput.value == "" ||
      newUserEmailInput.value == "" ||
      newUserPasswordInput.value == "" ||
      newUserRePasswordInput.value == ""
    ) {
      alert("All inputs must be filled");
    }

    // Adding a new user to the array and saving it in local storage.
    else if (validateSignupInputs()) {
      users.push(newUser);
      clearSignUpForm();
      console.log(users);
      console.log(isExist);
      localStorage.setItem("users", JSON.stringify(users));
      SignUpForm.classList.add("d-none");
      loginForm.classList.remove("d-none");
      newUserEmailAlert.classList.replace("d-block", "d-none");
    }
  }

  // already exist
  else if (isExist != -1) {
    newUserEmailAlert.innerText = "This email already exists!";
    newUserEmailAlert.classList.replace("d-none", "d-block");
    newUserEmailInput.classList.remove("is-valid");
    newUserEmailInput.classList.add("is-invalid");
  }
});