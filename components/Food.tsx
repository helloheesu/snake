import React from 'react';
import { View } from 'react-native';
import { CompProps } from '../App';

const Food = ({ position, size }: CompProps) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: 'green',
        position: 'absolute',
        left: position[0] * size,
        top: position[1] * size,
        borderRadius: 50,
      }}
    />
  );
};

export default Food;
