import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Constants from '../Constants';
import ArrowIcon from '../../assets/arrowIcon.svg';
import ModelIcon from '../../assets/modelIcon.svg';

interface Props {
  label: string;
  onPress: () => void;
}
const RoundButton = ({label, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ModelIcon />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.arrowIcon}>
        <ArrowIcon />
      </View>
    </TouchableOpacity>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Button_Color,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: 'row',
  },
  arrowIcon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  label: {
    marginHorizontal: 20,
  },
});
