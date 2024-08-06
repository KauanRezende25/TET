import React from 'react';
import {SafeAreaView, StyleSheet, TextInput,TouchableOpacity,Image, View,Text} from 'react-native';
const Login = ({navigation}) => 
{
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const verificarLogin = () => 
  {
    var userObj = { email: email, senha: senha};
    var jsonBody = JSON.stringify(userObj);
    fetch('https://tet-kauan.glitch.me/login', 
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
        navigation.navigate('Principal', {
          usu_id: json.id,
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
          source={require('/icon.png')}
        />
      </View>
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          onChangeText={event =>setEmail(event)}
          value={email}
          placeholder="E-mail"
        />
        <TextInput
          style={styles.input}
          onChangeText={event =>setSenha(event)}
          value={senha}
          placeholder="Senha"
          keyboardType="numeric"
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
  },

  botaodiv:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
    color: "#fff",
    borderColor:"#fff",
    outlineWidth: 0,

  },
  inputs:
  {
    marginTop:50,
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
  },
  
  button: 
  {
    height: 33,
    margin: 9,
    borderWidth: 0,
    padding: 9,
    paddingHorizontal:65,
    borderRadius: 20,
    backgroundColor: '#13E0AB',
    color:"#fff",
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  registro:
  {
    color:"#fff",
    marginTop:10,
    marginRight: 10,
    marginBottom: 30
  },
  logo:
  {
    marginTop:20,
    flex:1,
    justifyContent:"center",
    alignItems: "center",
    height:130,
    width:130,
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
    width: 150,
  }

});

export default Login