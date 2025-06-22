import Phaser from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {

    private static readonly KEY_FRAMES = 11;
    private isAlive: boolean = true;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'frame_0');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configure physics properties
        this.setCollideWorldBounds(true);
        this.setBounce(0.2);
        this.setGravityY(300);


        this.setCollideWorldBounds(true);
        this.createAnimations();
        this.play('fly');

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
            repeat: -1, // Loop indefinitely
        });
    }

    public flap() {
        if (!this.isAlive) return;
        this.setVelocityY(-200); // Adjust the flap strength as needed
    }

    public die() {
        this.isAlive = false;
        this.setTint(0xff0000); // Change color to indicate death
    }

    update() {
        if (this.body && this.body.velocity.y < 0) {
            this.setRotation(-Math.PI / 12); // Tilt upwards when flapping
        } else if (this.body) {
            this.setRotation(Math.min(Math.PI / 4, this.body.velocity.y / 600));
        }
    }
}