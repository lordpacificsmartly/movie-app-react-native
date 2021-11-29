import * as React from "react";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  getDocumentaries,
  getFamilyMovies,
  getPopularMovies,
  getPopularTv,
  getUpcomingMovies,
} from "../apis/Services";
import Error from "../components/Error";
import { SliderBox } from "react-native-image-slider-box";
import { IMAGE_URL } from "../constants/Endpoints";
import Colors from "../constants/Colors";
import List from "../components/List";

const dimens = Dimensions.get("screen");
console.log(dimens);

const Home = ({ navigation }: any) => {
  const [moviesPosters, setMoviesPosters] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaries, setDocumentaries] = useState();

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaries(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentariesData,
        ]) => {
          const imagePostersArray: any = [];
          upcomingMoviesData.forEach((movie) => {
            imagePostersArray.push(`${IMAGE_URL}` + movie.poster_path);
          });

          setMoviesPosters(imagePostersArray);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaries(documentariesData);
        }
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <>
      {loaded && !error && (
        <ScrollView>
          {moviesPosters && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesPosters}
                sliderBoxHeight={dimens.height / 1.5}
                dotStyle={styles.sliderStyle}
                autoplay={true}
                circleLoop={true}
              />
            </View>
          )}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            </View>
          )}
          {popularTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular TV Shows"
                content={popularTv}
              />
            </View>
          )}
          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
              />
            </View>
          )}
          {documentaries && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Documentaries"
                content={documentaries}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={Colors.midnightblue} />
        </View>
      )}
      {error && <Error />}
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Home;
