import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, any>;

export type Cliente = {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  cpf_cnpj: string;
};

const ClienteScreen = ({ navigation }: Props) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClientes = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/cliente/');
    const data = await response.json();
    const mapped = data.map((item: any) => ({
      id: item.id,
      nome: item.nome,
      telefone: item.telefone,
      email: item.email,
      cpf_cnpj: item.cpf_cnpj,
    }));
    setClientes(mapped);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchClientes();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/cliente/${id}/`, {
      method: 'DELETE',
    });
    setClientes(prev => prev.filter(s => s.id !== id));
  };

  const renderItem = ({ item }: { item: Cliente }) => (
    <View style={styles.card}>
      <Text style={{ fontWeight: 'bold', color: '#4B7BE5', marginBottom: 4 }}>
        ID: {item.id} | Nome: {item.nome}
      </Text>
      <Text style={styles.description}>Telefone: {item.telefone}</Text>
      <Text style={styles.description}>Email: {item.email}</Text>
      <Text style={styles.description}>CPF/CNPJ: {item.cpf_cnpj}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditCliente', { cliente: item })}
      >
        <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.editText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={clientes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateCliente')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#4B7BE5',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  editText: {
    color: '#fff',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0D47A1',
    borderRadius: 28,
    padding: 14,
    elevation: 4,
  },
  deleteButton: {
    backgroundColor: '#E54848',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
    alignSelf: 'flex-end',
  },
});

export default ClienteScreen;
