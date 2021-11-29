import * as React from "react";
import { Video } from "expo-av";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useRef } from "react";

const VideoPlay = ({ onClose }: any) => {
  const video = useRef(null);

  return (
   
      <View style={styles.video}>
         <Pressable onPress={onClose}>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 25,
            color: "red",
            fontWeight: "bold",
          }}
        >
          Close Video Player
        </Text>
        </Pressable>
        <Video
          source={{
            uri: "https://vjs.zencdn.net/v/oceans.mp4",
          }}
          style={{ width: 400, height: 400 }}
          useNativeControls
          isLooping
          ref={video}
          resizeMode="cover"
          shouldPlay
        />
      </View>
    
  );
};
const styles = StyleSheet.create({
  video: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default VideoPlay;
