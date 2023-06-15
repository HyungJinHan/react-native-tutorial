## 📂 delivery-app

### Expo 빌드, 배포 테스트

- [apk 빌드 완료](https://www.notion.so/hyungjinhan/Expo-Window-IOS-c9a32d8282b84d36909cf9ff98f3a763?pvs=4#41014ccbaefb483cb2db7104981ee2fd)

## ~~📂 test~~

### ~~RTSP 영상 스트리밍 테스트~~

- ~~[`react-native-vlc-media-player`](https://github.com/razorRun/react-native-vlc-media-player)~~

## 📂 video-test

### Expo 영상 출력, 스크린샷 테스트

- [`expo-av`](https://docs.expo.dev/versions/latest/sdk/av/)

  - [`Video` Document](https://docs.expo.dev/versions/latest/sdk/video/#video)

  - [`m3u8` 확장자 활용](https://gist.github.com/lucky-c/91d96977f913d54f723b64c34ce03fac)

    - ios 환경에서는 재생 불가 ([`react-native-livestream` 활용](https://docs.api.video/docs/react-native-livestream-component))

- [`react-native-view-shot`](https://github.com/gre/react-native-view-shot)

  - [`captureRef` Document](https://docs.expo.dev/versions/latest/sdk/captureRef/#capturerefview-options)

- [`expo-screen-orientation`](https://docs.expo.dev/versions/latest/sdk/screen-orientation/)

  - [`orientationlock` Document](https://docs.expo.dev/versions/latest/sdk/screen-orientation/#screenorientationlockasyncorientationlock)

  - [`Video onFullscreenUpdate` Document](https://docs.expo.dev/versions/latest/sdk/video/#videofullscreenupdate)

## 💡 기타 참고 사항

- [테스트용 비디오 모음 링크](https://gist.github.com/jsturgis/3b19447b304616f18657)

- Expo 환경에서 RTSP 영상 스트리밍은 불가

  - `eject`를 진행한 후, react native 환경에서 가능

- Expo eject 후, 안드로이드 가상 디바이스 실행 에러 발생

  - 원인, 설정법 찾아야 함

- [`react-native-toast-message` (Toast 알림)](https://github.com/calintamas/react-native-toast-message)
  - 느낌이 어떤지 테스트 할 예정
  - Alert은 가능, Confirm이 가능한지는 확인해봐야 함
