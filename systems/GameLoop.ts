import { GameEngineSystem } from 'react-native-game-engine';
import { generateRandomNumber, Position } from '../App';
import Constants from '../Constants';

const GameLoop: GameEngineSystem = (entities, { events, dispatch }) => {
  const { head, food, tail } = entities;

  if (events.length) {
    events.forEach((e) => {
      switch (e) {
        case 'move-up':
          if (head.yspeed === 1) return;
          head.yspeed = -1;
          head.xspeed = 0;
          return;
        case 'move-right':
          if (head.xspeed === -1) return;
          head.xspeed = 1;
          head.yspeed = 0;
          return;
        case 'move-down':
          if (head.yspeed === -1) return;
          head.yspeed = 1;
          head.xspeed = 0;
          return;
        case 'move-left':
          if (head.xspeed === 1) return;
          head.xspeed = -1;
          head.yspeed = 0;
          return;
        default:
          return;
      }
    });
  }

  head.nextMove -= 1;
  if (head.nextMove === 0) {
    head.nextMove = head.updateFrequency;

    if (
      head.position[0] + head.xspeed < 0 ||
      head.position[0] + head.xspeed >= Constants.GRID_SIZE ||
      head.position[1] + head.yspeed < 0 ||
      head.position[1] + head.yspeed >= Constants.GRID_SIZE
    ) {
      console.log('1', head.position);
      dispatch('game-over');
    } else {
      const originalHead = [...head.position];
      head.position[0] += head.xspeed;
      head.position[1] += head.yspeed;

      if (tail.length > 1) {
        tail.elements = [
          [...head.position],
          ...tail.elements.slice(0, tail.elements.length - 1),
        ];

        tail.elements.forEach((el: Position) => {
          if (head.position[0] === el[0] && head.position[1] === el[1]) {
            dispatch('game-over');
          }
        });
      }

      if (
        head.position[0] == food.position[0] &&
        head.position[1] == food.position[1]
      ) {
        tail.elements = [
          [head.position[0], head.position[1]],
          ...tail.elements,
        ];

        food.position = [
          generateRandomNumber(0, Constants.GRID_SIZE - 1),
          generateRandomNumber(0, Constants.GRID_SIZE - 1),
        ];
      }
    }
  }

  return entities;
};

export default GameLoop;
