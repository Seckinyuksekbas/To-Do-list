const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.querySelector(".add-button");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
    return;
  }
  const li = document.createElement("li");
  li.textContent = inputBox.value;
  addCloseButton(li);
  listContainer.appendChild(li);
  inputBox.value = "";
  saveData();
}

function addCloseButton(li) {
  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);
}

addButton.addEventListener("click", addTask);

inputBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function displayData() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
  const listItems = listContainer.getElementsByTagName("li");

  for (const li of listItems) {
    addCloseButton(li);
  }
}

displayData();
