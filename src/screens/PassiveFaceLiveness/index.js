import React, { useEffect, useState } from 'react';

import { Button, NativeEventEmitter, NativeModules, SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Container, Title } from './styles';
import { mobileToken } from '../../services/api';

export function PassiveFaceLiveness() {
    const [passiveFaceLivenessResult, setPassiveFaceLivenessResult] = useState(null);

    const combateAFraudeEmmiter = new NativeEventEmitter(NativeModules.CombateAFraude);


    useEffect(() => {

        combateAFraudeEmmiter.addListener(
            "PassiveFaceLiveness_Success",
            res => {
                setPassiveFaceLivenessResult("Selfie: " + res.imagePath);
                console.log(res.imagePath)
            }
        )

        combateAFraudeEmmiter.addListener(
            "PassiveFaceLiveness_Error",
            res => {
                setPassiveFaceLivenessResult("Erro: " + res.message);
            }
        )

        combateAFraudeEmmiter.addListener(
            "PassiveFaceLiveness_Cancel",
            res => {
                setPassiveFaceLivenessResult("Usuário fechou");
            }
        )

    }, []);

    return (
        <View>
            <View style={styles.sectionContainer}>
                <Container
                    onPress={() => {
                        NativeModules.CombateAFraude.passiveFaceLiveness(mobileToken)
                    }}
                >
                    <Title>PassiveFaceLiveness</Title>
                </Container>
            
            </View>

            <View style={styles.sectionContainer}>
                <Text>{'PassiveFaceLivenessResult: ' + passiveFaceLivenessResult}</Text>
            </View>

           
        </View>
    )
}

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
    image: {
        width: 500,
        height: 500
    }
});