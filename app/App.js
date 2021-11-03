import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, StatusBar, Animated} from 'react-native';
import ClimaLogo from './assets/weather_icon.png';

const App = () => {
  const [animated, setAnimated] = useState(false);
  const [fadeInThenOut] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeInThenOut, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(fadeInThenOut, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => setAnimated(true));
    });
  }, []);

  if (!animated) {
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor="#142950"
          barStyle="light-content"
        />
        <View style={styles.container}>
          <Animated.Image
            source={ClimaLogo}
            style={[styles.image, {opacity: fadeInThenOut}]}
          />
          <Animated.Text style={[styles.text, {opacity: fadeInThenOut}]}>
            Clima App
          </Animated.Text>
        </View>
      </>
    );
  } else {
    return (
      <View>
        <Text>Inicio la Aplicación</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#142950',
    justifyContent: 'space-between',
  },
  image: {
    marginTop: '35%',
    width: 256,
    height: 256,
    resizeMode: 'contain',
  },
  text: {
    color: '#fff',
    fontSize: 50,
    marginBottom: '30%',
  },
});

export default App;
