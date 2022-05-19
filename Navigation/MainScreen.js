import { View, Text, StyleSheet, ScrollView, RefreshControl, Button, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Icon, ListItem, Avatar, Header } from "@rneui/themed";
import * as Rawdata from '../data.json';

function MainScreen({ route, navigation }) {

    const [refreshing, setRefreshing] = React.useState(false);
    const [Listing, setListing] = useState([]);
    const [SearchResult,  setSearchResult] = useState([]);
    const [ShowSearch, setShowSearch] = useState(false);
    useEffect(() => {
        if (route.params?.record) {
            const record = route.params?.record;
            for (var idx in Listing) {
                if (Listing[idx].id === record.id) {
                    Listing[idx] = record;
                    setListing([...Listing]);
                }
            }
        }
    }, [route.params?.record]);
    useEffect(() => {
        if (route.params?.new_record) {
            Listing.push(route.params?.new_record);
            setListing([...Listing]);
        }
    }, [route.params?.new_record]);
    const OnRefresh = () => {
        setListing([...Listing]);
    }

    const Search = (text) => {
        if(text){
            let SearchResult = [];
            for (var i in Listing) {
                if (Listing[i].firstName) {
                    if (Listing[i].firstName.includes(text)) {
                        SearchResult.push(Listing[i]);
                        continue;
                    }
                }
                if (Listing[i].lastName) {
                    if (Listing[i].lastName.includes(text)) {
                        SearchResult.push(Listing[i]);
                        continue;
                    }
                }
            }
            setSearchResult(SearchResult);
        }else{
            setSearchResult([])
        }
        
    }
    const OnSearchClicked = (t) => {
        setShowSearch(t)
    }
    const OnPlusClicked = () => {
        navigation.navigate('New');
    }
    const ToDetail = (id) => {
        const result = Listing.filter(x => {
            return x.id == id
        })[0];
        if (result)
            navigation.navigate('Detail', result);
    }
    useEffect(() => {
        const RecordsValue = Object.values(Rawdata);
        setListing(RecordsValue);
    }, []);

    return (
        <View
            style={Styles.container}>
            <Header
                placement="centre"
                backgroundColor={'white'}
                leftComponent={
                    <TouchableOpacity onPress={() => { OnSearchClicked(!ShowSearch) }}>
                        <Icon
                            name={ShowSearch ? 'close' : 'search'}
                            type='font-awesome'
                            color='#ff8c00'
                            size={28} />
                    </TouchableOpacity>
                }
                centerComponent={<Text style={Styles.HeaderCenter}>Contacts</Text>}
                rightComponent={
                    <TouchableOpacity onPress={OnPlusClicked}>
                        <Icon
                            name='plus'
                            type='font-awesome'
                            color='#ff8c00'
                            size={28} />
                    </TouchableOpacity>
                }
            />
            {
                ShowSearch && <View
                    style={Styles.SearchView}>
                    <TextInput
                        onChangeText={Search}
                        style={Styles.TextInputStyle} />
                </View>
            }

            <ScrollView
                style={Styles.scrollView}
                scrollEnabled={true}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={OnRefresh} />
                }>
                {
                    SearchResult.length > 0 ? 
                    SearchResult.map((l, i) => (
                        <ListItem
                            key={i}
                            bottomDivider
                            onPress={() => { ToDetail(l.id) }}>
                            <Avatar
                                source={require('../ff8c00.png')}
                                rounded />
                            <ListItem.Content>
                                <ListItem.Title>{l.firstName + " " + l.lastName}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))

                     :  Listing.map((l, i) => (
                        <ListItem
                            key={i}
                            bottomDivider
                            onPress={() => { ToDetail(l.id) }}>
                            <Avatar
                                source={require('../ff8c00.png')}
                                rounded />
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
        width: '100%',
        height: '100%',
        borderWidth: 0.5,
        borderRadius: 15,
        paddingHorizontal: 20
    },
    SearchView: {
        padding: 6,
        height: '7%',
        width: '100%'
    },
    HeaderCenter: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
export default MainScreen;