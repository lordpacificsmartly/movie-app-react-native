import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { searchMovieTv } from "../apis/Services";
import Card from "../components/Card";
import Error from "../components/Error";

const Search = ({ navigation }: any) => {
  const [text, onChangeText] = useState();
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onsubmit = (query: string) => {
      Promise.all([
        searchMovieTv(query, "movie"),
        searchMovieTv(query, "tv")
      ])
    .then(([movies, tv]) => {
        const data = [...movies, ...tv];
        setSearchResults(data);
    }) 
    .catch(()=>{
        setError(true)
    });
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              placeholder={"Search Movie or TV Show"}
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onsubmit(text);
            }}
          >
            <Icon name={"search-outline"} size={30} color="black" />
          </TouchableOpacity>
        </View>
        {/* Searched items results */}
        <View style={styles.searchItems}>
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Card navigation={navigation} item={item} />
              )}
            />
          )}
          {/* When search but no results */}
          {searchResults && searchResults.length == 0 && (
            <View style={[styles.empty, { paddingTop: 20 }]}>
              <Text>No results matching your criteria.</Text>
              <Text>Try different keywords.</Text>
            </View>
          )}
          {/* When nothing is searched */}
          {!searchResults && (
            <View style={styles.empty}>
              <Text>Type something to start searching</Text>
            </View>
          )}
          {/* Error */}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 15,
    borderWidth: 0.5,
    padding: 8,
  },
  container: {
    padding: 15,
    paddingTop: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  form: {
    flexBasis: "auto",
    flexGrow: 1,
    paddingRight: 8,
  },
  searchItems: {
    padding: 5,
  },
});

export default Search;
