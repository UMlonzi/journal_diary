import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';

const image = { uri: "https://c0.wallpaperflare.com/preview/515/642/430/background-blank-business-closeup.jpg" };

export default function HomeScreen() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
 
  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setRecordings(updatedRecordings);
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
       
          <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
          <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
          <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
          <Button style={styles.button} onPress={() => recordingLine.sound.DeleteAsync()} title="Delete"></Button>
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
          <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <Text style={styles.Header}> What Are Your Thoughts Today?</Text>
      <Text>{message}</Text>
      <Button 
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording} />
      {getRecordingLines()}
      <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: "green",
    
  },
  
  fill: {
    flex: 1,
    margin: 16,
    color: "black",
    fontSize: 20,
 
  },
  button: {
    backgroundColor: 'red',
    margin: 26,
    padding: 10,
  

  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: 414,
    height:896,
  },
  Header: {
    color: "green",
    fontSize: 40,

    fontWeight: "bold",
    textAlign: "center",
    position: 'absolute',
    right: 40,
    top: 35,
    fontFamily: "Cochin",
    textAlignVertical: 'top',
 
  }
});













