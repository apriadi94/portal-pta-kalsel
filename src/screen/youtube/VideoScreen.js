import React, {useState, useRef, useEffect} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';

// Import Youtube Players
import YouTube from 'react-native-youtube';

const VideoScreen = ({navigation, route}) => {
    const {vidID, titleVideo} = route.params;
    const youtubePlayerRef = useRef();
    const singleVideoId = vidID;

  
    const [isReady, setIsReady] = useState(false);
    const [status, setStatus] = useState(null);
    const [quality, setQuality] = useState(null);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isLooping, setIsLooping] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [fullscreen, setFullscreen] = useState(true);
    const [containerMounted, setContainerMounted] = useState(false);
    const [containerWidth, setContainerWidth] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            title: titleVideo,
        });
    }, [])
  
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={styles.container}
          onLayout={({
            nativeEvent: {
              layout: {width},
            },
          }) => {
            if (!containerMounted) setContainerMounted(true);
            if (containerWidth !== width) setContainerWidth(width);
          }}>
          {containerMounted && (
            <YouTube
              ref={youtubePlayerRef}
              // You must have an API Key
              apiKey="AIzaSyDH5p3ZcIYDK4vLFPLoPmxRXXA35HmURg8"
              // Un-comment one of videoId / videoIds / playlist.
              videoId={singleVideoId}
              //videoIds={listVideoIds}
              // playlistId="PLF797E961509B4EB5"
              play={isPlaying}
              loop={isLooping}
              fullscreen={fullscreen}
              controls={1}
              style={[
                {
                  height: PixelRatio.roundToNearestPixel(
                    containerWidth / (16 / 9),
                  ),
                },
                styles.player,
              ]}
              onError={(e) => setError(e.error)}
              onReady={(e) => setIsReady(true)}
              onChangeState={(e) => setStatus(e.state)}
              onChangeQuality={(e) => setQuality(e.quality)}
              onChangeFullscreen={(e) => setFullscreen(e.isFullscreen)}
              onProgress={(e) => {
                setDuration(e.duration);
                setCurrentTime(e.currentTime);
              }}
            />
          )}
  
          <Text style={styles.titleText}>
            {titleVideo}
          </Text>
     
        </ScrollView>
      </SafeAreaView>
    );
  };

  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    titleText: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingVertical: 20,
    },
    buttonGroup: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    button: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      alignSelf: 'center',
    },
    buttonText: {
      fontSize: 18,
      color: 'blue',
    },
    buttonTextSmall: {
      fontSize: 15,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    player: {
      alignSelf: 'stretch',
      marginVertical: 10,
    },
  });

export default VideoScreen;