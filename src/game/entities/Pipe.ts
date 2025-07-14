import Phaser from 'phaser';

export class Pipe extends Phaser.Physics.Arcade.Group {
  private TEXTURE = 'stalagnite-grey';

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);

    scene.add.existing(this);
  }

  createPipes(x: number, gapY: number, gapHeight: number) {
    const width = 64;

    const topHeight = gapY - gapHeight / 2;
    const topPipe = this.create(x, gapY - gapHeight / 2, this.TEXTURE);
    topPipe.flipY = true;
    topPipe.setOrigin(0, 1);
    topPipe.setDisplaySize(width, topHeight);
    this.setSharedProperties(topPipe);

    const bottomHeight = this.scene.scale.height - (gapY - gapHeight / 2);
    const bottomPipe = this.create(x, gapY + gapHeight / 2, this.TEXTURE);
    bottomPipe.setOrigin(0, 0);
    bottomPipe.setDisplaySize(width, bottomHeight);
    this.setSharedProperties(bottomPipe);

    topPipe.setData('isTriggerPipe', true);
  }

  private setSharedProperties(pipe: any) {
    pipe.setImmovable(true);

    pipe.body.collision = true;
    pipe.body.allowGravity = false;

    const hitboxWidth = pipe.displayWidth * 0.5;

    pipe.body.setSize(hitboxWidth, pipe.height);
  }

  checkPlayerPassed(player: Phaser.Physics.Arcade.Sprite, callback: () => void) {
    this.children.each(pipe => {
      const spritePipe = pipe as Phaser.GameObjects.Sprite;

      if (
        spritePipe.getData('isTriggerPipe') &&
        !spritePipe.getData('passed') &&
        player.x > spritePipe.x + spritePipe.displayWidth
      ) {
        spritePipe.setData('passed', true);
        callback();
      }
      return null;
    });
  }

  movePipesLeft() {
    this.getChildren().forEach(pipe => {
      const sprite = pipe as Phaser.Physics.Arcade.Sprite;
      if (sprite) {
        sprite.x -= 2;
        if (sprite.x < -sprite.width) {
          sprite.destroy();
        }
      }
    });
  }
}
