import { View, TouchableOpacity, Text, Linking } from "react-native";
import React from "react";
import { Video, ResizeMode } from "expo-av";
import {
  VIDEOHEIGHT_LANDSCAPE,
  VIDEOHEIGHT_PORTRAIT,
  VIDEOWIDTH_LANDSCAPE,
  VIDEOWIDTH_PORTRAIT,
} from "../config/videoSize";
import { styles } from "../config/globalStyles";
import Skeleton from "./Skeleton";

const VideoSection = ({
  playStatus,
  setPlayStatus,
  rotate,
  setRotate,
  onSaveImageAsync,
  onVideoControl,
  onVideoControlNoLive,
  res,
  videoRefs,
  isLoading,
  setIsLoading,
  sendPushNotification,
  expoPushToken,
  notification,
}) => {
  return (
    <View style={!rotate ? "" : styles.rotateView}>
      <View style={!rotate ? "" : styles.rotateVideoWrapper}>
        {!isLoading && <Skeleton width="100%" paddingTop="56.25%" />}

        <Video
          source={res.source}
          shouldPlay
          resizeMode={ResizeMode.CONTAIN}
          ref={(el) => (videoRefs.current[res.id] = el)}
          style={{
            width: `${!rotate ? VIDEOWIDTH_PORTRAIT : VIDEOWIDTH_LANDSCAPE}%`,
            paddingTop: `${
              !rotate ? VIDEOHEIGHT_PORTRAIT : VIDEOHEIGHT_LANDSCAPE
            }%`,
            justifyContent: "center",
            display: isLoading ? "flex" : "none",
          }}
          onPlaybackStatusUpdate={(playStatus) =>
            setPlayStatus(() => playStatus)
          }
          onLoad={() => setIsLoading(true)}
        />
      </View>

      {!rotate ? (
        <View style={styles.defaultButton}>
          <TouchableOpacity onPress={() => setRotate(!rotate)}>
            <Text style={styles.buttonText}>🔄</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const idx = res.id;
              onVideoControl(idx);
              // onVideoControlNoLive(idx);
            }}
          >
            <Text style={styles.buttonText}>
              {playStatus.isPlaying ? "⏸️" : "▶️"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const idx = res.id;
              const title = res.title;
              onSaveImageAsync(idx, title);
            }}
          >
            <Text style={styles.buttonText}>📷</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL("tel://122");
            }}
          >
            <Text style={styles.buttonText}>🚨</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              await sendPushNotification(expoPushToken);

              console.log(`Your expo push token: ${expoPushToken}`);
              console.log(
                `Title: ${notification && notification.request.content.title}`
              );
              console.log(
                `Body: ${notification && notification.request.content.body}`
              );
              console.log(
                `Data: ${
                  notification &&
                  JSON.stringify(notification.request.content.data)
                }`
              );
            }}
          >
            <Text style={styles.buttonText}>🔔</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.rotateButton}>
          <TouchableOpacity onPress={() => setRotate(!rotate)}>
            <Text style={styles.buttonText}>🔄</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const idx = res.id;
              onVideoControl(idx);
              // onVideoControlNoLive(idx);
            }}
          >
            <Text style={styles.buttonText}>
              {playStatus.isPlaying ? "⏸️" : "▶️"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const idx = res.id;
              const title = res.title;
              onSaveImageAsync(idx, title);
            }}
          >
            <Text style={styles.buttonText}>📷</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL("tel://122");
            }}
          >
            <Text style={styles.buttonText}>🚨</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              await sendPushNotification(expoPushToken);

              console.log(`Your expo push token: ${expoPushToken}`);
              console.log(
                `Title: ${notification && notification.request.content.title}`
              );
              console.log(
                `Body: ${notification && notification.request.content.body}`
              );
              console.log(
                `Data: ${
                  notification &&
                  JSON.stringify(notification.request.content.data)
                }`
              );
            }}
          >
            <Text style={styles.buttonText}>🔔</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default VideoSection;
