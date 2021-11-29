import * as React from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/Ionicons";

const defaultprops = {
  main: false,
};

class Navbar extends React.PureComponent {
  render() {
    const { navigation, main }: any = this.props;

    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainNav}>
              <Image  style={styles.logo} source={require('../assets/images/logo.jpeg')}/>
              <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}
            >
              <Icon name={"search-outline"} size={30} color={Colors.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name={"chevron-back"} size={40} color={Colors.white} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    logo: {
        width: 45,
        height: 45,
        marginLeft: 6
    },
    mainNav: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    }
})

export default Navbar;
