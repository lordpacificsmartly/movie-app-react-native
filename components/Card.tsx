import * as React from "react";
import { TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { IMAGE_URL } from "../constants/Endpoints";

const placeholerImage = require("../assets/images/image.jpg");

class Card extends React.PureComponent {
  render() {
    const { navigation, item }: any = this.props;

    return (
      <TouchableOpacity onPress={()=> navigation.navigate('Details', {movieId: item.id})} style={styles.container}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={
            item.poster_path
              ? { uri: `${IMAGE_URL}` + item.poster_path }
              : placeholerImage
          }
        />
        {item.poster_path && (<Text style={styles.movieName}>{item.title}</Text>)}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: "relative",
    alignItems: 'center',
    height: 200,
    marginBottom: 8,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieName: {
      position: 'absolute',
      width: 100,
      textAlign: 'center',
      top: 10,
  }
});


export default Card;
