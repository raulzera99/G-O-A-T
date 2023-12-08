import firebase from "firebase/app";
import "firebase/database";

class Group {
  constructor(name, description, location, user_id) {
    this.id = generateUniqueId();
    this.name = name;
    this.description = description;
    this.location = location;
    this.user_id = user_id;
  }
  // Métodos para interação com o Firebase Realtime Database
  // Salvar um novo grupo no Firebase
  async save() {
    await firebase.database().ref(`groups/${this.id}`).set({
      name: this.name,
      description: this.description,
      location: this.location,
      user_id: this.user_id,
    });
  }
  // Obter detalhes do usuário associado a este grupo
  async getUser() {
    const snapshot = await firebase
      .database()
      .ref(`users/${this.user_id}`)
      .once("value");
    return snapshot.val();
  }

  generateUniqueId() {
    return firebase.database().ref().child("groups").push().key;
  }
}

export default Group;
