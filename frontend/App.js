import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CadastroUsuario from './CadastroUsuario';
import Login from './Login';
import Principal from './Principal';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
