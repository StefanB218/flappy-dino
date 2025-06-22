import { Scene } from 'phaser';
import { Player } from '../entities/Player';
import { Pipe } from '../entities/Pipe';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  player: Player;
  pipes: Pipe


  // Game state
  score: number = 0;
  scoreText: Phaser.GameObjects.Text;
  gameOver: boolean = false;

  // Timers
  pipeTimer: Phaser.Time.TimerEvent;

  constructor() {
    super('Game');
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.background = this.add.image(512, 384, 'background');
    this.background.setAlpha(0.5);

    this.player = new Player(this, 0, 0);
    // Create pipe group
    this.pipes = new Pipe(this);

    this.physics.add.collider(this.player, this.pipes, this.gameEnd, undefined, this);

    this.input.once('pointerdown', () => {
      this.scene.start('GameOver');
    });

    // Timer to create pipes
    this.pipeTimer = this.time.addEvent({
      delay: 1500,
      callback: this.addPipes,
      callbackScope: this,
      loop: true
    });
  }

  addPipes() {
    if (this.gameOver) return;

    // Create a random gap position
    const gapY = Phaser.Math.Between(150, this.cameras.main.height - 150);

    // Create the pipe pair
    const pipes = this.pipes.createPipes(
      this.cameras.main.width + 100,
      gapY,
      180 // Gap height
    );

    // Create a score zone between the pipes
    const scoreZone = this.physics.add.sprite(
      pipes.topPipe.x + 50,
      gapY,
      "pipe"
    );
    scoreZone.setSize(10, 180);
    scoreZone.setVisible(false);
    scoreZone.setVelocityX(-200);

    // Add overlap with score zone
    this.physics.add.overlap(this.player, scoreZone, () => {
      this.increaseScore();
      scoreZone.destroy();
    }, undefined, this);

    // Set a timer to destroy pipes when off-screen
    this.time.delayedCall(6000, () => {
      if (pipes.topPipe.active) pipes.topPipe.destroy();
      if (pipes.bottomPipe.active) pipes.bottomPipe.destroy();
      if (scoreZone.active) scoreZone.destroy();
    });
  }

  increaseScore() {
    this.score++;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  gameEnd() {
  }
}
