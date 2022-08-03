import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

import ImagePicker from 'react-native-image-picker'

export default function Upload() {
    function imagePickerCallback(data) {
        console.log(data)
    }
  return (
    <View style={styles.container}>
      <Image 
        source={{
            uri: 'https://avatarairlines.com/our-team/male-placeholder/'
        }}
        style={styles.avatar}
      />

      <TouchableOpacity style={styles.button} onPress={() => ImagePicker.showImagePicker({}, imagePickerCallback)}>
        <Text>Escolher Imagem</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    button: {
        width: 150,
        height: 50,
        borderRadius: 3,
        backgroundColor: '#7159c1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50
    }
})