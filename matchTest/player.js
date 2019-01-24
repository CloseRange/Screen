class player {
  constructor() {
    this.state = LOBBY;
    users[LOBBY]++;
  }
}
function addPlayer() {
  users[ALL]++;
  return new player();
}
