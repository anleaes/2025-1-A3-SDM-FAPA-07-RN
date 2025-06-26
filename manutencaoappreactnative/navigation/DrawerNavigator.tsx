import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import TipoDeServicoScreen, { TipoDeServico } from '../screens/TipoDeServicoScreen';
import CreateTipoDeServicoScreen from '../screens/CreateTipoDeServicoScreen';
import EditTipoDeServicoScreen from '../screens/EditTipoDeServicoScreen';
import HomeScreen from '../screens/HomeScreen';

export type DrawerParamList = {
  Home: undefined;
  TipoDeServico: undefined;
  CreateTipoDeServico: undefined;
  EditTipoDeServico: { tipo: TipoDeServico };
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
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          title: 'Início',
        }}
      />
      <Drawer.Screen
        name="TipoDeServico"
        component={TipoDeServicoScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
          title: 'Tipos de Serviço',
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;