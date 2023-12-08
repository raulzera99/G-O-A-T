import firebase from "firebase/app";
import "firebase/database";

class Match {
  constructor(date, location, result, user_id, group_id, stats_id, player_ids) {
    this.id = generateUniqueId();
    this.date = date;
    this.location = location;
    this.result = result;
    this.user_id = user_id;
    this.group_id = group_id;
    this.stats_id = stats_id;
    this.player_ids = player_ids;
  }

  // Métodos para interação com o Firebase Realtime Database

  // Salvar uma nova partida no Firebase
  async save() {
    await firebase.database().ref(`matches/${this.id}`).set({
      date: this.date,
      location: this.location,
      result: this.result,
      user_id: this.user_id,
      group_id: this.group_id,
      stats_id: this.stats_id,
      player_ids: this.player_ids,
    });
  }

  // Obter detalhes do usuário associado a esta partida
  async getUser() {
    const snapshot = await firebase
      .database()
      .ref(`users/${this.user_id}`)
      .once("value");
    return snapshot.val();
  }

  // Obter detalhes do grupo associado a esta partida
  async getGroup() {
    const snapshot = await firebase
      .database()
      .ref(`groups/${this.group_id}`)
      .once("value");
    return snapshot.val();
  }

  // Obter detalhes das estatísticas associadas a esta partida
  async getStats() {
    const snapshot = await firebase
      .database()
      .ref(`stats/${this.stats_id}`)
      .once("value");
    return snapshot.val();
  }

  // Obter detalhes dos jogadores associados a esta partida
  async getPlayers() {
    const players = [];
    for (const player_id of this.player_ids) {
      const snapshot = await firebase
        .database()
        .ref(`players/${player_id}`)
        .once("value");
      players.push(snapshot.val());
    }
    return players;
  }
}

generateUniqueId = () => {
  firebase.database().ref().push().key;
};

export default Match;
