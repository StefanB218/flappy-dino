import { Scene } from 'phaser';
import { Player } from '../entities/Player';
import { Pipe } from '../entities/Pipe';
import { Score } from '../entities/Score';
import { Ground } from '../entities/Ground';
import { Background } from '../entities/Background';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Background;
  msg_text: Phaser.GameObjects.Text;
  player: Player;
  pipes: Pipe;
  ground: Ground;
  score: Score;

  gameOver: boolean = false;

  // Timers
  pipeTimer: Phaser.Time.TimerEvent;

  constructor() {
    super('Game');
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    //this.background = this.add.image(512, 384, 'background');
    //this.background.setAlpha(0.5);

    this.background = new Background(this);

    const playerStartX = this.scale.width * 0.1; // 10% screen width
    const playerStartY = this.scale.height / 2; // center vert

    this.score = new Score(this, 0, 0);

    this.player = new Player(this, playerStartX, playerStartY);
    this.pipes = new Pipe(this);
    this.ground = new Ground(this);
    this.ground.addCollider(this.player, this.gameEnd.bind(this));

    this.physics.add.collider(this.player, this.pipes, this.gameEnd, undefined, this);

    this.pipeRowSpawner(); // soawn once without delay
    this.pipeTimer = this.time.addEvent({
      delay: 2200,
      callback: this.pipeRowSpawner,
      callbackScope: this,
      loop: true,
    });
  }

  pipeRowSpawner() {
    const gapHeight = 225;
    const startX = this.scale.width;
    const gapY = Math.random() * (this.scale.height - gapHeight) + gapHeight / 2;

    this.pipes.createPipes(startX, gapY, gapHeight);
  }

  update() {
    if (this.player && this.player.isAlive) {
      this.player.update();
      this.pipes.movePipesLeft();
      this.background.update();

      this.pipes.checkPlayerPassed(this.player, () => {
        this.score.increaseScore();
      });
    } else {
      this.gameEnd();
    }
  }

  gameEnd() {
    this.gameOver = true;
    this.player.die();
    this.score.saveHighScore();
    this.time.delayedCall(1000, () => {
      this.scene.start('GameOver', {
        score: this.score.getScore(),
        highScore: this.score.getHighscore(),
      });
    });
  }
}
