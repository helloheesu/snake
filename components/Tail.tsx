import React from 'react';
import { View } from 'react-native';
import { CompProps, Position } from '../App';
import Constants from '../Constants';

interface Props {
  elements: Position[];
  size: number;
}
const Tail = ({ elements, size }: Props) => {
  const tailList = elements.map((el, idx) => {
    <View
      key={idx}
      style={{
        width: size,
        height: size,
        backgroundColor: 'red',
        position: 'absolute',
        left: el[0] * size,
        top: el[1] * size,
      }}
    />;
  });
  return (
    <View
      style={{
        width: Constants.GRID_SIZE * size,
        height: Constants.GRID_SIZE * size,
      }}
    >
      {tailList}
    </View>
  );
};

export default Tail;
