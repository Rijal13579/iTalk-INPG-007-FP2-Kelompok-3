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