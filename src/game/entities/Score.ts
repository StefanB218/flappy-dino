export class Score extends Phaser.GameObjects.Text {
  private score: number = 0;
  private highScore: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const scoreStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '32px',
      color: '#ffffff',
    };

    super(scene, x, y, 'Score: 0', scoreStyle);
    scene.add.existing(this);
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
