import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Food from './components/Food';
import Head from './components/Head';
import Tail from './components/Tail';
import Constants from './Constants';
import GameLoop from './systems/GameLoop';

export type Position = [number, number];
export interface CompProps {
  position: Position;
  size: number;
}

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function App() {
  const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const engine = useRef<GameEngine>(null);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const resetGame = () => {
    engine.current?.swap({
      head: {
        position: [0, 0],
        size: Constants.CELL_SIZE,
        updateFrequency: 10,
        nextMove: 10,
        xspeed: 0,
        yspeed: 0,
        renderer: <Head />,
      },
      food: {
        position: [
          generateRandomNumber(0, Constants.GRID_SIZE - 1),
          generateRandomNumber(0, Constants.GRID_SIZE - 1),
        ],
        size: Constants.CELL_SIZE,
        updateFrequency: 10,
        nextMove: 10,
        xspeed: 0,
        yspeed: 0,
        renderer: <Food />,
      },
      tail: {
        size: Constants.CELL_SIZE,
        elements: [],
        renderer: <Tail />,
      },
    });
    setIsGameRunning(true);
  };

  return (
    <View style={styles.canvas}>
      <GameEngine
        ref={engine}
        style={{
          width: BoardSize,
          height: BoardSize,
          flex: undefined,
          backgroundColor: '#fff',
        }}
        entities={{
          head: {
            position: [0, 0],
            size: Constants.CELL_SIZE,
            updateFrequency: 10,
            nextMove: 10,
            xspeed: 0,
            yspeed: 0,
            renderer: <Head />,
          },
          food: {
            position: [
              generateRandomNumber(0, Constants.GRID_SIZE - 1),
              generateRandomNumber(0, Constants.GRID_SIZE - 1),
            ],
            size: Constants.CELL_SIZE,
            renderer: <Food />,
          },
          tail: {
            size: Constants.CELL_SIZE,
            elements: [],
            renderer: <Tail />,
          },
        }}
        systems={[GameLoop]}
        running={isGameRunning}
        onEvent={(e: any) => {
          switch (e) {
            case 'game-over':
              alert('Game over!');
              setIsGameRunning(false);
              break;

            default:
              break;
          }
        }}
      />
      <View style={styles.controlContainer}>
        <View style={styles.controllerRow}>
          <TouchableOpacity onPress={() => engine.current?.dispatch('move-up')}>
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => engine.current?.dispatch('move-left')}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
          <View
            style={[styles.controlBtn, { backgroundColor: 'transparent' }]}
          />
          <TouchableOpacity
            onPress={() => engine.current?.dispatch('move-right')}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => engine.current?.dispatch('move-down')}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
      </View>
      {!isGameRunning && (
        <TouchableOpacity onPress={resetGame}>
          <Text
            style={{
              color: 'white',
              marginTop: 15,
              fontSize: 22,
              padding: 10,
              backgroundColor: 'grey',
              borderRadius: 10,
            }}
          >
            Start New Game
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlContainer: {
    marginTop: 10,
  },
  controllerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBtn: {
    backgroundColor: 'yellow',
    width: 100,
    height: 100,
  },
});
