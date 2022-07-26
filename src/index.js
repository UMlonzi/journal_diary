import React, { useRef, useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { firebaseConfig } from '../config'
import firebase from 'firebase/compat/app'



const Otp = () => {

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
            <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            />
            <Text style={styles.otpText}>
                Login using OTP

            </Text>
            <TextInput
                placeholder='Phone Number with your code'
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
                       <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
                    <Text style={styles.buttonText}>
                        Confirm Verification
                    </Text>
                </TouchableOpacity>
        </View>
    )
 }
    
export default Otp

const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor: 'red',
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
            color:'blue'
        },
        sendVerification:{
            padding:20,
            backgroundColor:'black',
            borderRadius:10,
        },

        sendCode: {
            padding:20,
            backgroundColor:'black',
            borderRadius:10,

        },
        buttonText: {
            textAlign:'center',
            color:'#fff',
            fontWeight:'bold',

        },
        otpText: {
            fontSize:24,
            fontWeight:'bold',
            color:'#fff',
            margin:20,
        }
        });
