$(document).ready(function () {
  const loginForm = $("form.login");
  const usernameInput = $("input#userName-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  loginForm.on("submit", function (event) {
    event.preventDefault();

    const userData = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!usernameInput || !userData.email || !userData.password) {
      // Todo: Add a modal to display error message
      return;
    }

    loginUser(userData.username, userData.email, userData.password);
    usernameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  function loginUser(username, email, password) {
    $.post("/api/login", {
      username: username,
      email: email,
      password: password
    })
      .then(function () {
        window.location.replace("/");
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});