import { View, Text, StyleSheet, ScrollView, RefreshControl, Button, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Icon, ListItem, Avatar, Header } from "@rneui/themed";
import * as data from '../data.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
function MainScreen({ navigation }) {
    const key = "Sample_Storage_Key";
    const [refreshing, setRefreshing] = React.useState(false);
    const [Listing, setListing] = useState([]);
    const [ShowSearch, setShowSearch] = useState(false);
    const onRefresh = () => {
        //var result_convert = Object.values(data);
        //setListing(result_convert);
        AsyncStorage.getItem(key).then((JV) => {
            var jsonValue = JSON.parse(JV);
            if (jsonValue == null) {
                var result_convert = Object.values(data);
                setListing(result_convert);
                AsyncStorage.setItem(key, JSON.stringify(result_convert));
            } else {
                setListing(jsonValue);
            }
        }).catch((exp) => {
            console.warn(exp);
        })
    }
    const Search = (text) => {
        if (text) {
            AsyncStorage.getItem(key).then((JV) => {
                var jsonValue = JSON.parse(JV);
                var SearchResult = [];
                if (jsonValue != null) {
                    for (var i in jsonValue) {
                        if (jsonValue[i].firstName) {
                            if (jsonValue[i].firstName.includes(text)) {
                                SearchResult.push(jsonValue[i]);
                                continue;
                            }
                        }
                        if (jsonValue[i].lastName) {
                            if (jsonValue[i].lastName.includes(text)) {
                                SearchResult.push(jsonValue[i]);
                                continue;
                            }
                        }

                    }
                }
                setListing(SearchResult);
            }).catch((exp) => {
                console.warn(exp);
            })
        } else {
            onRefresh();
            console.log("Refresh")
        }
    }
    const OnSearch = (t) => {
        setShowSearch(t)
    }
    const OnPlus = () => {
        navigation.navigate('New');
    }
    const ToDetail = (id) => {
        var result = Listing.filter(x => {
            return x.id == id
        })[0];
        if (result)
            navigation.navigate('Detail', result);

    }
    useEffect(() => {
        onRefresh();
    }, []);
    return (
        <View style={c_styles.container}>
            <Header
                placement="centre"
                backgroundColor={'white'}
                leftComponent={
                    <TouchableOpacity onPress={() => { OnSearch(!ShowSearch) }}>
                        {
                            ShowSearch ?
                                <Icon
                                    name={'close'}
                                    type='font-awesome'
                                    color='#ff8c00'
                                    size={28} /> :
                                <Icon
                                    name={'search'}
                                    type='font-awesome'
                                    color='#ff8c00'
                                    size={28} />
                        }
                    </TouchableOpacity>}
                centerComponent={<Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Contacts</Text>}
                rightComponent={
                    <TouchableOpacity onPress={OnPlus}>
                        <Icon
                            name='plus'
                            type='font-awesome'
                            color='#ff8c00'
                            size={28} />
                    </TouchableOpacity>
                }
            />
            {
                ShowSearch && <View style={{ padding: 6, height: '7%', width: '100%' }}>
                    <TextInput onChangeText={(text) => { Search(text) }} style={{ width: '100%', height: '100%', borderWidth: 0.5, borderRadius: 15, paddingHorizontal: 20 }} />
                </View>
            }

            <ScrollView
                style={c_styles.scrollView}
                scrollEnabled={true}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                {
                    Listing.map((l, i) => (
                        <ListItem key={i} bottomDivider onPress={() => { ToDetail(l.id) }}>
                            <Avatar source={require('../ff8c00.png')} rounded />
                            <ListItem.Content>
                                <ListItem.Title>{l.firstName + " " + l.lastName}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </ScrollView>
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
    }
});
export default MainScreen;