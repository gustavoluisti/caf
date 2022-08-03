import React, { useEffect, useState } from 'react';
import { Button, NativeEventEmitter, NativeModules, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { mobileToken } from '../../services/api';

import { Container, Title } from './styles';

export const  FaceAuthenticator = () => {

  const [faceAuthenticatorResult, setFaceAuthenticatorResult] = useState(null);

  const combateAFraudeEmmiter = new NativeEventEmitter(NativeModules.CombateAFraude);

    //PassiveFaceLiveness
     useEffect(() => {
      //FaceAuthenticator
      combateAFraudeEmmiter.addListener(
        "FaceAuthenticator_Success",
        res => {
          setFaceAuthenticatorResult("Autenticado: "+res.authenticated);
        }
      )

      combateAFraudeEmmiter.addListener(
        "FaceAuthenticator_Cancel",
        res => {
          setFaceAuthenticatorResult("Usuário fechou");
        }
      )

      combateAFraudeEmmiter.addListener(
        "FaceAuthenticator_Error",
        res => {
          setFaceAuthenticatorResult("Erro: "+res.message);
        }
      )

   }, []);

  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            
            <View style={styles.sectionContainer}>
              <Container
                onPress={() => { 
                  NativeModules.CombateAFraude.faceAuthenticator(mobileToken, "00000000000")
                }}
              >
                <Title>FaceAuthenticator</Title>
              </Container>
            </View>

            <View style={styles.sectionContainer}>
              <Text>{'FaceAuthenticatorResult: ' + faceAuthenticatorResult}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});