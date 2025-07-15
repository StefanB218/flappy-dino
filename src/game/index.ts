import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';

// Utility to detect mobile devices
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

const DESKTOP_WIDTH = 1024;
const DESKTOP_HEIGHT = 768;

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: isMobile ? window.innerWidth : DESKTOP_WIDTH,
  height: isMobile ? window.innerHeight : DESKTOP_HEIGHT,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scale: {
    mode: isMobile ? Phaser.Scale.RESIZE : Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800, x: 0 },
      debug: localStorage.getItem('debug') === 'true' || false,
    },
  },
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};

const StartGame = (parent: string) => {
  const game = new Game({ ...config, parent });

  // On mobile, update size on resize
  if (isMobile) {
    window.addEventListener('resize', () => {
      game.scale.resize(window.innerWidth, window.innerHeight);
    });
  }

  // Enable HMR
  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      console.log('HMR update detected');
    });

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
