import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from "../constants/Colors";

class PlayButton extends React.PureComponent {
  render() {
      const { handlePress }: any = this.props;
    return (
      <Pressable onPress={()=> handlePress()} style={styles.button}>
       <Icon name={'caret-forward-outline'} size={30} color={Colors.white} />
      </Pressable>
    );
  }
}
const styles = StyleSheet.create({
    button: {
        alignContent: 'center',
        borderRadius: 30,
        width: 50,
        padding: 10,
        backgroundColor: Colors.crimson,
    }
})

export default PlayButton;
