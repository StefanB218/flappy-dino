import { Scene } from 'phaser';
import { Player } from '../entities/Player';
import { Pipe } from '../entities/Pipe';
import { EVENTS } from '../utils/globals';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  player: Player;
  pipes: Pipe;

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

    const playerStartX = this.scale.width * 0.1; // 10% of the screen width
    const playerStartY = this.scale.height / 2; // Center vertically
    this.player = new Player(this, playerStartX, playerStartY);
    this.pipes = new Pipe(this);

    this.physics.add.collider(this.player, this.pipes, this.gameEnd, undefined, this);

    const groundHeight = 1;
    const ground = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height - groundHeight / 2,
      this.scale.width,
      groundHeight,
      0x00ff0
    );
    this.physics.add.existing(ground, true);
    this.physics.add.collider(this.player, ground);

    this.pipeRowSpawner(); // soawn once without delay
    this.pipeTimer = this.time.addEvent({
      delay: 2000,
      callback: this.pipeRowSpawner,
      callbackScope: this,
      loop: true,
    });

    this.eventListener()
  }

  pipeRowSpawner() {
    const gapHeight = 225;
    const startX = this.scale.width;
    const gapY = Math.random() * (this.scale.height - gapHeight) + gapHeight / 2;

    this.pipes.createPipes(startX, gapY, gapHeight, this.player);
  }

  update() {
    if (this.player && this.player.isAlive) {
      this.player.update();
      this.movePipesLeft();
    } else {
      this.gameEnd();
    }
  }

  private movePipesLeft() {
    this.pipes.getChildren().forEach(pipe => {
      const sprite = pipe as Phaser.Physics.Arcade.Sprite;
      if (sprite) {
        sprite.x -= 2;
        if (sprite.x < -sprite.width) {
          sprite.destroy();
        }
      }
    });
  }

  increaseScore() {
    this.score++;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  gameEnd() {
    this.gameOver = true;
    this.player.die(); // Call the player's die method
    this.time.delayedCall(1000, () => {
      this.scene.start('GameOver'); // Transition to the GameOver scene
    });
  }

  private eventListener() {
    this.events.on(EVENTS.PLAYER_PASSED_ZONE, () => {
      console.log("amogus")
    })
  }
}
