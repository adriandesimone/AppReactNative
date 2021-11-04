import React from 'react';
import {StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'

const Cities = ({ navigation }) => {
    return <>
    <View style={styles.container}>
        <ScrollView style={styles.scroll}>
            <View style={styles.form_group}>
                <TextInput
                    style={styles.form_input}
                    placeholderTextColor="#a0a0a0"
                    placeholder="Ingresar ciudad"
                />
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.btn}
                    onPress={() => navigation.navigate('Weather')}
                >
                    <Icon name="magnify" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>
    </>;
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#1f1c22',
    },
    scroll:{
        paddingHorizontal:15,
    },
    form_group:{
        flexDirection:'row',
        marginBottom:30,
        marginTop:10,
        alignItems:'center',
    },
    form_input:{
        borderBottomColor:'#e3e3e3',
        borderBottomWidth:1,
        paddingHorizontal:10,
        width:'80%',
    },
    btn:{
        flex:1,
        display:'flex',
        backgroundColor:'#68477c',
        justifyContent:'center',
        alignItems:'center',
        height:36,
        borderRadius:5,
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

export default Cities;