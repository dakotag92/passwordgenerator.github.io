const psswdLengthSlider = document.getElementById("passwordLength");
const psswdLengthValue = document.getElementById("passwordLengthValue");
const psswdBtn = document.getElementById("psswd-btn");
const numberInput = document.getElementById("numberInput");
const includeUpperCase = document.getElementById("includeUppercase");
const includeLowerCase = document.getElementById("includeLowercase");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const passwordStrengthMeter = document.getElementById("passwordStrengthMeter");

function evaluatePasswordStrength(password) {
  const strength = {
    score: 0,
    length: password.length,
    hasLowerCase: /[a-z]/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    hasNumbers: /[0-9]/.test(password),
    hasSymbols: /[^a-zA-Z0-9]/.test(password),
  };

  if (strength.length >= 8) {
    strength.score += 2;
  } else if (strength.length >= 6) {
    strength.score += 1;
  }

  if (strength.hasLowerCase) strength.score += 1;
  if (strength.hasUpperCase) strength.score += 1;
  if (strength.hasNumbers) strength.score += 1;
  if (strength.hasSymbols) strength.score += 1;

  return strength;
}

function generateRandomPassword(length, options) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?/";

  let charset = "";
  if (options.includeLowerCase) charset += lowercase;
  if (options.includeUpperCase) charset += uppercase;
  if (options.includeNumbers) charset += numbers;
  if (options.includeSymbols) charset += symbols;

  //If no option is selected, return an empty string
  if (!charset) return "";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

psswdLengthSlider.addEventListener("input", () => {
  psswdLengthValue.textContent = psswdLengthSlider.value;
});

let psswdForm = document.getElementById("psswd-form");
psswdForm.addEventListener("input", (e) => {
  e.preventDefault();
});

psswdBtn.addEventListener("click", () => {
  const passwordLength = parseInt(psswdLengthSlider.value);

  const options = {
    includeLowerCase: includeLowerCase.checked,
    includeUpperCase: includeUpperCase.checked,
    includeNumbers: includeNumbers.checked,
    includeSymbols: includeSymbols.checked,
  };
  const randomPassword = generateRandomPassword(passwordLength, options);
  numberInput.value = randomPassword;
  const strength = evaluatePasswordStrength(randomPassword);
  passwordStrengthMeter.value = strength.score * 20;
});

const copyBtn = document.querySelector(".copy-icon");
copyBtn.addEventListener("click", () => {
  numberInput.select();
  document.execCommand("copy");
});
