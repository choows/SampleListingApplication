import { View, Text } from 'react-native';
import React from 'react';
function DetailScreen({ route, navigation }) {
    /*
    "id": "5c8a80f575270ddb54a18f86",
    "firstName": "Lidia",
    "lastName": "Wilkins",
    "email": "lidiawilkins@furnafix.com",
    "phone": "(997) 482-3866"*/

    const { id, firstName , lastName , email , phone } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{firstName}</Text>
        </View>
    );
}
export default DetailScreen;