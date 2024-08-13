import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, View, Image} from 'react-native';
import { Icon, MD3Colors } from 'react-native-paper';

const CadastroUsuario = ({navigation}) => 
{
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [formacao, setFormacao] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmasenha, setConfirmaSenha] = useState('');

  const Cadastrar = () =>
  {
    var userObj = {nome:nome,usuario:usuario,email: email, escolaridade: escolaridade, formacao: formacao,senha:senha};
    var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);
    fetch('http://localhost:3000/usuario', 
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
      console.log(json);
      navigation.goBack();
    })
    .catch((err) => 
    {
      console.log(err);
    });
  }

  const Voltar = ()=>
  {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.centerdiv}>
        <Image
          style={styles.logo}
          source={require('./assets/icon.png')}
        />
      </View>
    <View style={styles.inputs}>
    <TextInput
        style={styles.input}
        onChangeText={event =>setNome(event)}
        value={nome}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        onChangeText={event =>setUsuario(event)}
        value={usuario}
        placeholder="Usuário"
      />
      <TextInput
        style={styles.input}
        onChangeText={event =>setEmail(event)}
        value={email}
        placeholder="E-mail"
      />
      <TextInput
        style={styles.input}
        onChangeText={event =>setEscolaridade(event)}
        value={escolaridade}
        placeholder="Escolaridade"
      />
      <TextInput
        style={styles.input}
        onChangeText={event =>setFormacao(event)}
        value={formacao}
        placeholder="Formação"
      />
      <TextInput
        style={styles.input}
        onChangeText={event =>setSenha(event)}
        value={senha}
        placeholder="Senha"
      />
      <TextInput
        style={styles.input}
        onChangeText={event =>setConfirmaSenha(event)}
        value={confirmasenha}
        placeholder="Confirmação de senha"
      />
      </View>
      <View style={styles.buttondiv}>
        <TouchableOpacity>
        <Text onPress={Cadastrar} style={styles.button}>Criar Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text onPress={Voltar} style={styles.registro}>Já tenho uma conta</Text>
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
    marginTop:70,
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
  },
  
  button: 
  {
    margin: 9,
    borderWidth: 0,
    padding: 9,
    paddingHorizontal:45,
    borderRadius: 20,
    backgroundColor: '#13E0AB',
    color:"#fff",
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttondiv:
  {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    padding:1,
    marginTop:50
  },
  logo:
  {
    marginTop:20,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    width:135,

  },
  centerdiv:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registro:
  {
    color:"#fff",
    marginTop:10
  },
});

export default CadastroUsuario;