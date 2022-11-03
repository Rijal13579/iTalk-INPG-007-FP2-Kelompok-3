let formatSpecial = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
let formatEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let formatCondition = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;

let usernameSignUpListener = document.getElementById('signUpUsername');
let emailSignUpListener = document.getElementById('signUpEmail');
let password1SignUpListener = document.getElementById('signUpPassword1');
let password2SignUpListener = document.getElementById('signUpPassword2');

usernameSignUpListener.addEventListener('keyup', () => {
  let usernameSigUp = usernameSignUpListener.value;
  let validateLength = usernameSigUp.length >= 5 && usernameSigUp.length <= 10;
  let validateNoSpecial = !formatSpecial.test(usernameSigUp);
  let message = '';
  message += validateLength ? '' : 'Username kurang dari 5 atau lebih dari 10 karakter';
  message += validateLength || validateNoSpecial ? '' : '<br>';
  message += validateNoSpecial ? '' : 'Username tidak boleh mengandung spasi atau karakter spesial';

  if (message) {
    usernameSignUpListener.setCustomValidity(message);
    document.getElementById('usernameFeedback').innerHTML = message;
  } else {
    usernameSignUpListener.setCustomValidity('');
    document.getElementById('usernameFeedback').innerHTML = '';
  }
});

emailSignUpListener.onkeyup = () => {
  let validateEmail = emailSignUpListener.value.match(formatEmail);

  let message = validateEmail ? '' : 'Format email tidak sesuai';
  if (message) {
    emailSignUpListener.setCustomValidity(message);
    document.getElementById('emailFeedback').innerHTML = message;
  } else {
    emailSignUpListener.setCustomValidity('');
    document.getElementById('emailFeedback').innerHTML = '';
  }
};

password1SignUpListener.onkeyup = () => {
  let password1SignUp = password1SignUpListener.value;
  let validateLength = password1SignUp.length >= 6 && password1SignUp.length <= 12;
  let validateCondition = formatCondition.test(password1SignUp);
  let validateNoSpecial = !formatSpecial.test(password1SignUp);

  let message = '';
  message += validateLength ? '' : 'Password kurang dari 6 atau lebih dari 12 karakter';
  message += validateLength || validateCondition ? '' : '<br>';
  message += validateCondition ? '' : 'Password minimal harus mengandung 1 huruf kecil, 1 huruf besar, dan 1 angka';
  message += validateCondition || validateNoSpecial ? '' : '<br>';
  message += validateNoSpecial ? '' : 'Password tidak boleh mengandung spasi atau karakter spesial';

  console.log(message);
  if (message) {
    password1SignUpListener.setCustomValidity(message);
    document.getElementById('password1Feedback').innerHTML = message;
  } else {
    password1SignUpListener.setCustomValidity('');
    document.getElementById('password1Feedback').innerHTML = '';
  }
};

password2SignUpListener.onkeyup = () => {
  let password2SignUp = password2SignUpListener.value;
  let validateSimiliar = password2SignUp === password1SignUpListener.value;

  let message = validateSimiliar ? '' : 'Password tidak sama';
  if (message) {
    password2SignUpListener.setCustomValidity(message);
    document.getElementById('password2Feedback').innerHTML = message;
  } else {
    password2SignUpListener.setCustomValidity('');
    document.getElementById('password2Feedback').innerHTML = '';
  }
};

(function () {
  'use strict';
  let forms = document.querySelectorAll('.signup-validation');

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      'submit',
      function (event) {
        console.log('Weww');
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          if (!confirm('Data sudah benar?')) event.preventDefault();
          else {
            event.preventDefault();
            let username = usernameSignUpListener.value;
            let email = emailSignUpListener.value;
            let password = password1SignUpListener.value;
            let accounts = JSON.parse(localStorage.getItem('accounts'));
            let updated = false;
            if (!accounts) accounts = [{ username, email, password }];
            else {
              accounts = accounts.map((e) => {
                if (e.email === email) {
                  updated = true;
                  return { ...e, username, password };
                }
                return e;
              });
              !updated && accounts.push({ username, email, password });
            }
            localStorage.setItem('accounts', JSON.stringify(accounts));
            alert(updated ? 'Account has been updated!' : 'Sign Up Success!');
            window.location.replace(window.location.href);
          }
        }

        form.classList.add('was-validated');
      },
      false
    );
  });
})();
