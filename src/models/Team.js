import firebase from "firebase/app";
import "firebase/database";

class Team {
  constructor(name, description, match_id) {
    this.id = generateUniqueId();
    this.name = name;
    this.description = description;
    this.match_id = match_id;
  }
  // Métodos para interação com o Firebase Realtime Database
  // Salvar um novo grupo no Firebase
  async save() {
    await firebase.database().ref(`teams/${this.id}`).set({
      name: this.name,
      description: this.description,
      match_id: this.match_id,
    });
  }
  // Obter partida associada a este time
  async getMatch() {
    const snapshot = await firebase
      .database()
      .ref(`matches/${this.match_id}`)
      .once("value");
    return snapshot.val();
  }
  // Obter jogadores associados a este time
  async getPlayers() {
    const snapshot = await firebase
      .database()
      .ref("players")
      .orderByChild("team_id")
      .equalTo(this.id)
      .once("value");
    return snapshot.val();
  }

  generateUniqueId() {
    return firebase.database().ref().child("teams").push().key;
  }
}

export default Team;
