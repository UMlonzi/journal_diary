import react from "react";
import { StyleSheet, Text, View } from "react-native-web";

const HomeScreen = () => {
return (
    <View>
        <Text>
        Home Screen
        </Text>
    </View>
)
}

export default HomeScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fill: {
      flex: 1,
      margin: 16
    },
    button: {
      margin: 16
    }
  });



















