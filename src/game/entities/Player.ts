import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  public isAlive: boolean = true;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  private FLAP_SFX = 'flapSfx';
  private DIE_SFX = 'dieSfx';
  private LAST_FLAP_SOUND_TIME: number = 0;
  private FLAP_SOUND_COOLDOWN: number = 1000;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    // collision box
    this.setScale(0.3);
    const hitboxWidth = 20;
    const hitboxHeight = 20;
    this.body?.setSize(hitboxWidth, hitboxHeight);

    if (this.body) {
      const offsetX = (this.width - hitboxWidth) / 2;
      const offsetY = (this.height - hitboxHeight) / 2;
      this.body.setOffset(offsetX, offsetY);
    }

    this.flipX = false;

    if (!scene.anims.exists('fly')) {
      this.createAnimations();
    }
    this.play('fly');

    if (scene.input.keyboard) {
      this.cursors = scene.input.keyboard.createCursorKeys();
    }
  }

  private createAnimations() {
    this.scene.anims.create({
      key: 'fly',
      frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 7 }), // 8 frames
      frameRate: 7,
      repeat: -1,
    });

    this.anims.generateFrameNumbers('player', { start: 0, end: 7 }).forEach((frame, index) => {
      console.log(`Frame ${index}:`, frame);
    });
  }

  private flap() {
    if (!this.isAlive) return;

    const currentTime = this.scene.time.now;
    if (currentTime - this.LAST_FLAP_SOUND_TIME > this.FLAP_SOUND_COOLDOWN) {
      this.scene.sound.play(this.FLAP_SFX, {
        loop: false,
        volume: 0.1,
        detune: 2,
      });
      this.LAST_FLAP_SOUND_TIME = currentTime;
    }

    this.setVelocityY(-300);
  }

  public die() {
    if (!this.isAlive) return;

    this.isAlive = false;
    this.scene.sound.play(this.DIE_SFX, {
      volume: 0.1,
    });
    this.setTint(0xff0000);
    this.stop();
  }

  public update() {
    if (!this.isAlive) return;

    this.setVelocityX(0);

    if (this.body && this.body.velocity.y < 0) {
      this.setRotation(-Math.PI / 12);
    } else if (this.body) {
      this.setRotation(Math.min(Math.PI / 4, this.body.velocity.y / 600));
    }

    if (
      this.cursors.space.isDown ||
      this.cursors.up.isDown ||
      this.scene.input.activePointer.isDown
    ) {
      this.flap();
    } else if (this.body && this.body.touching.down) {
      this.die();
    }
  }
}
