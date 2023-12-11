import firebase from "firebase/app";
import "firebase/database";

class Player {
  constructor(
    name,
    points,
    assists,
    rebounds,
    blocks,
    steals,
    match_id,
    user_id,
    team_id,
    group_id
  ) {
    this.id = generateUniqueId();
    this.name = name;
    this.points = points;
    this.assists = assists;
    this.rebounds = rebounds;
    this.blocks = blocks;
    this.steals = steals;
    this.match_id = match_id;
    this.user_id = user_id;
    this.team_id = team_id;
    this.group_id = group_id;
  }

  // Métodos para interação com o Firebase Realtime Database

  // Salvar um novo jogador no Firebase
  async save() {
    await firebase.database().ref(`players/${this.id}`).set({
      name: this.name,
      points: this.points,
      assists: this.assists,
      rebounds: this.rebounds,
      blocks: this.blocks,
      steals: this.steals,
      match_id: this.match_id,
      user_id: this.user_id,
      team_id: this.team_id,
      group_id: this.group_id,
    });
  }

  // Obter o time ao qual este jogador pertence
  async getTeam() {
    if (this.team_id) {
      const snapshot = await firebase
        .database()
        .ref(`teams/${this.team_id}`)
        .once("value");
      const teamData = snapshot.val();
      return {
        teamId: teamData.id,
        name: teamData.name,
        description: teamData.description,
      };
    } else {
      return null;
    }
  }

  // Obter a partida à qual este jogador pertence
  async getMatch() {
    if (this.match_id) {
      const snapshot = await firebase
        .database()
        .ref(`matches/${this.match_id}`)
        .once("value");
      const matchData = snapshot.val();
      return {
        matchId: matchData.id,
        date: matchData.date,
        location: matchData.location,
        result: matchData.result,
      };
    } else {
      return null;
    }
  }

  // Obter o usuário ao qual este jogador pertence
  async getUser() {
    if (this.user_id) {
      const snapshot = await firebase
        .database()
        .ref(`users/${this.user_id}`)
        .once("value");
      const userData = snapshot.val();
      return {
        userId: userData.id,
        name: userData.name,
      };
    } else {
      return null;
    }
  }

  // Obter as estatísticas deste jogador numa determinada partida
  async getStatsForMatch(match_id) {
    if (this.stats_id) {
      const snapshot = await firebase
        .database()
        .ref(`stats/${this.stats_id}`)
        .once("value");
      const statsData = snapshot.val();
      return {
        statsId: statsData.id,
        points: statsData.points,
        assists: statsData.assists,
        rebounds: statsData.rebounds,
        blocks: statsData.blocks,
        steals: statsData.steals,
      };
    } else {
      return null;
    }
  }

  // Obter o grupo ao qual este jogador pertence
  async getGroup() {
    if (this.group_id) {
      const snapshot = await firebase
        .database()
        .ref(`groups/${this.group_id}`)
        .once("value");
      const groupData = snapshot.val();
      return {
        groupId: groupData.id,
        name: groupData.name,
        description: groupData.description,
        location: groupData.location,
      };
    } else {
      return null;
    }
  }

  // Métodos de Classe (estáticos)

  // Criar um novo jogador no Firebase
  static async create(
    name,
    points,
    assists,
    rebounds,
    blocks,
    steals,
    match_id,
    user_id,
    stats_id
  ) {
    const player = new Player(
      name,
      points,
      assists,
      rebounds,
      blocks,
      steals,
      match_id,
      user_id,
      stats_id
    );
    await player.save();
    return player;
  }

  // Encontrar um jogador pelo nome no Firebase
  static async findByName(name) {
    const snapshot = await firebase
      .database()
      .ref("players")
      .orderByChild("name")
      .equalTo(name)
      .once("value");
    return snapshot.val();
  }

  // Encontrar um jogador pelo ID no Firebase
  static async findById(id) {
    const snapshot = await firebase
      .database()
      .ref("players")
      .child(id)
      .once("value");
    return snapshot.val();
  }

  // Encontrar todos os jogadores no Firebase
  static async findAll() {
    const snapshot = await firebase.database().ref("players").once("value");
    const playersData = snapshot.val();

    return Object.keys(playersData).map((playerId) => {
      const playerData = playersData[playerId];
      return new Player(
        playerData.name,
        playerData.points,
        playerData.assists,
        playerData.rebounds,
        playerData.blocks,
        playerData.steals,
        playerData.match_id,
        playerData.user_id,
        playerData.stats_id
      );
    });
  }
  generateUniqueId() {
    return firebase.database().ref().child("players").push().key;
  }
}

export default Player;
