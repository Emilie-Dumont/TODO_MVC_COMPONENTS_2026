/*DB.js = le facteur. Il fait uniquement des allers-retours avec le serveur (envoyer une requête, ramener une réponse). Il ne sait pas afficher quoi que ce soit à l'écran, il ne connaît même pas l'existence du HTML.
Concrètement pour la suppression : DB.js aura une méthode deleteOneById(id) qui fait le fetch vers le serveur ; et c'est TodoList.js qui appellera cette méthode de DB.js, puis retirera la tâche du tableau et du DOM. Todo.js, lui, se contente de dire "on m'a cliqué dessus pour me supprimer"
*/

export default class DB {
  static setApiURL(url) {
    this.apiURL = url;
  }
  static async findAll() {
    const response = await fetch(this.apiURL + "/todos");
    return response.json();
  }
  static async create(data) {
    const response = await fetch(this.apiURL + "/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: data,
        completed: false,
        createdAt: Date.now(),
      }),
    });
    return response.json();
  }
  static async updateOne(todo) {
    const response = await fetch(this.apiURL + "/todos/" + todo.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: todo.content,
        completed: todo.completed,
      }),
    });
    return response.json();
  }
  static async deleteOneById(id) {
    const response = await fetch(this.apiURL + "/todos/" + id, {
      method: "DELETE",
    });
    return response.json();
  }
}
