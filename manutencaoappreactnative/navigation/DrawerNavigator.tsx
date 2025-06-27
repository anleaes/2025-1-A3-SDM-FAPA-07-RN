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
  Clientes: undefined;
  CreateCliente: undefined;
  EditCliente: { cliente: any };
  Enderecos: undefined;
  CreateEndereco: undefined;
  EditEndereco: { endereco: any };
  OrdemServicos: undefined;
  CreateOrdemServico: undefined;
  EditOrdemServico: { ordem: any };
  OrdemServicoItens: undefined;
  CreateOrdemServicoItem: undefined;
  EditOrdemServicoItem: { item: any };
  Equipamentos: undefined;
  CreateEquipamento: undefined;
  EditEquipamento: { equipamento: any };
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
      <Drawer.Screen
        name="Clientes"
        component={require('../screens/ClienteScreen').default}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />, // ou outro ícone
          title: 'Clientes',
        }}
      />
      <Drawer.Screen
        name="CreateCliente"
        component={require('../screens/CreateClienteScreen').default}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo cliente' }}
      />
      <Drawer.Screen
        name="EditCliente"
        component={require('../screens/EditClienteScreen').default}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar cliente' }}
      />
      <Drawer.Screen
        name="Enderecos"
        component={require('../screens/EnderecoScreen').default}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="location-outline" size={size} color={color} />, // ou outro ícone
          title: 'Endereços',
        }}
      />
      <Drawer.Screen
        name="CreateEndereco"
        component={require('../screens/CreateEnderecoScreen').default}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo endereço' }}
      />
      <Drawer.Screen
        name="EditEndereco"
        component={require('../screens/EditEnderecoScreen').default}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar endereço' }}
      />
      <Drawer.Screen
        name="OrdemServicos"
        component={require('../screens/OrdemServicoScreen').default}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="document-text-outline" size={size} color={color} />, // ícone sugestivo
          title: 'Ordens de Serviço',
        }}
      />
      <Drawer.Screen
        name="CreateOrdemServico"
        component={require('../screens/CreateOrdemServicoScreen').default}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova ordem de serviço' }}
      />
      <Drawer.Screen
        name="EditOrdemServico"
        component={require('../screens/EditOrdemServicoScreen').default}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar ordem de serviço' }}
      />
      <Drawer.Screen
        name="OrdemServicoItens"
        component={require('../screens/OrdemServicoItemScreen').default}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />, // ícone sugestivo
          title: 'Itens da Ordem de Serviço',
        }}
      />
      <Drawer.Screen
        name="CreateOrdemServicoItem"
        component={require('../screens/CreateOrdemServicoItemScreen').default}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo item da ordem de serviço' }}
      />
      <Drawer.Screen
        name="EditOrdemServicoItem"
        component={require('../screens/EditOrdemServicoItemScreen').default}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar item da ordem de serviço' }}
      />
      <Drawer.Screen
        name="Equipamentos"
        component={require('../screens/EquipamentoScreen').default}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="hardware-chip-outline" size={size} color={color} />, // ícone sugestivo
          title: 'Equipamentos',
        }}
      />
      <Drawer.Screen
        name="CreateEquipamento"
        component={require('../screens/CreateEquipamentoScreen').default}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo equipamento' }}
      />
      <Drawer.Screen
        name="EditEquipamento"
        component={require('../screens/EditEquipamentoScreen').default}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar equipamento' }}
      />
    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;