const inputs = document.querySelectorAll("input");
let errors = {
  first_last: [],
  user_name: [],
  email: [],
  password: [],
  repeat_password: [],
};

inputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    let inputEl = e.target;
    let inputValue = inputEl.value;
    let inputName = inputEl.getAttribute("name");

    if (inputValue.length > 4) {
      errors[inputName] = [];
      switch (inputName) {
        case "first_last":
          let validation = inputValue.trim();
          validation = validation.split(" ");
          console.log(validation.length);
          if (validation.length < 2) {
            errors[inputName].push("You must include your first and last name");
          }
          break;
        case "email":
          if (!ValidateEmail(inputValue)) {
            errors[inputName].push("email address is wrong");
          }
          break;
          case "repeat_password":
              let password = document.querySelector(`input[name="password"]`).value
              console.log(password);
              if (inputValue !== password) {
                  errors[inputName].push("passwords did not match")
              }
      }
    } else {
      errors[inputName] = ["Input can not have less than 4 characters"];
    }

    populateErrors();
  });
});

function populateErrors() {
  for (let element of document.querySelectorAll("ul")) {
    element.remove();
  }
  for (let key of Object.keys(errors)) {
    let input = document.querySelector(`input[name="${key}"]`);
    let parentElement = input.parentElement;
    let ul = document.createElement("ul");
    parentElement.append(ul);

    errors[key].forEach((error) => {
      let li = document.createElement("li");
      li.innerText = error;
      ul.append(li);
    });
  }
}

function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
}
