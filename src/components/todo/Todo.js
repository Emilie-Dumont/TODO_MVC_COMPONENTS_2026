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

  render(el) {
    const template = document.createElement("template");
    template.innerHTML = getTemplate(this);
    this.domElt = template.content.firstElementChild;
    el.append(this.domElt);
  }
}
