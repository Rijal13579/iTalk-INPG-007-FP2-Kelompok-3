

let formatSpecial = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

let usernameSignUpListener = document.getElementById("signUpUsername")

usernameSignUpListener.addEventListener('keyup', (event) => {
  let usernameSigUp = usernameSignUpListener.value
  let validateLength = usernameSigUp.length >= 5 && usernameSigUp.length <= 10
  let validateNoSpecial = !formatSpecial.test(usernameSigUp)
  let message = '';
  message += validateLength ? '' : 'Username kurang dari 5 atau lebih dari 10 karakter'
  message += validateLength || validateNoSpecial ? '' : '<br>'
  message += validateNoSpecial ? '' : 'Username tidak boleh mengandung spasi atau karakter spesial'

  if (message) {
    usernameSignUpListener.setCustomValidity(message)
    document.getElementById("usernameFeedback").innerHTML = message
  } else {
    usernameSignUpListener.setCustomValidity('')
    document.getElementById("usernameFeedback").innerHTML = ''
  }
})

(function () {
  'use strict'
  let forms = document.querySelectorAll('.signup-validation')

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        console.log('Weww');
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          if (!confirm('Data sudah benar?')) event.preventDefault()
          else {
            event.preventDefault()
            let username = usernameSignUpListener.value
            let email = emailSignUpListener.value
            let password = password1SignUpListener.value
            let accounts = JSON.parse(localStorage.getItem('accounts'))
            let updated = false
            if (!accounts) accounts = [
              { username, email, password }
            ]
            else accounts = accounts.map(e => {
              if (e.email === email) {
                updated = true
                return { ...e, username, password }
              }
              return e
            })
            !updated && accounts.push({ username, email, password })
            localStorage.setItem('accounts', JSON.stringify(accounts))
            alert(updated ? 'Account has been updated!' : 'Sign Up Success!')
            window.location.replace(window.location.href)
          };
        }

        form.classList.add('was-validated')
      }, false)
    })
})()