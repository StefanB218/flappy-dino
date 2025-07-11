import Phaser from 'phaser';
import { EVENTS } from '../utils/globals';

export class Pipe extends Phaser.Physics.Arcade.Group {
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);

    scene.add.existing(this);
  }

  createPipes(x: number, gapY: number, gapHeight: number, player: Phaser.Physics.Arcade.Sprite) {
    const topHeight = gapY - gapHeight / 2;
    const top = this.create(x, gapY - gapHeight / 2, 'pipe');
    top.setOrigin(0, 1);
    top.setImmovable(true);
    top.setDisplaySize(top.width, topHeight);
    top.body.collision = true;
    top.body.allowGravity = false;

    const bottomHeight = this.scene.scale.height - (gapY - gapHeight / 2);
    const bottom = this.create(x, gapY + gapHeight / 2, 'pipe');
    bottom.setOrigin(0, 0);
    bottom.setImmovable(true);
    bottom.setDisplaySize(bottom.width, bottomHeight);
    bottom.body.collision = true;
    bottom.body.allowGravity = false;

    const zone = this.scene.add.zone(
      x,
      gapY,
      1,
      gapHeight
    );

    this.scene.physics.world.enable(zone);
    const zoneBody = zone.body as Phaser.Physics.Arcade.Body;
    

    this.add(zone)
    zoneBody.setAllowGravity(false)
    zoneBody.setImmovable(true);
    zoneBody.setCollideWorldBounds(false);

    this.scene.physics.add.overlap(player, zone, () => {
        this.scene.events.emit(EVENTS.PLAYER_PASSED_ZONE, { x, gapY });
    });

  }
}
