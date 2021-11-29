import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  View,
  Text,
  Modal,
  Pressable,
} from "react-native";
import StarRating from "react-native-star-rating";
import dateFormat from "dateformat";
import { useState, useEffect } from "react";
import { getMovieDetails } from "../apis/Services";
import { IMAGE_URL } from "../constants/Endpoints";
import Colors from "../constants/Colors";
import PlayButton from "../components/PlayButton";
import VideoPlay from "../components/VideoPlay";

const placeholerImage = require("../assets/images/image.jpg");
const height = Dimensions.get("screen").height;

const Details = ({ route, navigation }: any) => {
  const movieId = route.params.movieId;

  const [movieDetail, setMovieDetail] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovieDetails(movieId).then((movieData) => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, []);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? { uri: `${IMAGE_URL}` + movieDetail.poster_path }
                  : placeholerImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genreContainer}>
                  {movieDetail.genres.map((genre) => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                starSize={30}
                fullStarColor={Colors.coral}
                disabled={true}
                maxStars={5}
                rating={movieDetail.vote_average / 2}
              />
              <Text style={styles.text}>
                {"Vote Average: " + movieDetail.vote_average}
              </Text>
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>
                {"Release Date: " +
                  dateFormat(movieDetail.release_date, "mmmm dd, yyyy")}
              </Text>
            </View>
          </ScrollView>
          <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.videoModal}>
              <VideoPlay onClose={videoShown} />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={Colors.midnightblue} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: height / 2.5,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  genreContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  genre: {
    marginRight: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 11,
    color: Colors.coral,
  },
  overview: {
    padding: 15,
  },
  release: {
    fontWeight: "bold",
    fontSize: 12,
  },
  playButton: {
    position: "absolute",
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Details;
