import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput, KeyboardAvoidingView, TouchableOpacity, Text, StyleSheet, Animated,
  Keyboard
} from 'react-native';



export default function App() {

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95}))
  const [opacity] = useState(new Animated.Value(0))
  const [logo] = useState(new Animated.ValueXY({ x: 130, y: 155 }))

  useEffect(() => {
    KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)


    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20

      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,

      })
    ]).start()
  }, [])

  function keyboardDidShow(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 100,
      }),
      Animated.timing(logo.y, {
        toValue: 65,
        duration: 100,
      })
    ]).start()

  }

  function keyboardDidHide(){
    

  }






  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.viewLogo}>
        <Animated.Image
          style={{
            width: logo.x,
            height: logo.y
          }}
          source={require('./src/img/logo.png')}
        />

      </View>
      <Animated.View
        style={[styles.containerForm,
        {
          opacity: opacity,
          transform: [{
            translateY: offset.y
          }]
        }
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={() => { }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={() => { }}
        ></TextInput>

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.textSubmit} >Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.textRegister}>Criar conta gratuita</Text>
        </TouchableOpacity>





      </Animated.View >
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#191919',
  },
  viewLogo: {
    flex: 1,
    justifyContent: 'center',

  },
  containerForm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,

  },
  btnSubmit: {
    backgroundColor: '#35aaff',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,

  },
  textSubmit: {
    color: '#fff',
    fontSize: 18,
  },
  btnRegister: {
    marginTop: 10,
  },
  textRegister: {
    color: '#fff'
  }






})