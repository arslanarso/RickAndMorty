import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  AsyncStorage,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {colors} from '../../../styles/colors';
import {getBackgroundColor} from '../actions';

import FastImage from 'react-native-fast-image';

export default ({
  width,
  height,
  image,
  name,
  episodes,
  status,
  select,
  item,
}) => {
  const navigation = useNavigation();

  const [fav, setFav] = useState('');

  const backgroundColor = getBackgroundColor(status);

  const customName =
    status === 'unknown'
      ? name.split(' ')[0].concat('...')
      : name.split(' ')[0];

  function _onPress() {
    select();
    navigation.navigate('watch');
    // console.warn(item)
  }
  const saveData = async () => {
    try {
    const favs = [];
    favs.push(item.name);
    favs.push(item.image);


      await AsyncStorage.setItem("favs", JSON.stringify(favs));
      alert('Data successfully saved');
    } catch (e) {
      alert(e);
    }
  };

  const readData = async () => {
    try {
      const userAge = await AsyncStorage.getItem("favs");

      if (userAge !== null) {
        setFav(userAge);
      }
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };
  console.warn(fav)
  return (
    <TouchableNativeFeedback onPress={() => _onPress()}>
      <View style={[styles.main, {width, backgroundColor}]}>
        <View>
          <FastImage
            style={[styles.image, {width: width - 20, height: height - 20}]}
            source={{
              uri: image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.center}
          />
        </View>
        <View
          style={{
            width: 300,
          }}>
          <Text style={styles.name} numberOfLines={1}>
            {customName}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  main: {
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 6,
    margin: 2,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    borderRadius: 2,
  },
  name: {
    color: colors.dark,
    fontSize: 20,

    textAlign: 'center',
    backgroundColor: 'white',
    marginBottom: 10,
    borderColor: colors.dark,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderTopColor: '#A798C3',
  },
  circle: {
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    bottom: 5,
    height: 30,
    width: 30,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: colors.dark,
  },
  episodes: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.dark,
  },
});
