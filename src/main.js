import "./style.css";
import TodoList from "./components/todoList/TodoList";

new TodoList({
  el: "#app",
  apiURL: "https://6a8989fb20fcac8c1eded6dc.mockapi.io/",
});
