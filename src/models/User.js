import firebase from "firebase/app";
import "firebase/database";

class User {
  constructor(name, email, avatarURL) {
    this.id = this.generateUniqueId();
    this.name = name;
    this.email = email;
    this.avatarURL = avatarURL;
  }

  async save() {
    await firebase.database().ref(`users/${this.id}`).set({
      name: this.name,
      email: this.email,
      avatarURL: this.avatarURL,
    });
  }

  async getGroups() {
    const snapshot = await firebase
      .database()
      .ref("groups")
      .orderByChild("userIds")
      .equalTo(this.id)
      .once("value");

    const groupsData = snapshot.val();
    return groupsData ? Object.values(groupsData) : [];
  }

  async getMatches() {
    const snapshot = await firebase
      .database()
      .ref("matches")
      .orderByChild("userIds")
      .equalTo(this.id)
      .once("value");

    const matchesData = snapshot.val();
    return matchesData ? Object.values(matchesData) : [];
  }

  static async create(name, email, avatarURL) {
    const user = new User(name, email, avatarURL);
    await user.save();
    return user;
  }

  static async findByEmail(email) {
    const snapshot = await firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(email)
      .once("value");

    const userData = snapshot.val();
    if (!userData) return null;

    const userId = Object.keys(userData)[0];
    return new User(userData[userId].name, email, userData[userId].avatarURL);
  }

  static async findById(id) {
    const snapshot = await firebase.database().ref(`users/${id}`).once("value");
    const userData = snapshot.val();
    return new User(userData.name, userData.email, userData.avatarURL);
  }

  static async findAll() {
    const snapshot = await firebase.database().ref("users").once("value");
    const usersData = snapshot.val();
    return usersData
      ? Object.keys(usersData).map(
          (userId) =>
            new User(
              usersData[userId].name,
              usersData[userId].email,
              usersData[userId].avatarURL
            )
        )
      : [];
  }

  // Função utilitária para gerar um ID único
  static generateUniqueId() {
    return firebase.database().ref().push().key;
  }
}

export default User;
