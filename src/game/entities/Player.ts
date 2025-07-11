import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private static readonly KEY_FRAMES = 11;
  public isAlive: boolean = true;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'frame_0');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    // collision box
    this.setScale(0.4);
    this.body?.setSize(50, 50); // Set width and height of the hitbox

    this.setBounce(0.2);
    this.setGravityY(300);

    if (!scene.anims.exists('fly')) {
      this.createAnimations();
    }
    this.play('fly');

    if (scene.input.keyboard) {
      this.cursors = scene.input.keyboard.createCursorKeys();
    }
  }

  public createAnimations() {
    const scene = this.scene;
    const frameNames = [];

    for (let i = 0; i < Player.KEY_FRAMES; i++) {
      frameNames.push({ key: `frame_${i}` });
    }

    scene.anims.create({
      key: 'fly',
      frames: frameNames,
      frameRate: 10,
      repeat: -1,
    });
  }

  public flap() {
    if (!this.isAlive) return;
    this.setVelocityY(-200);
  }

  public die() {
    this.isAlive = false;
    this.setTint(0xff0000);
    this.stop();
  }

  update() {
    if (!this.isAlive) return;

    this.setVelocityX(0);

    if (this.body && this.body.velocity.y < 0) {
      this.setRotation(-Math.PI / 12);
    } else if (this.body) {
      this.setRotation(Math.min(Math.PI / 4, this.body.velocity.y / 600));
    }

    if (this.cursors.space.isDown) {
      this.flap();
    } else if (this.body && this.body.touching.down) {
      this.die();
    }
  }
}
