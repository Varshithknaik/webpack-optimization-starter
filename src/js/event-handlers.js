import { renderTodos, clearNewTodoInput, getTodoId } from "./ui";
import { getAllTodos, addTodo, removeTodo, updateTodo } from "./data";
import { capitalize } from "lodash-es";
import { trim } from "./helper";

export function onLoadEventHandler() {
  renderTodos(getAllTodos());
}

export function newTodoEventHandler(event) {
  let text = event.target.value;
  //   text = capitalize(trim(text));
  text = text |> trim |> capitalize;
  addTodo({
    id: Date.now(),
    text: text,
    completed: false,
  });
  renderTodos(getAllTodos());
  clearNewTodoInput();
}

export function removeTodoEventHandler(event) {
  //   const id = getTodoId(event.target);
  //   removeTodo(id);
  //   renderTodos(getAllTodos());
  Promise.all([
    import(
      "bootstrap"
      /* webpackChunkName: "bootstrap" */
    ),
    import(
      "jquery"
      /* webpackChunkName: "jquery" */
    ),
  ]).then(([{ Modal }, { default: $ }]) => {
    const id = getTodoId(event.target);
    $("#modal-delete-todo").data("todo-id", id);
    const deleteTodoModal = Modal.getOrCreateInstance(
      document.getElementById("modal-delete-todo")
    );
    deleteTodoModal.show();
  });
}

export function confirmRemoveEventHandler(event) {
  Promise.all([
    import(
      "bootstrap"
      /* webpackChunkName: "bootstrap" */
    ),
    import(
      "jquery"
      /* webpackChunkName: "jquery" */
    ),
  ]).then(([{ Modal }, { default: $ }]) => {
    const id = $("#modal-delete-todo").data("todo-id");
    removeTodo(id);
    renderTodos(getAllTodos());
    const deleteTodoModal = Modal.getOrCreateInstance(
      document.getElementById("modal-delete-todo")
    );
    deleteTodoModal.hide();
  });
}

export function toggleTodoEventListener(event) {
  const id = getTodoId(event.target);
  const isCompleted = event.target.checked;
  updateTodo(id, isCompleted);
  renderTodos(getAllTodos());
}
