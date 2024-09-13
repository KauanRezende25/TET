import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export function Editar({ route, navigation }) {
  const { id, nome: initialName } = route.params;
  const [nome, setNome] = useState(initialName);

  const atualizarUsuario = () => {
    const userObj = {nome};
    const jsonBody = JSON.stringify(userObj);

    fetch('http://localhost:3000/nome/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
      .then(response => response.json())
      .then(json => {
        
        console.log('Resposta do PUT:', json);
        navigation.goBack();
      })
      .catch((err) => {
        console.log('Erro no PUT:', err);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Nome:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNome}
        value={nome}
      />
      <Button
        title="Confirmar"
        onPress={atualizarUsuario}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
