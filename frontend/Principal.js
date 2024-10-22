import React, { useState, useEffect } from 'react';
import { storeData, getData} from './storage'
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';

const Principal = ({ route, navigation }) => {
  //const usu_id = route.params.usu_id;
  //console.log('usu_id:', usu_id);

  const [usu_id, setId] = useState('')  

  const readId = async () =>
  {
    const usu_id= await getData()
    setId(usu_id)
  }
  
  readId()

  console.log(usu_id)
  
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/usuarios/${usu_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const json = await response.json();
        console.log('Dados retornados:', json); 

        const usuario = json[0]; 
        console.log(usuario.nome)
        if (usuario) {
          setNome(usuario.nome); 
          setEmail(usuario.email); 
          setSenha(usuario.senha); 
        }
      } catch (err) {
        console.log('Fetch error:', err);
      }
    };

    fetchUserData();
  }, [usu_id]); // Atualize quando o usu_id mudar

  const Alterar = () => {
    const userObj = { nome, email, senha };
    const jsonBody = JSON.stringify(userObj);
    console.log('Dados a serem enviados:', jsonBody);

    fetch('http://localhost:3000/usuarios/' + usu_id, 
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
    .then(response => response.json())
    .then(json => {
      navigation.goBack();
      console.log('Resposta do PUT:', json);
    })
    .catch((err) => {
      console.log('Erro no PUT:', err);
    });
  };

  const Excluir = () => {
    console.log('Usuário a ser excluído:', usu_id);
    fetch('http://localhost:3000/usuarios/' + usu_id, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => {
      navigation.goBack();
      console.log('Resposta do DELETE:', json);
    })
    .catch((err) => {
      console.log('Erro no DELETE:', err);
    });
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.centraltitulo}>
        <Text style={styles.titulo}>Alterar Dados</Text>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            onChangeText={setNome}
            value={nome}
            placeholder="Nome"
          />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="E-mail"
          />
          <TextInput
            style={styles.input}
            onChangeText={setSenha}
            value={senha}
            placeholder="Senha"
          />
        </View>
        <View style={styles.buttondiv}>
          <TouchableOpacity onPress={Alterar}>
            <Text style={styles.button}>Alterar</Text>
          </TouchableOpacity>
          <View style={styles.estilo_exclusao}>
            <View style={styles.linha}></View>
            <Text style={styles.excluir}>OU</Text>
            <View style={styles.linha}></View>
          </View>
          <Text style={styles.titulo}>Excluir conta</Text>
          <TouchableOpacity onPress={Excluir}>
            <Text style={styles.registro}>Excluir minha conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#404040",
  },
  titulo: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold'
  },
  centraltitulo: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputs: {
    marginTop: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
    color: "#fff",
    borderColor: "#fff",
    outlineWidth: 0,
  },
  button: {
    margin: 9,
    borderWidth: 0,
    padding: 9,
    paddingHorizontal: 45,
    borderRadius: 20,
    backgroundColor: '#13E0AB',
    color: "#fff",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  registro: {
    color: "#fff",
    marginTop: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 20,
    marginBottom: 30
  },
  buttondiv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  excluir: {
    color: "#fff"
  },
  linha: {
    width: 100,
    borderColor: "#7228f3",
    borderWidth: 1
  },
  estilo_exclusao: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5
  }
});

export default Principal;
