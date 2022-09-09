let container = document.querySelector(".container");
let addTaskBtn = document.querySelector(".add-task");

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
const postTask = () => {
  return new Promise(async function (resolve, reject) {
    let data = {
      name: "SUPER AWESOME123",
      description: "lorem ipsum dolor sit amet",
    };
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
addTaskBtn.addEventListener("click", async () => {
  let {
    data: { _id, name, description },
  } = await postTask();
  populateContainerWithCardData({ _id, name, description });
});
