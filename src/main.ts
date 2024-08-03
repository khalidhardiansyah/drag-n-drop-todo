let activities = [
  {
    id: 1,
    activity: "memancing",
    isDone: true,
  },
  {
    id: 2,
    activity: "bersepeda",
    isDone: false,
  },
  {
    id: 3,
    activity: "berlari",
    isDone: true,
  },
  {
    id: 4,
    activity: "membaca buku",
    isDone: false,
  },
  {
    id: 5,
    activity: "berkebun",
    isDone: true,
  },
];

let id: number = 6;

const inputValue = document.getElementById("todo");

const btnSubmit = document.getElementById("submit");

const todolistEl = document.querySelector(".list_todo");
const donelistEl = document.querySelector(".list_done");

function renderList() {
  todolistEl.innerHTML = "";
  donelistEl.innerHTML = "";

  activities.forEach((activity, index) => {
    if (activity.isDone === false) {
      const child = document.createElement("div");
      const btn = document.createElement("button");
      btn.innerText = "delete";
      btn.classList.add("bg-black", "font-bold","btn","px-3", "py-2","rounded-md");
      child.classList.add(
        "cursor-pointer",
        "bg-red-500",
        "text-center",
        "py-3",
        "uppercase",
        "rounded-md",
        "text-white",
        "flex",
        "justify-between",
        "items-center",
        "px-4"

      );
      child.setAttribute("draggable", "true");
      child.textContent = activity.activity;
      child.dataset.id = activity.id;
      child.appendChild(btn);
      todolistEl?.appendChild(child);
    } else {
      const child = document.createElement("div");
      child.classList.add(
        "bg-green-500",
        "text-center",
        "py-3",
        "uppercase",
        "rounded-md",
        "text-white"
      );
      child.textContent = activity.activity;
      donelistEl?.appendChild(child);
    }
  });
}

function itemEvent() {
  const listodo = document.querySelectorAll(".list_todo > div");
  listodo.forEach((item) => {
    item.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("item", e.target.dataset.id);
    });
  });
}

donelistEl?.addEventListener("dragover", function (e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
});

donelistEl?.addEventListener("drop", function (e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("item");
  const item = document.querySelector(`div[data-id='${data}']`);
  item?.removeAttribute("class");
  item?.removeAttribute("draggable");
  item?.removeAttribute("data-id");
  activities[parseInt(data) - 1].isDone = true;

  item.classList.add(
    "bg-green-500",
    "text-center",
    "py-3",
    "uppercase",
    "rounded-md",
    "text-white"
  );

  donelistEl.appendChild(item);

  if (todolistEl.childElementCount <= 0) {
    const child = document.createElement("div");
    child.classList.add("text-center", "font-medium");
    child.textContent = "To Do kosong";
    todolistEl?.appendChild(child);
  }
});

renderList();
itemEvent();

btnSubmit?.addEventListener("click", function () {
  if (inputValue.value) {
    let data = {
      id: id++,
      activity: inputValue.value,
      isDone: false,
    };
    activities.push(data);
    inputValue.value = null;
    renderList();
    itemEvent();
  } else {
    alert("tidak boleh kosong");
  }
});


const deletebtn = document.querySelectorAll("div > .btn")
deletebtn.forEach((btn)=>{
  btn.addEventListener("click", function (e) {
   todolistEl?.removeChild(btn.parentElement)
   if (todolistEl.childElementCount <= 0) {
    const child = document.createElement("div");
    child.classList.add("text-center", "font-medium");
    child.textContent = "To Do kosong";
    todolistEl?.appendChild(child);
  }
  })
})
