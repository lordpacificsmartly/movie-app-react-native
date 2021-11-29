import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const defaultProps = {
    errorText1: 'Oops! Something went wrong.',
    errorText2: 'Make sure you are online and restart the application.'
}

class Error extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{defaultProps.errorText1}</Text>
                <Text style={styles.text}>{defaultProps.errorText2}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors.crimson,
        fontWeight: 'bold',

    }
})

export default Error;