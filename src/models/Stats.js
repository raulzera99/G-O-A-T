import firebase from "firebase/app";
import "firebase/database";

class Stats {
  constructor(points, assists, rebounds, blocks, steals, player_id) {
    this.id = generateUniqueId();
    this.points = points;
    this.assists = assists;
    this.rebounds = rebounds;
    this.blocks = blocks;
    this.steals = steals;
    this.player_id = player_id;
  }

  // Métodos para interação com o Firebase Realtime Database

  // Salvar um novo jogador no Firebase
  async save() {
    await firebase.database().ref(`stats/${this.id}`).set({
      points: this.points,
      assists: this.assists,
      rebounds: this.rebounds,
      blocks: this.blocks,
      steals: this.steals,
      player_id: this.player_id,
    });
  }

  // Obter o jojgador ao qual estas estatísticas pertencem
  async getPlayer() {
    if (this.player_id) {
      const snapshot = await firebase
        .database()
        .ref(`players/${this.player_id}`)
        .once("value");
      const playerData = snapshot.val();
      return {
        playerId: playerData.id,
        name: playerData.name,
        points: playerData.points,
        assists: playerData.assists,
        rebounds: playerData.rebounds,
        blocks: playerData.blocks,
        steals: playerData.steals,
      };
    } else {
      return null;
    }
  }

  generateUniqueId() {
    return firebase.database().ref().child("stats").push().key;
  }
}
