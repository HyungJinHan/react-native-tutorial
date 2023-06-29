import { View, Text, Linking, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
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
  onSendPush,
  onSoundControl,
}) => {
  const buttonContents = [
    {
      onPress: () => setRotate(!rotate),
      text: "🔄",
    },
    {
      onPress: () => {
        const idx = res.id;
        onVideoControl(idx);
        // onVideoControlNoLive(idx);
      },
      text: `${playStatus.isPlaying ? "⏸️" : "▶️"}`,
    },
    {
      onPress: () => {
        const idx = res.id;
        onSoundControl(idx);
      },
      text: `${!playStatus.isMuted ? "🔇" : "🔊"}`,
    },
    {
      onPress: () => {
        const idx = res.id;
        const title = res.title;
        onSaveImageAsync(idx, title);
      },
      text: "📷",
    },
    {
      onPress: () => {
        Linking.openURL("tel://122");
      },
      text: "🚨",
    },
    {
      onPress: async () => {
        const type = "warning";
        await onSendPush(type);
      },
      text: "🔔",
    },
  ];
  const [cur, setCur] = useState(true);
  useEffect(() => {
    console.log("cur", cur);
    if (!cur) {
      videoRefs.current[res.id].unloadAsync();
      console.log("load stop!");
    }
    if (cur) {
      videoRefs.current[res.id].loadAsync(res.source, { shouldPlay: true });
    }
  }, [cur]);
  const btnPressable = () => {
    setCur(!cur);
  };

  return (
    <View style={!rotate ? "" : styles.rotateView}>
      <View style={!rotate ? "" : styles.rotateVideoWrapper}>
        {!isLoading && (
          <Skeleton
            width={`${!rotate ? VIDEOWIDTH_PORTRAIT : VIDEOWIDTH_LANDSCAPE}%`}
            paddingTop={`${
              !rotate ? VIDEOHEIGHT_PORTRAIT : VIDEOHEIGHT_LANDSCAPE
            }%`}
          />
        )}
        <Video
          source={res.source}
          shouldPlay
          isMuted
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

      <View style={!rotate ? styles.defaultButton : styles.rotateButton}>
        {buttonContents.map((content) => (
          <Pressable onPress={content.onPress} key={content.text}>
            <Text style={styles.buttonText}>{content.text}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={btnPressable}>
        <Text style={styles.buttonText}>눌러</Text>
      </Pressable>
    </View>
  );
};

export default VideoSection;
