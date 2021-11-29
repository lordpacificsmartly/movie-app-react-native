import * as React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import Card from "./Card";

class List extends React.PureComponent {

  render() {
    const { navigation, title, content }: any = this.props;
    return (

     <View>
         <View style={styles.list}>
             <Text style={styles.text}>{title}</Text>
         </View>
         <View>
        <FlatList
          data={content}
          horizontal={true}
          renderItem={({ item }) => <Card navigation={navigation} item={item}/>}
        />
      </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.crimson,
    },
    list: {
        marginTop: 25,
        marginLeft: 10,
    }
})
export default List;
