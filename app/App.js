import React, {useState, useEffect} from 'react';
import {Animated, StatusBar, StyleSheet, View} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ClimaLogo from './assets/weather_icon.png';
import Home from './screens/Home/Home';
import Cities from './screens/Cities';
import Weather from './screens/Weather/Weather';

const Stack = createNativeStackNavigator();

const App = () => {
  const [animated, setAnimated] = useState(false);
  const [fadeInThenOut] = useState(new Animated.Value(0));

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#1f1c22',
    },
  };

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
          backgroundColor="#664479"
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View style={styles.containerLogo}>
            <Animated.Image
              source={ClimaLogo}
              style={[styles.image, {opacity: fadeInThenOut}]}
            />
          </View>
          <View style={styles.containerText}>
            <Animated.Text style={[styles.text, {opacity: fadeInThenOut}]}>
              Clima App
            </Animated.Text>
            <Animated.Text style={[styles.textSmall, {opacity: fadeInThenOut}]}>
              Aplicación para gestionar el clima de distintas ciudades
            </Animated.Text>
          </View>
        </View>
      </>
    );
  } else {
    return (
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Mis Ciudades',
              headerStyle: {
                backgroundColor: '#4d305e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Cities"
            component={Cities}
            options={{
              title: 'Agregar Ciudad',
              headerStyle: {
                backgroundColor: '#4d305e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Weather"
            component={Weather}
            options={{
              title: 'Pronóstico',
              headerStyle: {
                backgroundColor: '#4d305e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1f1c22',
    justifyContent: 'space-between',
  },
  containerLogo: {
    flex: 0.6,
  },
  containerText: {
    flex: 0.4,
  },
  image: {
    marginTop: '35%',
    width: 256,
    height: 256,
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 50,
  },
  textSmall: {
    textAlign: 'center',
    color: '#c2c2c2',
    fontSize: 16,
    marginTop: 5,
  },
});

export default App;
