import * as styles from "../styles/notification.module.css";
import jss from "jss";
import preset from "jss-preset-default";
import CheckboxImage from "../../images/checkmark.svg";
import { getMotivationalPictures } from "./api";

jss.setup(preset());

const checkboxSize = "30px";

const jssStyles = {
  realCheckbox: {
    width: checkboxSize,
    height: checkboxSize,
    cursor: "pointer",
    opacity: 0,
    position: "absolute",
    top: "-3px",
    left: "-5px",
  },
};

const { classes } = jss.createStyleSheet(jssStyles).attach();

export function renderTodos(todos) {
  const renderedItemArray = todos.map(function (todo) {
    const className = todo.completed ? "completed" : "";
    const completionClass = todo.completed ? "checked" : "";
    return `
            <li data-id="${todo.id}" class="${className}">
                <span class="custom-checkbox">
                    <img class="check" src="${CheckboxImage}" width="22" height="22"></img>
                    <input data-element="real-checkbox" class="${classes.realCheckbox}" type="checkbox" ${completionClass} />
                </span>
                <label>${todo.text}</label>
                <span class="delete"></span>
            </li>
        `;
  });
  document.querySelector(".todo-list").innerHTML = renderedItemArray.join("");
  renderMotivationalPicture();
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

function renderMotivationalPicture() {
  getMotivationalPictures().then((pictures) => {
    const motivationalPicturesHtml = `
            <div class="motivational-pictures"> 
             ${pictures.map((picture) => {
               return (
                 '<img class="header-image" src="' +
                 picture +
                 '" alt="motivational"/>'
               );
             })}
        `;

    const motivationalPicturesContainer = document.querySelector(
      ".motivational-pictures-container"
    );
    motivationalPicturesContainer.innerHTML = motivationalPicturesHtml;
  });
}
