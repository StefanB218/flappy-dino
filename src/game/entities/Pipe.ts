import Phaser from "phaser";

export class Pipe extends Phaser.Physics.Arcade.Group {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene);

        scene.add.existing(this);
    }

    createPipes(x: number, gapY: number, gapHeight: number = 200) {
        const topPipe = this.create(
            x,
            gapY - gapHeight / 2,
            'pipe'
        ) as Phaser.Physics.Arcade.Sprite;

        // Creating a top pipe using a rectangle shape
        if (!topPipe.body) {
            const topGraphics = this.scene.add.graphics();
            topGraphics.fillStyle(0x4a8f2f, 1); // Green color
            topGraphics.fillRect(-40, -400, 80, 400); // Width 80, height 400

            const topTexture = topGraphics.generateTexture('pipe', 80, 400);
            topGraphics.destroy();

            topPipe.setTexture('pipe');
        }

        topPipe.setOrigin(0.5, 1); // Origin at bottom center
        topPipe.setImmovable(true);

        // Bottom pipe
        const bottomPipe = this.create(
            x,
            gapY + gapHeight / 2,
            'pipe'
        ) as Phaser.Physics.Arcade.Sprite;

        bottomPipe.setOrigin(0.5, 0); // Origin at top center
        bottomPipe.setImmovable(true);

        // Move pipes from right to left
        topPipe.setVelocityX(-200);
        bottomPipe.setVelocityX(-200);

        return { topPipe, bottomPipe };
    }
}