import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300, x: 0 }, // Apply gravity to the y-axis
      debug: true, // Set to true to see physics bodies in the game
    },
  },
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};

const StartGame = (parent: string) => {
  const game = new Game({ ...config, parent });

  // Enable HMR
  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      console.log('HMR update detected');
      // Don't call startGame() here - it will be called by the updated module
    });

    // Clean up when module is disposed
    import.meta.hot.dispose(() => {
      console.log('Module disposed, cleaning up game');
      if (game) {
        game.destroy(true);
        console.log('Game destroyed');
      }
    });
  }

  return game;
};

export default StartGame;
