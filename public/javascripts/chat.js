const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const usernameInput = document.getElementById("inputUsername");
const messages = document.getElementById("messages");

var getNick = localStorage.getItem("chatNick");
function retrieveNick() {
  if (getNick) {
    usernameInput.value = getNick;
  } else {
    usernameInput.value = "";
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (usernameInput.value && input.value) {
    if (!getNick || getNick != usernameInput.value) {
      localStorage.setItem("chatNick", usernameInput.value);
    }
    socket.emit(
      "chat message",
      "<span style='color: #F05454;'>" +
        usernameInput.value +
        ":</span> " +
        input.value
    );
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const messageBox = document.createElement("div");
  messageBox.classList.add("message-box");

  const messageText = document.createElement("p");
  messageText.innerHTML = msg;
  messageBox.appendChild(messageText);
  messages.appendChild(messageBox);
  messages.scrollTo(0, document.body.scrollHeight);
});
