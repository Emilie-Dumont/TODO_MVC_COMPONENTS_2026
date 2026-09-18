/*TodoList.js = le carnet d'adresses entier. Il contient toutes les fiches (le tableau de tâches), et décide de l'organisation générale : charger toutes les tâches au démarrage, ajouter une tâche à la liste, compter combien il en reste, etc.*/

import DB from "../../DB";
import Todo from "../todo/Todo";
import getTemplate from "./template";

export default class TodoList {
  constructor(data) {
    this.domEl = document.querySelector(data.el);
    DB.setApiURL(data.apiURL);
    this.todos = [];
    this.loadTodos();
  }
  async loadTodos() {
    const todos = await DB.findAll();
    this.todos = [...todos.map((todo) => new Todo(todo))];
    this.render();
  }
  render() {
    this.domEl.innerHTML = getTemplate();
    this.todos.forEach((todo) => {
      todo.render(this.domEl.querySelector(".todo-list"));
    });
    this.renderItemsLeftCount();
  }
  getItemsLeftCount() {
    return this.todos.filter((todo) => !todo.completed).length;
  }
  renderItemsLeftCount() {
    this.domEl.querySelector(".todo-count strong").innerText =
      this.getItemsLeftCount();
  }
}
