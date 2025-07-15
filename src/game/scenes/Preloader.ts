import { Scene } from 'phaser';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.add.image(centerX, centerY, 'background');
    this.add.rectangle(centerX, centerY, 468, 32).setStrokeStyle(1, 0xffffff);
    const bar = this.add.rectangle(centerX - 230, centerY, 4, 28, 0xffffff);
    this.load.on('progress', (progress: number) => {
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath('assets');

    this.loadPlayerSpritesheet();
    this.loadParalaxBackground();

    this.load.image('stalagnite-grey', 'stalagnite-grey.png');
    this.load.audio('caveSfx', 'cave-prod.wav');
    this.load.audio('flapSfx', 'wing_flap_dino.wav');
    this.load.audio('dieSfx', 'explosion.wav');
  }

  create() {
    this.scene.start('MainMenu');
  }

  private loadPlayerSpritesheet() {
    this.load.spritesheet('player', 'player.png', {
      frameWidth: 512,
      frameHeight: 256,
    });
  }

  private loadParalaxBackground() {
    for (let i = 1; i < 9; i++) {
      const name = i + (['3', '6', '8'].includes(i.toString()) ? 'fx' : '');
      this.load.image(`paralax${i}`, `paralax-bg/${name}.png`);
    }
  }
}
