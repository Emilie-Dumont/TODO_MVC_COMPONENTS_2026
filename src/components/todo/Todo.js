//export default veut juste dire "ce fichier peut être importé ailleurs"
/*Todo.js = une fiche dans un carnet d'adresses. Elle concerne une seule tâche. Tout ce qui décrit ou modifie cette tâche précise (ses propriétés, cocher/décocher elle-même, s'afficher elle-même) va ici.*/
import getTemplate from "./template";

export default class Todo {
  constructor(data) {
    this.id = data.id;
    this.content = data.content;
    this.completed = data.completed;
    this.createdAt = data.createdAt;
    this.domElt = null;
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = getTemplate(this);
    this.domElt = template.content.firstElementChild;
    this.initEvents();
    return this.domElt;
  }
  async toggleCompleted() {
    this.completed = !this.completed;
    this.domElt.classList.toggle("completed");
    this.dispatch("todo:updated", { todo: this });
  }
  async update(data) {
    this.content = data;
    this.domElt.querySelector("label").innerText = this.content;
    this.domElt.classList.remove("editing");
    this.dispatch("todo:updated", { todo: this });
  }
  dispatch(type, detail) {
    this.domElt.dispatchEvent(new CustomEvent(type, { bubbles: true, detail }));
  }

  initEvents() {
    this.domElt.querySelector(".toggle").addEventListener("change", () => {
      this.toggleCompleted();
    });
    this.domElt.querySelector(".destroy").addEventListener("click", () => {
      this.dispatch("todo:deleted", { id: this.id });
    });
    this.domElt.querySelector("label").addEventListener("dblclick", () => {
      this.domElt.classList.add("editing");
    });
    this.domElt.querySelector(".edit").addEventListener("change", (e) => {
      this.update(e.target.value);
    });
  }
}
/*Pour l'instant on peut éditer plusieurs tâches à la fois parce que toutes les tâches sont indépendantes
chaque Todo ne connaît que son propre état, pas celui des autres.*/
