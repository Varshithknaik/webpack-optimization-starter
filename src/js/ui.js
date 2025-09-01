import * as styles from "../styles/notification.module.css";

export function renderTodos(todos) {
  const renderedItemArray = todos.map(function (todo) {
    const className = todo.completed ? "completed" : "";
    const completionClass = todo.completed ? "checked" : "";
    return `
            <li data-id="${todo.id}" class="${className}">
                <span class="custom-checkbox">
                    <img class="check" src="../images/checkmark.svg" width="22" height="22"></img>
                    <input class="real-checkbox" type="checkbox" ${completionClass} />
                </span>
                <label>${todo.text}</label>
                <span class="delete"></span>
            </li>
        `;
  });
  document.querySelector(".todo-list").innerHTML = renderedItemArray.join("");
}

export function clearNewTodoInput() {
  document.querySelector(".new-todo").value = "";
  showNotification();
}

export function getTodoId(element) {
  return parseInt(
    element.dataset.id ||
      element.parentNode.dataset.id ||
      element.parentNode.parentNode.dataset.id,
    10
  );
}

function showNotification() {
  const notificationDiv = document.createElement("div");
  notificationDiv.classList.add("alert", "alert-success", styles.notification);
  notificationDiv.setAttribute("role", "alert");
  notificationDiv.innerHTML = "Todo Item Added";
  document.body.appendChild(notificationDiv);
  // notificationDiv.className = styles.notification;
  // notificationDiv.textContent = 'Todo Item Added';
  // document.body.appendChild(notificationDiv);

  setTimeout(() => {
    notificationDiv.remove();
  }, 2000);
}
