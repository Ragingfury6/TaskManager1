let container = document.querySelector(".container");
let addTaskBtn = document.querySelector(".add-task");
let formSubmitPOST = document.querySelector("button[data-type='POST']");
let formSubmitPUT = document.querySelector("button[data-type='PUT']");
let form = document.querySelector("form");
let dialog = document.querySelector(".dialog");
let dialogNameInput = dialog.querySelector("#name");
let dialogDescriptionInput = dialog.querySelector("#description");
let dialogButtonTypes = Array.from(dialog.querySelectorAll("button"));
let LAST_EDITED_PARENT = null;

const toggleDialogButtonType = (type) => {
  if (type === 0) {
    dialogButtonTypes[0].hidden = false;
    dialogButtonTypes[1].hidden = true;
  } else {
    dialogButtonTypes[1].hidden = false;
    dialogButtonTypes[0].hidden = true;
  }
};
formSubmitPOST.addEventListener("click", async (e) => {
  e.preventDefault();
  let entries = [];
  new FormData(form).forEach((v) => entries.push(v));
  if (entries[0] && entries[1]) {
    dialog.style.setProperty("display", "none");
    dialog.close();
    form.reset();
    let {
      data: { _id, name, description },
    } = await postTask({ name: entries[0], description: entries[1] });
    populateContainerWithCardData({ _id, name, description });
  }
});
formSubmitPUT.addEventListener("click", async (e) => {
  e.preventDefault();
  let entries = [];
  new FormData(form).forEach((v) => entries.push(v));
  if (entries[0] && entries[1]) {
    dialog.style.setProperty("display", "none");
    dialog.close();
    form.reset();
    let {
      data: { _id, name, description },
    } = await updateTask({
      _id: LAST_EDITED_PARENT.getAttribute("data-id"),
      name: entries[0],
      description: entries[1],
    });
    LAST_EDITED_PARENT.querySelector(".card__banner").textContent = name;
    LAST_EDITED_PARENT.querySelector(".card__description").textContent =
      description;
  }
});
function populateContainerWithCardData({ _id, name, description }) {
  let div = document.createElement("div");
  div.innerHTML = `<div class="card pi-6 grid">
    <div class="card__banner grid">${name}</div>
    <div class="card__content">
      <div class="card__description">
        ${description}
      </div>
      <div class="icons">
        <i class="fa-solid fa-trash"></i>
        <i class="fa-solid fa-pen-to-square"></i>
      </div>
    </div>
    </div>`;
  div.setAttribute("data-id", _id);
  container.appendChild(div);
  div
    .querySelector(".fa-trash")
    .addEventListener("click", (e) => onTaskDelete(e));
  div
    .querySelector(".fa-pen-to-square")
    .addEventListener("click", (e) => onTaskUpdate(e));
}
async function loadInitialData() {
  let { data } = await getTasks();
  data.forEach(({ _id, name, description }) => {
    populateContainerWithCardData({ _id, name, description });
  });
}
const getTasks = () => {
  return new Promise(async function (resolve, reject) {
    await fetch("http://localhost:3000/api/")
      .then((res) => res.json())
      .then((tasks) => {
        resolve(tasks);
      })
      .catch((err) => reject(err));
  });
};
const postTask = (data) => {
  return new Promise(async function (resolve, reject) {
    await fetch("http://localhost:3000/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((task) => {
        resolve(task);
      })
      .catch((err) => reject(err));
  });
};
const updateTask = ({ _id, name, description }) => {
  console.log(_id, name, description);
  return new Promise(async function (resolve, reject) {
    await fetch("http://localhost:3000/api/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, name, description }),
    })
      .then((res) => res.json())
      .then((task) => {
        resolve(task);
      })
      .catch((err) => reject(err));
  });
};
const deleteTask = (_id) => {
  return new Promise(async function (resolve, reject) {
    await fetch("http://localhost:3000/api/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    })
      .then((res) => res.json())
      .then((task) => {
        resolve(task);
      })
      .catch((err) => reject(err));
  });
};
const onTaskDelete = async (e) => {
  let parent =
    e.target?.parentElement?.parentElement?.parentElement?.parentElement;
  let deletedTask = await deleteTask(parent.getAttribute("data-id"));
  if (deletedTask) parent.remove();
};
addTaskBtn.addEventListener("click", () => {
  toggleDialogButtonType(0);
  dialog.style.setProperty("display", "block");
  dialog.showModal();
});
const onTaskUpdate = async (e) => {
  toggleDialogButtonType(1);
  dialog.style.setProperty("display", "block");
  dialog.showModal();
  let parent =
    e.target?.parentElement?.parentElement?.parentElement?.parentElement;
  LAST_EDITED_PARENT = parent;
  dialogNameInput.value = parent.querySelector(".card__banner").textContent;
  dialogDescriptionInput.value = parent
    .querySelector(".card__description")
    .textContent.trim();
};
