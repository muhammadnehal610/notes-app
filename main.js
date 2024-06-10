let loginPage = document.getElementById("login_container");
let home_container = document.getElementById("home_container");
let email = document.getElementById("email");
let password = document.getElementById("password");
let userEmail = document.getElementById("user_email");
let note = document.getElementById("note");
let list = document.getElementById("list");

function loginUser() {
  if (!email.value || !password.value) {
    return alert("Invalid password or email");
  }

  localStorage.setItem("email", JSON.stringify(email.value));
  cheackUserIsLogin();
  displayUserNotes();
}
function cheackUserIsLogin() {
  let email = localStorage.getItem("email");
  console.log(email);
  if (email) {
    home_container.style.display = "block";
    loginPage.style.display = "none";
  } else {
    loginPage.style.display = "block";
    home_container.style.display = "none";
  }
  userEmail.innerText = email;
  displayUserNotes();
}
cheackUserIsLogin();

function logout() {
  localStorage.removeItem("email");
  email.value = "";
  password.value = "";
  cheackUserIsLogin();
}

function submitNote() {
  let email = localStorage.getItem("email");
  let obj = {
    email: email,
    note: note.value,
  };
  saveValueToLocalStorage(obj);
  note.value = "";
}
function saveValueToLocalStorage(obj) {
  let notes = localStorage.getItem("notes");
  if (notes) {
    notes = JSON.parse(notes);
    console.log(notes);
    notes.push(obj);
    localStorage.setItem("notes", JSON.stringify(notes));
  } else {
    notes = [obj];
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  displayUserNotes();
}
function displayUserNotes() {
  let notes = localStorage.getItem("notes");
  if (notes) {
    list.innerHTML = "";
    notes = JSON.parse(notes);
    notes.forEach(function (data, index) {
      console.log(data.email);
      let email = localStorage.getItem("email");
      console.log(email);
      if (data.email === email) {
        let liElement = `<li class="border rounded p-2 my-2"><p>${data.email}</p> ${data.note}</li>`;
        list.innerHTML += liElement;
      }
    });
  }
}
displayUserNotes();
