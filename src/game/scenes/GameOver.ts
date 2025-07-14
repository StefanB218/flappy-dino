import { Scene } from 'phaser';
import { Background } from '../entities/Background';

export class GameOver extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Background
  gameover_text: Phaser.GameObjects.Text;

  score_text: Phaser.GameObjects.Text;
  highscore_text: Phaser.GameObjects.Text;
  new_highScore_Text: Phaser.GameObjects.Text;

  constructor() {
    super('GameOver');
  }

  create(data: { score: number; highScore: number }) {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xff0000);

    this.background = new Background(this)

    this.gameover_text = this.add.text(512, 384, 'Game Over', {
      fontFamily: 'Arial Black',
      fontSize: 64,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
      align: 'center',
    });

    this.gameover_text.setOrigin(0.5);

    if (data.score > data.highScore) {
      this.new_highScore_Text = this.add.text(512, 450, `NEW High Score: ${data.score}`, {
        fontFamily: 'Arial',
        fontSize: 32,
        color: '#ffffff',
        align: 'center',
      });
      this.new_highScore_Text.setOrigin(0.5);

      const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff'];
      let colorIndex = 0;

      this.time.addEvent({
        delay: 100, // Change color every 200ms
        loop: true,
        callback: () => {
          this.new_highScore_Text.setColor(colors[colorIndex]);
          colorIndex = (colorIndex + 1) % colors.length; // Cycle through colors
        },
      });
    } else {
      this.score_text = this.add.text(512, 450, `Score: ${data.score}`, {
        fontFamily: 'Arial',
        fontSize: 32,
        color: '#ffffff',
        align: 'center',
      });
      this.score_text.setOrigin(0.5);
    }

    this.highscore_text = this.add.text(512, 500, `High Score: ${data.highScore}`, {
      fontFamily: 'Arial',
      fontSize: 32,
      color: '#ffffff',
      align: 'center',
    });
    this.highscore_text.setOrigin(0.5);

    this.input.once('pointerdown', () => {
      this.scene.start('MainMenu');
    });
  }
}
