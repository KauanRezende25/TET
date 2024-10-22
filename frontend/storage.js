import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('id', value);
    } catch (e) {
      console.log(e)
    }
};

export const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('id');
      if (value !== null) {
        return value
      }
    } catch (e) {
      // error reading value
    }
};