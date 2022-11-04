var logout = () => {};
let loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
if (loggedIn) {
  logout = () => {
    localStorage.removeItem('loggedIn');
  };
  let oneMin = 60 * 1000;
  let loggedInDisplay = document.getElementById('loggedIn');
  loggedInDisplay.getElementsByTagName('button')[0].innerHTML = loggedIn.username;
  document.getElementById('loggedOut').style.display = 'none';
  loggedInDisplay.style.display = 'block';
  setTimeout(() => {
    localStorage.removeItem('loggedIn');
    window.location.replace(window.location.origin);
  }, oneMin * 3);
}

hide_on_scroll({
  nav_id: 'demo1Navbar',
  hide_onscroll_mobile: true,
  nav_offset: 256,
});
