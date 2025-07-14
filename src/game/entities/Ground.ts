import Phaser from 'phaser';

export class Ground {
  groundObject: Phaser.GameObjects.Rectangle;
  waves: Phaser.GameObjects.Image[] = [];
  waveTimer: Phaser.Time.TimerEvent | null = null;
  waveFrame: number = 0;
  waveCount: number = 7;

  constructor(scene: Phaser.Scene) {
    const groundHeight = 1;
    this.groundObject = scene.add.rectangle(
      scene.scale.width / 2,
      scene.scale.height - groundHeight / 2,
      scene.scale.width,
      groundHeight
    );

    scene.physics.add.existing(this.groundObject, true);

    //this.initializeWaveAnimation(scene, groundHeight);
  }

  private initializeWaveAnimation(scene: Phaser.Scene, groundHeight: number) {
    const waveWidth = scene.scale.width / this.waveCount;
    for (let i = 0; i < this.waveCount; i++) {
      const wave = scene.add.image(
        waveWidth / 2 + i * waveWidth,
        scene.scale.height - groundHeight - 10,
        `wave0`
      );
      wave.setDisplaySize(waveWidth, 20);
      this.waves.push(wave);
    }

    this.waveTimer = scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.loadWavesTexture,
      callbackScope: this,
    });
  }

  private loadWavesTexture() {
    this.waveFrame = (this.waveFrame + 1) % this.waveCount;
    for (let i = 0; i < this.waves.length; i++) {
      this.waves[i].setTexture(`wave${(this.waveFrame + i) % this.waveCount}`);
    }
  }

  public addCollider(player: Phaser.Physics.Arcade.Sprite, gameEndCallback: () => void) {
    this.groundObject.scene.physics.add.collider(player, this.groundObject, gameEndCallback);
  }
}
