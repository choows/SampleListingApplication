import { View, Text, StyleSheet, ScrollView, RefreshControl, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Icon, ListItem, Avatar } from "@rneui/themed";
import * as data from '../data.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
function MainScreen({ navigation }) {
    const key = "Sample_Storage_Key";
    const [refreshing, setRefreshing] = React.useState(false);
    const [Listing, setListing] = useState([]);
    const onRefresh = () => {
        //var result_convert = Object.values(data);
        //setListing(result_convert);
        AsyncStorage.getItem(key).then((JV)=>{
            var jsonValue = JSON.parse(JV);
            if(jsonValue == null){
                var result_convert = Object.values(data);
                setListing(result_convert);
                AsyncStorage.setItem(key , JSON.stringify(result_convert));
            }else{
                setListing(jsonValue);
            }
        }).catch((exp)=>{
            console.warn(exp);
        })
    }
    const OnSearch = () => {

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
        navigation.setOptions({
            title: 'Contacts',
            headerTitleAlign: 'center',
            headerRight: () => (
                <TouchableOpacity onPress={OnPlus}>
                    <Icon
                        name='plus'
                        type='font-awesome'
                        color='#ff8c00'
                        size={28} />
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={OnSearch}>
                    <Icon
                        name={'search'}
                        type='font-awesome'
                        color='#ff8c00'
                        size={28} />
                </TouchableOpacity>
            )
        })
    }, []);
    return (
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