function signIn() {
  let email = document.getElementById("loginEmail").value
  let password = document.getElementById("loginPassword").value
  let accounts = JSON.parse(localStorage.getItem('accounts'))
  if (accounts) {
    let account = accounts.find(e => e.email === email && e.password === password)
    if (account) {
      localStorage.setItem('loggedIn', JSON.stringify(account))
      alert('Login Success!')
      return true
    }
  }
  alert('Login Failed!\nEmail or Password not found.')
  return false
}

function signOut() {
  if (confirm('Logout?')) {
    localStorage.removeItem('loggedIn')
    alert('Logout Success!')
    window.location.replace(window.location.href)
  }
}

(function () {
  'use strict'

  let forms = document.querySelectorAll('.signin-validation')

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        console.log('Weww');
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          !signIn() && event.preventDefault()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()