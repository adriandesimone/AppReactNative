import React from 'react';
import {TouchableOpacity, StatusBar, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'

const Home = ({ navigation }) => {
    return <>
        <StatusBar
          animated={true}
          backgroundColor="#142950"
          barStyle="light-content"
        />
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={() => navigation.navigate('Cities')}>
                <Icon name="plus" size={36} color="#fff" />
            </TouchableOpacity>
        </View>
    </>;
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    btn:{
        display:'flex',
        position:'absolute',
        backgroundColor:'#142950',
        justifyContent:'center',
        alignItems:'center',
        width:48,
        height:48,
        borderRadius:100,
        bottom:20,
        right:20,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5
    },
    text:{
        color:'#fff',
    },
});

export default Home;