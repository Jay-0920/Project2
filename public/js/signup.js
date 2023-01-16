$(document).ready(function () {
  const signUpForm = $("form.signup");
  const usernameInput = $("input#userName-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  signUpForm.on("submit", function (event) {
    event.preventDefault();

    const userData = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!usernameInput || !userData.email || !userData.password) {
      return;
      // TODO: Add a modal to display error message
    }

    signUpUser(userData.username, userData.email, userData.password);
    usernameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  function signUpUser(username, email, password) {
    $.post("/api/signup", {
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