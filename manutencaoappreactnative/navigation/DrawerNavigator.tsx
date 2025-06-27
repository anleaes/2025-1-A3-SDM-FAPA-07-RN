import TipoDeServicosScreen from '@/screens/TipoDeServicosScreen';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import CreateServicoScreen from '../screens/CreateServicoScreen';
import CreateTipoDeServicoScreen from '../screens/CreateTipoDeServicoScreen';
import EditTipoDeServicoScreen from '../screens/EditTipoDeServicoScreen';
import HomeScreen from '../screens/HomeScreen';
import ServicoScreen from '../screens/ServicoScreen';
import { TipoDeServico } from '../screens/TipoDeServicosScreen';


export type DrawerParamList = {
  Home: undefined;
  TipoDeServicos: undefined;
  CreateTipoDeServico: undefined;
  EditTipoDeServico: { tipoDeServico: TipoDeServico };
  Products: undefined;
  Socialnetworks: undefined;
  Servicos: undefined;
  EditServico: { servico: any };
  CreateServico: undefined; // Adicionado para suportar a tela CreateServico
  Tecnicos: undefined;
  CreateTecnico: undefined;
  EditTecnico: { tecnico: any };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#4B7BE5',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        headerStyle: { backgroundColor: '#4B7BE5' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color}  />,
          title: 'Início',
        }}
      />
      <Drawer.Screen
        name="TipoDeServicos"
        component={TipoDeServicosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
          title: 'Tipo de Serviços',
        }}
      />
      <Drawer.Screen
        name="CreateTipoDeServico"
        component={CreateTipoDeServicoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo tipo de serviço' }}
      />
      <Drawer.Screen
        name="EditTipoDeServico"
        component={EditTipoDeServicoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar tipo de serviço' }}
      />
      <Drawer.Screen
        name="Servicos"
        component={ServicoScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="construct-outline" size={size} color={color} />,
          title: 'Serviços',
        }}
      />
      <Drawer.Screen
        name="EditServico"
        component={require('../screens/EditServicoScreen').default}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar serviço' }}
      />
      <Drawer.Screen
        name="CreateServico"
        component={CreateServicoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo serviço' }}
      />
      <Drawer.Screen
        name="Tecnicos"
        component={require('../screens/TecnicoScreen').default}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />, // ou outro ícone
          title: 'Técnicos',
        }}
      />
      <Drawer.Screen
        name="CreateTecnico"
        component={require('../screens/CreateTecnicoScreen').default}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo técnico' }}
      />
      <Drawer.Screen
        name="EditTecnico"
        component={require('../screens/EditTecnicoScreen').default}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar técnico' }}
      />
    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;