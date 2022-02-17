import React from 'react';
import { View } from 'react-native';
import { CompProps } from '../App';

const Head = ({ position, size }: CompProps) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: 'red',
        position: 'absolute',
        left: position[0] * size,
        top: position[1] * size,
      }}
    />
  );
};

export default Head;
