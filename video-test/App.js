import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import videoTest from "./assets/test.mp4";
import * as React from "react";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import { captureScreen } from "react-native-view-shot";
import * as ScreenOrientation from "expo-screen-orientation";

export default function App() {
  const [videoStatus, setVideoStatus] = React.useState({});
  const [orientationIsLandscape, setOrientation] = React.useState(false);

  const videoF = React.useRef(null);
  const videoS = React.useRef(null);
  const w = Dimensions.get("window").height;
  const [hehe, setHehe] = React.useState(w);
  let captureTime = new Date();

  let year = captureTime.getFullYear(); // 년도
  let month = captureTime.getMonth() + 1; // 월
  let date = captureTime.getDate(); // 날짜

  var hours = ("0" + captureTime.getHours()).slice(-2);
  var minutes = ("0" + captureTime.getMinutes()).slice(-2);
  var seconds = ("0" + captureTime.getSeconds()).slice(-2);

  const [status, requestPermission] = MediaLibrary.usePermissions();
  // ...rest of the code remains same

  if (status === null) {
    requestPermission();
  }

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(videoF, {
        fileName: `video-${year}-${month}-${date}-${hours}${minutes}${seconds}-`,
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(orientationIsLandscape);

  if (orientationIsLandscape == true) {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
    videoF.current.presentFullscreenPlayer();
  } else if (orientationIsLandscape == false) {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  console.log("hehe, w", hehe, w);

  return (
    <>
      <View style={styles.container}>
        <Video
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          // source={{ uri: "rtsp://172.30.1.17/11 }}
          // source={{ uri: "http://221.156.189.42:8080" }}
          // source={videoTest}
          shouldPlay
          ref={videoF}
          style={{ width: "100%", height: 300, marginTop: 20 }}
          // useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
          // onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
        />

        {/* <Button title="test" onPress={handleFullScreen} /> */}
        {/* <Button title="Screen Shot" onPress={onSaveImageAsync} /> */}
        {/* <Video
        ref={videoS}
        style={{ width: "100%", height: 300 }}
        source={videoTest}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
      /> */}
        {/* <View style={styles.buttons}>
        <Button
          title={videoStatus.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            videoStatus.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View> */}
      </View>
      <View style={styles.button}>
        <Button
          title="test"
          onPress={() => setOrientation(!orientationIsLandscape)}
          style={{ width: 100, height: 100 }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    gap: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});