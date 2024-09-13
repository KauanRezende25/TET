import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Button,
} from 'react-native';

export function list({navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchList() {
      fetch('http://localhost:3000/usuarios/', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          setData(resJson);
        })
        .catch((e) => console.log(e));
    }
    fetchList();
  }, []);

const Excluir = (id_usu) => 
{
  console.log(id_usu),
  fetch('http://localhost:3000/usuarios/' + id_usu, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => {
      console.log('Resposta do DELETE:', json);
    })
    .catch(err => {
      console.log('Erro no DELETE:', err);
    });
    
}
  const Editar = id_usu => {

    return (
      <View>
        Nome:
        <TextInput
          style={styles.input}
          onChangeText={setNome}
          value={nome}
        />
        <Button
          title="Confirmar"
          onPress={() =>
          {
            console.log('Sim');
          var requestOptions = {
            method: 'PUT',
            redirect: 'follow',
          };

          fetch('http://localhost:3000/usuarios/' + id_usu, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));
          }
          }
        />
      </View>
    );
  };

  const renderItemComponent = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemTitle}>{item.id_usu}</Text>
        <Text>{item.nome}</Text>
      </View>
      <TouchableOpacity
        style={styles.listItemButton}
        onPress={() => {
          navigation.navigate('Editar', { id: item.id_usu, nome: item.nome });
        }}>
        <Text style={{ color: 'green' }}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listItemButton}
        onPress={() => {
          Excluir(item.id_usu);
        }}>
        <Text style={{ color: 'red' }}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  const ItemSeparator = () => <View style={styles.listItemSeparator} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItemComponent}
        keyExtractor={(item) => item.id_usu.toString()}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop: 60,
  },
  listItemView: { alignItems: 'center', flex: 1 },
  listItemTitle: { fontWeight: 'bold' },
  listItemButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItemSeparator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginLeft: 5,
    marginRight: 5,
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF',
    width: '80%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
});