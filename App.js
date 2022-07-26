import Otp from './src';
import { StyleSheet, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import HomeScreen from './screens/HomeScreen';




export default function App() {
  return (
    <View>
      <Otp/>
      <HomeScreen/>
    </View>
    
    
  //   <NavigationContainer>
  //   <Stack.Navigator>
  //     <Stack.Screen
  //       name="Otp"
  //       component={index}
  //       options={{ title: 'Welcome' }}
  //     />
  //     <Stack.Screen name="Profile" component={ProfileScreen} />
  //   </Stack.Navigator>
  // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});
