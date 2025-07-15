import { Scene, GameObjects } from 'phaser';
import { Background } from '../entities/Background';

export class MainMenu extends Scene {
  background: Background;
  logo: GameObjects.Image;
  title: GameObjects.Text;
  muteButton: GameObjects.Text;
  isMuted: boolean = false;

  MUTE = '🔇 Mute Sound';
 UNMUTE = '🔈 Unmute Sound';

  constructor() {
    super('MainMenu');
  }

  create() {
    this.background = new Background(this);
    const titlePositionX = this.scale.width / 2
    const titlePositionY = this.scale.height
    this.title = this.add
      .text(titlePositionX, titlePositionY * 0.3, 'Flappy Dino', {
        fontFamily: 'Arial Black',
        fontSize: 38,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5);


    const startButton = this.add.text(titlePositionX, titlePositionY * 0.4, 'Click here to Start Game', {
      fontFamily: 'Arial Black',
      fontSize: 32,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6,
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5);
    startButton.setInteractive();
    startButton.on('pointerdown', () => {
      this.scene.start('Game');
      this.loadMusic();
    });
    startButton.on('pointerover', () => {
      startButton.setStyle({ color: '#ffcc00' });
    });
    startButton.on('pointerout', () => {
      startButton.setStyle({ color: '#ffffff' });
    });

    this.muteButton = this.add.text(titlePositionX, titlePositionY * 0.5, this.MUTE, {
      fontFamily: 'Arial Black',
      fontSize: 26,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5);
    this.muteButton.setInteractive();
    this.muteButton.on('pointerdown', () => {
      this.toggleMute();
    });
    this.muteButton.on('pointerover', () => {
      this.muteButton.setStyle({ color: '#ffcc00' });
    });
    this.muteButton.on('pointerout', () => {
      this.muteButton.setStyle({ color: '#ffffff' });
    });
  }

  private loadMusic() {
    const musicKey = 'caveSfx';
    const music = this.sound.get(musicKey);

    if (!music) {
      const newMusic = this.sound.add(musicKey, { loop: true });
      newMusic.play();
    }
  }

  private toggleMute() {
    this.isMuted = !this.isMuted;
    this.sound.mute = this.isMuted;350
    this.muteButton.setText(this.isMuted ? this.UNMUTE : this.MUTE);
  }
}