import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Header } from "@rneui/themed";
import AsyncStorage from '@react-native-async-storage/async-storage';
function DetailScreen({ route, navigation }) {

    var { id, firstName, lastName, email, phone } = route.params;

    const [FirstName, setFirstName] = useState(firstName);
    const [LastName, setLastName] = useState(lastName);
    const [Email, setEmail] = useState(email);
    const [Phone, setPhone] = useState(phone);

    const ref_first_name_input = useRef();
    const ref_last_name_input = useRef();
    const ref_email_input = useRef();
    const ref_phone_number_input = useRef();

    const Save = () => {
        if(!FirstName){
            Alert.prompt("First Name Required");
            return;
        }
        if(!LastName){
            Alert.prompt("Last Name Required");
            return;
        }
        var result_json = {
            id: id,
            firstName: FirstName,
            lastName: LastName,
            email: Email,
            phone: Phone
        }
        var key = "Sample_Storage_Key";
        AsyncStorage.getItem(key).then((JV)=>{
            var jsonValue = JSON.parse(JV);
            if(jsonValue != null){
                var idx = -1 ;
                for(var i in jsonValue){
                    var val = jsonValue[i];
                    if(val.id == id){
                        idx = i ;
                    }
                }
                if(idx >= 0){
                    jsonValue[idx] = result_json;
                    AsyncStorage.setItem(key , JSON.stringify(jsonValue)).then(()=>{
                        Alert.alert("Saved");
                        navigation.goBack();
                    }).catch((exp)=>{
                        console.warn(exp);
                    })
                }
            }
        }).catch((exp)=>{
            console.warn(exp);
        })
    }

    return (
        <View style={c_styles.container}>
            <Header
                placement="left"
                backgroundColor={'white'}
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={c_styles.HeaderText}>Cancel</Text>
                    </TouchableOpacity>}
                centerComponent={null}
                rightComponent={
                    <TouchableOpacity onPress={() => Save()}>
                        <Text style={c_styles.HeaderText}>Save</Text>
                    </TouchableOpacity>
                }
            />
            <View style={c_styles.Image_View}>
                <Avatar source={require('../ff8c00.png')} rounded size={120} />
            </View>
            <View style={c_styles.Title_View_Header}>
                <Text style={c_styles.Title_View_Text}>Main Information</Text>
            </View>
            <View style={c_styles.Detail_View}>
                <View style={c_styles.RowDirection}>
                    <View style={c_styles.Detail_View_Title}>
                        <Text style={c_styles.View_Text}>First Name</Text>
                    </View>
                    <View style={c_styles.Detail_View_Descp}>
                        <TextInput
                            style={c_styles.TextInputStyle}
                            value={FirstName}
                            returnKeyType="next"
                            onChangeText={(text) => { setFirstName(text); }}
                            ref={ref_first_name_input}
                            onSubmitEditing={() => ref_last_name_input.current.focus()}
                        />
                    </View>
                </View>
                <View style={c_styles.RowDirection}>
                    <View style={c_styles.Detail_View_Title}>
                        <Text style={c_styles.View_Text}>Last Name</Text>
                    </View>
                    <View style={c_styles.Detail_View_Descp}>
                        <TextInput style={c_styles.TextInputStyle}
                            value={LastName}
                            returnKeyType="next"
                            ref={ref_last_name_input}
                            onChangeText={(text) => { setLastName(text) }}
                            onSubmitEditing={() => ref_email_input.current.focus()} />
                    </View>
                </View>
            </View>
            <View style={c_styles.Title_View_Header}>
                <Text style={c_styles.Title_View_Text}>Sub Information</Text>
            </View>
            <View style={c_styles.Detail_View}>
                <View style={c_styles.RowDirection}>
                    <View style={c_styles.Detail_View_Title}>
                        <Text style={c_styles.View_Text}>Email</Text>
                    </View>
                    <View style={c_styles.Detail_View_Descp}>
                        <TextInput style={c_styles.TextInputStyle}
                            value={Email}
                            returnKeyType="next"
                            ref={ref_email_input}
                            onChangeText={(text) => { setEmail(text) }}
                            onSubmitEditing={() => ref_phone_number_input.current.focus()} />
                    </View>
                </View>
                <View style={c_styles.RowDirection}>
                    <View style={c_styles.Detail_View_Title}>
                        <Text style={c_styles.View_Text}>Phone</Text>
                    </View>
                    <View style={c_styles.Detail_View_Descp}>
                        <TextInput style={c_styles.TextInputStyle}
                            value={Phone}
                            returnKeyType="next"
                            onChangeText={(text) => { setPhone(text) }}
                            ref={ref_phone_number_input} />
                    </View>
                </View>
            </View>
        </View>
    );
}
const c_styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    scrollView: {
        width: '100%',
        height: '100%'
    },
    TextInputStyle: {
        width: '90%',
        height: 40,
        borderColor: '#bdbdbd',
        borderRadius: 10,
        margin: 5,
        paddingHorizontal: 20,
        borderWidth: 1
    },
    HeaderText: {
        color: '#ff8c00',
        fontSize: 20
    },
    Title_View_Header: {
        backgroundColor: '#e0dede',
        height: '5%',
        padding: 10,
        fontSize: 10,
        fontWeight: 'bolder',
        color: 'black'
    },
    Detail_View: {
        minHeight: '10%',
        width: '100%',
        padding: 10
    },
    RowDirection: {
        width: '100%',
        flexDirection: 'row'
    },
    Detail_View_Title: {
        width: '25%',
        height: '100%'
    },
    Detail_View_Descp: {
        width: '75%',
        height: '100%'
    },
    Title_View_Text: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 15,
        flexDirection: 'row'
    },
    View_Text: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 15,
        height: 40,
        textAlignVertical: 'center',
        margin: 5,
    },
    Image_View: {
        alignContent: 'center',
        alignItems: 'center',
        paddingVertical: 25
    }
});

export default DetailScreen;