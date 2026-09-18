/*TodoList.js = le carnet d'adresses entier. Il contient toutes les fiches (le tableau de tâches), et décide de l'organisation générale : charger toutes les tâches au démarrage, ajouter une tâche à la liste, compter combien il en reste, etc.*/

import DB from "../../DB";
import Todo from "../todo/Todo";

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
    console.table(this.todos);
  }
}
