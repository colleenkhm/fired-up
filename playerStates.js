import { Dust } from './particles.js'
const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5, 
  HIT: 6
};

class State {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}

export class Sitting extends State {
  constructor(game) {
    super("SITTING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 5;
    this.game.player.maxFrame = 4;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (input.includes('Enter')) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

export class Running extends State {
  constructor(player) {
    super("RUNNING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 3;
  }
  handleInput(input) {
    if (input.includes("ArrowDown")) {
      this.player.setState(states.SITTING, 0);
    } else if (input.includes("ArrowUp")) {
      this.player.setState(states.JUMPING, 1);
    } else if (input.includes('Enter')) {
      this.player.setState(states.ROLLING, 2);
    }
  }
}

export class Jumping extends State {
  constructor(player) {
    super("JUMPING");
    this.player = player;
  }
  enter() {
    if (this.player.onGround()) this.vy -= 20;
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 1;
  }
  handleInput(input) {
    if (this.player.vy > this.player.weight) {
      this.player.setState(states.FALLING, 1);
    } else if (input.includes('Enter')) {
      this.player.setState(states.ROLLING, 2);
    }
  }
}

export class Falling extends State {
  constructor(player) {
    super("FALLING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 2;
  }
  handleInput(input) {
    if (this.player.onGround()) {
      this.player.setState(states.RUNNING, 1);
    }
  }
}

export class Rolling extends State {
  constructor(player) {
    super("ROLLING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 5;
    this.player.frameY = 6;
  }
  handleInput(input) {
    if (!input.includes('Enter') && this.player.onGround()) {
      this.player.setState(states.RUNNING, 1);
    } else if (!input.includes('Enter') && !this.player.onGround()) {
      this.player.setState(states.FALLING, 1);
    } else if (input.includes('Enter') && input.includes('ArrowUp') && this.player.onGround()) {
      this.player.vy -= 27;
    }
  }
}
