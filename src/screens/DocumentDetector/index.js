
import React, { useEffect, useState } from 'react';

import {  NativeEventEmitter, NativeModules, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { mobileToken } from '../../services/api';

import { Container, Title } from './styles'


export function DocumentDetector() {
   
    const [documentDetectorResult, setDocumentDetectorResult] = useState(null);

    const combateAFraudeEmmiter = new NativeEventEmitter(NativeModules.CombateAFraude);

    useEffect(() => {
        combateAFraudeEmmiter.addListener(
            "DocumentDetector_Success",
            res => {
                setDocumentDetectorResult("Frente: " + res.captures[0].imagePath + "\nVerso: " + res.captures[1].imagePath);
            }
        )

        combateAFraudeEmmiter.addListener(
            "DocumentDetector_Error",
            res => {
                setDocumentDetectorResult("Erro: " + res.message);
            }
        )

        combateAFraudeEmmiter.addListener(
            "DocumentDetector_Cancel",
            res => {
                setDocumentDetectorResult("Usuário fechou");
            })
    }, []);

    function handleDocs(doc) {
        NativeModules.CombateAFraude.documentDetector(mobileToken, `${doc}`);
    }

    return (
        <View>
            <View style={styles.sectionContainer}>
                <Container onPress={() => handleDocs('CNH')}>
                    <Title>DocumentDetector - CNH</Title>
                </Container>

                <Container onPress={() => handleDocs('RG')}>
                    <Title>DocumentDetector - RG</Title>
                </Container>

                <Container onPress={() =>  handleDocs('RNE')}>
                    <Title>DocumentDetector - RNE</Title>
                </Container>

                <Container onPress={() => handleDocs('CRLV')}>
                    <Title>DocumentDetector - CRLV</Title>
                </Container>
            </View>
           
            <View style={styles.sectionContainer}>
                <Text>{'DocumentDetectorResult: ' + documentDetectorResult}</Text>
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
});