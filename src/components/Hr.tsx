import React from 'react';
import {View} from 'react-native';
import Constants from '../Constants';

const Hr = () => {
  return (
    <View
      style={{
        borderTopWidth: 0.5,
        borderColor: Constants.Text_Color,
        marginTop: 5,
        marginBottom: 10,
      }}
    />
  );
};

export {Hr};
