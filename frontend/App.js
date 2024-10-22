import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login';
import CadastroUsuario from './CadastroUsuario';
import Principal from './Principal';
import {list} from './list';
import {Editar} from './Editar';


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="list" component={list} />
        <Stack.Screen name="Editar" component={Editar} />
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
