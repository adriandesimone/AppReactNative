import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'

const Home = ({ navigation }) => {
    return <>
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
        backgroundColor:'#1f1c22',
    },
    btn:{
        display:'flex',
        position:'absolute',
        backgroundColor:'#68477c',
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