import React from 'react';
import { storeData, getData} from './storage'
import {SafeAreaView, StyleSheet, TextInput,TouchableOpacity,Image, View,Text} from 'react-native';
const Login = ({navigation}) => 
{
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const verificarLogin = () => 
  {
    var userObj = { email: email, senha: senha};
    var jsonBody = JSON.stringify(userObj);

    console.log("aq entrou")
    fetch('http://localhost:3000/login', 
    {
      method:'POST',
      headers: 
      {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
    .then(response => response.json())
    .then(json => 
    {
      console.log(json)
      if(json.mensagem=="ok")
      {
        storeData(json.id)
        navigation.navigate('Principal', {
          //usu_id: json.id
          
        })
        
      }
    })                                                                                                                                        
    .catch((err) => 
    {
      console.log(err);
    });
}

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.centerdiv}>
        <Image
          style={styles.logo}
          source={require('./assets/icon.png')}
          resizeMode="contain"
        />
      </View>
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          onChangeText={event =>setEmail(event)}
          value={email}
          placeholder="E-mail"
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          onChangeText={event =>setSenha(event)}
          value={senha}
          placeholder="Senha"
          placeholderTextColor="#fff"
        />
      </View>

    <View style={styles.botaodiv}>
      <View style={styles.buttondiv}>
        <TouchableOpacity>
        <Text onPress={verificarLogin} style={styles.button}>Entrar</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {navigation.navigate('CadastroUsuario', {})}}>
        <Text style={styles.registro}>Cadastre-se aqui</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body:
  {
    backgroundColor: "#404040",
    height: 810,
    width: 410,
    color: "#fff"
  },

  botaodiv:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 10,
    marginTop:-50
  },
  
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
    color: "#fff",
    borderColor:"#fff",
    //outlineWidth: 0,
    width:200,

  },
  inputs:
  {
    marginTop:-150,
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    color: "#fff"
  },
  
  button: 
  {
    height: 0,
    margin: 0,
    borderWidth: 0,
    paddingHorizontal:80,
    paddingVertical:5,
    borderRadius: 20,
    backgroundColor: '#13E0AB',
    color:"#fff",
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width:200,
    marginBottom:20
    
  },

  registro:
  {
    color:"#fff",
    marginTop:0,
    marginRight: 10,
    marginBottom: 315
  },
  logo:
  {
    marginTop:20,
    flex:1,
    justifyContent:"center",
    alignItems: "center",
    width:150,
  },
  centerdiv:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttondiv:
  {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 10,
    marginTop:-50
  }

});

export default Login