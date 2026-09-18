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
    this.listDomElt = this.domEl.querySelector(".todo-list");
    this.todos.forEach((todo) => {
      this.listDomElt.append(todo.render());
    });
    this.renderItemsLeftCount();
    this.initEvents();
  }
  getItemsLeftCount() {
    return this.todos.filter((todo) => !todo.completed).length;
  }
  renderItemsLeftCount() {
    this.domEl.querySelector(".todo-count strong").innerText =
      this.getItemsLeftCount();
  }
  async addTodo(data) {
    const todoData = await DB.create(data);
    const newTodo = new Todo(todoData);
    this.todos.push(newTodo);
    this.listDomElt.append(newTodo.render());
    this.renderItemsLeftCount();
  }
  async deleteOneById(id) {
    const resp = await DB.deleteOneById(id);
    this.todos.splice(
      this.todos.findIndex((todo) => todo.id == id),
      1,
    );
    this.domEl.querySelector(`[data-id='${id}']`).remove();
    this.renderItemsLeftCount();
  }
  initEvents() {
    this.domEl.querySelector(".new-todo").addEventListener("change", (e) => {
      this.addTodo(e.target.value);
      e.target.value = "";
    });
  }
}
