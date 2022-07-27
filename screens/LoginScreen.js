import React, { useRef, useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ImageBackground } from 'react-native'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { firebaseConfig } from '../Config'
import firebase from 'firebase/compat/app'

const image = { uri: "https://cdn.shopify.com/s/files/1/1186/0402/files/Journals-to-Keep-3.jpg?v=1604179845" };

const LoginScreen = ({ navigation }) => {

   const [phoneNumber, setPhoneNumber] = useState('');
   const [code, setCode] = useState('');
   const [verificationId, setVerificationId] = useState(null);
   const recaptchaVerifier = useRef(null);

   const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
        .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
        .then(setVerificationId);
        setPhoneNumber('');
   };
    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase.auth().signInWithCredential(credential)
        .then(() => {
            setCode('')
        })
        .catch((error) => {
            // show an alert in case of error
            alert(error)
        })
        Alert.alert(
            'Login Successful. Welcome To Your Journal Diary',
        );
  }
 
    return(
        <View style={styles.container}>
                    <ImageBackground source={image} resizeMode="cover" style={styles.BackImage}>
            <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            />
            <Text style={styles.otpText}>
                Sign in using OTP

            </Text>
            <TextInput
                placeholder=' Enter Your Phone Number'
                onChangeText={setPhoneNumber}
                keyboardType='phone-pad'
                autoCompleteType='tel'
                style={styles.TextInput}
                />
                <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
                    <Text style={styles.buttonText}>
                        Send Verification
                    </Text>
                </TouchableOpacity>
                <TextInput
                placeholder='Confirm code'
                onChangeText={setCode}
                keyboardType='number-pad'
                style={styles.TextInput}
                />
                       <TouchableOpacity style={styles.sendCode} 
                       onPress = {() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>
                        Confirm Verification
                    </Text>
                </TouchableOpacity>
                </ImageBackground>
        </View>
    )
 }
    
export default LoginScreen

const styles = StyleSheet.create({
        container:{
            flex:1,
           
            alignItems: 'center',
            justifyContent: 'center',
        },
        TextInput: {
            paddingTop:40,
            paddingBottom:20,
            paddingHorizontal:20,
            fontSize:24,
            borderBottomColor: '#fff',
            borderBottomWidth:2,
            marginBottom:20,
            textAlign:'center',
            color:'blue',
            
        },
        sendVerification:{
            padding:20,
            backgroundColor:'grey',
            borderRadius:10,
        },

        sendCode: {
            padding:20,
            backgroundColor:'grey',
            borderRadius:10,

        },
        buttonText: {
            textAlign:'center',
            color:'#fff',
            fontWeight:'bold',
            
        },
        otpText: {
            position: 'absolute',
            fontSize:24,
            fontWeight:'bold',
            color:'green',
            margin:20,
            alignItems: 'center',
            justifyContent: "center",
            top: 160,
            right:80,
        },
        BackImage: {
            flex: 1,
            justifyContent: "center",
            width: 400,
            height:896,
        }
        });
