export class Score extends Phaser.GameObjects.Text {
  private score: number = 0;
  private highScore: number = 0;

  constructor(scene: Phaser.Scene) {
    const scoreStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '32px',
      color: '#ffffff',
      fontStyle: 'bold'
    };

    const centerX = scene.scale.width / 2;
    const centerY = scene.scale.height / 6;

    super(scene, centerX, centerY, 'Score: 0', scoreStyle);
    scene.add.existing(this);
    this.setOrigin(0.5);
    this.setDepth(1);

    const savedScore = localStorage.getItem('highScore') ?? '0';
    this.highScore = parseInt(savedScore);
  }

  increaseScore(amount: number = 1): void {
    this.score += amount;
    this.updateScoreText();
  }

  getScore() {
    return this.score;
  }

  getHighscore() {
    return this.highScore;
  }

  saveHighScore() {
    const currentScore = this.score;

    if (this.highScore === 0) {
      localStorage.setItem('highScore', currentScore.toString());
    } else if (currentScore > this.highScore) {
      localStorage.setItem('highScore', currentScore.toString());
    }
  }

  private updateScoreText(): void {
    this.setText(`Score: ${this.score}`);
  }
}
