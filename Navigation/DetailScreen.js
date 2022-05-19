import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, {useState, useRef } from 'react';
import { Avatar, Header } from "@rneui/themed";
function DetailScreen({ route, navigation }) {

    const { id, firstName, lastName, email, phone } = route.params;

    const [FirstName, setFirstName] = useState(firstName);
    const [LastName, setLastName] = useState(lastName);
    const [Email, setEmail] = useState(email);
    const [Phone, setPhone] = useState(phone);

    const FirstNameRef = useRef();
    const LastNameRef = useRef();
    const EmailRef = useRef();
    const PhoneNumberRef = useRef();

    const Save = () => {
        if (!FirstName) {
            Alert.prompt("First Name Required");
            return;
        }
        if (!LastName) {
            Alert.prompt("Last Name Required");
            return;
        }
        navigation.navigate({
            name: 'Home',
            params: {
                record: {
                    id: id,
                    firstName: FirstName,
                    lastName: LastName,
                    email: Email,
                    phone: Phone
                }
            },
            merge: true,
        });
    }

    return (
        <View style={Styles.container}>
            <Header
                placement="left"
                backgroundColor={'white'}
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={Styles.HeaderText}>Cancel</Text>
                    </TouchableOpacity>
                }
                centerComponent={null}
                rightComponent={
                    <TouchableOpacity onPress={() => Save()}>
                        <Text style={Styles.HeaderText}>Save</Text>
                    </TouchableOpacity>
                }
            />
            <View style={Styles.ImageView}>
                <Avatar source={require('../ff8c00.png')} rounded size={120} />
            </View>
            <View style={Styles.TitleViewHeader}>
                <Text style={Styles.TitleViewText}>Main Information</Text>
            </View>
            <View style={Styles.DetailView}>
                <View style={Styles.RowDirection}>
                    <View style={Styles.DetailViewTitle}>
                        <Text style={Styles.ViewText}>First Name</Text>
                    </View>
                    <View style={Styles.DetailViewDescp}>
                        <TextInput
                            style={Styles.TextInputStyle}
                            value={FirstName}
                            returnKeyType="next"
                            onChangeText={setFirstName}
                            ref={FirstNameRef}
                            onSubmitEditing={() => LastNameRef.current.focus()}
                        />
                    </View>
                </View>
                <View style={Styles.RowDirection}>
                    <View style={Styles.DetailViewTitle}>
                        <Text style={Styles.ViewText}>Last Name</Text>
                    </View>
                    <View style={Styles.DetailViewDescp}>
                        <TextInput style={Styles.TextInputStyle}
                            value={LastName}
                            returnKeyType="next"
                            ref={LastNameRef}
                            onChangeText={setLastName}
                            onSubmitEditing={() => EmailRef.current.focus()} />
                    </View>
                </View>
            </View>
            <View style={Styles.TitleViewHeader}>
                <Text style={Styles.TitleViewText}>Sub Information</Text>
            </View>
            <View style={Styles.DetailView}>
                <View style={Styles.RowDirection}>
                    <View style={Styles.DetailViewTitle}>
                        <Text style={Styles.ViewText}>Email</Text>
                    </View>
                    <View style={Styles.DetailViewDescp}>
                        <TextInput style={Styles.TextInputStyle}
                            value={Email}
                            returnKeyType="next"
                            ref={EmailRef}
                            onChangeText={setEmail}
                            onSubmitEditing={() => PhoneNumberRef.current.focus()} />
                    </View>
                </View>
                <View style={Styles.RowDirection}>
                    <View style={Styles.DetailViewTitle}>
                        <Text style={Styles.ViewText}>Phone</Text>
                    </View>
                    <View style={Styles.DetailViewDescp}>
                        <TextInput style={Styles.TextInputStyle}
                            value={Phone}
                            returnKeyType="next"
                            onChangeText={setPhone}
                            ref={PhoneNumberRef} />
                    </View>
                </View>
            </View>
        </View>
    );
}
const Styles = StyleSheet.create({
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
    TitleViewHeader: {
        backgroundColor: '#e0dede',
        height: '5%',
        padding: 10,
        fontSize: 10,
        fontWeight: 'bolder',
        color: 'black'
    },
    DetailView: {
        minHeight: '10%',
        width: '100%',
        padding: 10
    },
    RowDirection: {
        width: '100%',
        flexDirection: 'row'
    },
    DetailViewTitle: {
        width: '25%',
        height: '100%'
    },
    DetailViewDescp: {
        width: '75%',
        height: '100%'
    },
    TitleViewText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 15,
        flexDirection: 'row'
    },
    ViewText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 15,
        height: 40,
        textAlignVertical: 'center',
        margin: 5,
    },
    ImageView: {
        alignContent: 'center',
        alignItems: 'center',
        paddingVertical: 25
    }
});

export default DetailScreen;