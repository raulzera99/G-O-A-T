import firebase from "firebase/app";
import "firebase/database";

class User {
  constructor(name, email, avatarURL) {
    this.id = generateUniqueId();
    this.name = name;
    this.email = email;
    this.avatarURL = avatarURL;
  }

  // Métodos para interação com o Firebase Realtime Database

  // Salvar um novo usuário no Firebase
  async save() {
    await firebase.database().ref(`users/${this.id}`).set({
      name: this.name,
      email: this.email,
      avatarURL: this.avatarURL,
    });
  }

  // Obter todos os grupos aos quais este usuário pertence
  async getGroups() {
    const snapshot = await firebase
      .database()
      .ref("groups")
      .orderByChild("userIds")
      .equalTo(this.id)
      .once("value");
    return snapshot.val();
  }

  // Obter todas as partidas em que este usuário participa
  async getMatches() {
    const snapshot = await firebase
      .database()
      .ref("matches")
      .orderByChild("userIds")
      .equalTo(this.id)
      .once("value");
    return snapshot.val();
  }

  // Métodos de Classe (estáticos)

  // Criar um novo usuário no Firebase
  static async create(name, email, avatarURL) {
    const user = new User(name, email, avatarURL);
    await user.save();
    return user;
  }

  // Encontrar um usuário pelo email no Firebase
  static async findByEmail(email) {
    const snapshot = await firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(email)
      .once("value");
    const userData = snapshot.val();
    const userId = Object.keys(userData)[0];
    return new User(userData[userId].name, email, userData[userId].avatarURL);
  }

  // Encontrar um usuário pelo id no Firebase
  static async findById(id) {
    const snapshot = await firebase.database().ref(`users/${id}`).once("value");
    const userData = snapshot.val();
    return new User(userData.name, userData.email, userData.avatarURL);
  }

  // Encontrar todos os usuários no Firebase
  static async findAll() {
    const snapshot = await firebase.database().ref("users").once("value");
    const usersData = snapshot.val();
    return Object.keys(usersData).map(
      (userId) =>
        new User(
          usersData[userId].name,
          usersData[userId].email,
          usersData[userId].avatarURL
        )
    );
  }

  // Função utilitária para gerar um ID único
  generateUniqueId() {
    return firebase.database().ref().push().key;
  }
}

export default User;
