import { Scene, GameObjects } from 'phaser';

export class Background {
  private layers: GameObjects.TileSprite[] = [];
  private speeds: number[] = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

  constructor(scene: Scene) {
    for (let i = 0; i < 9; i++) {
      const layer = scene.add.tileSprite(
        scene.scale.width / 2,
        scene.scale.height / 2,
        scene.scale.width,
        scene.scale.height,
        `paralax${i}`
      );
      layer.setDepth(-10 + i);
      this.layers.push(layer);
    }
  }

  update() {
    for (let i = 0; i < this.layers.length; i++) {
      const layer = this.layers[i];
      layer.tilePositionX += this.speeds[i];
    }
  }
}
