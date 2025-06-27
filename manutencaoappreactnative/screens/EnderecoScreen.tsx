import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, any>;

export type Endereco = {
  id: number;
  rua: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
  cliente: string | { nome: string };
};

const EnderecoScreen = ({ navigation }: Props) => {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnderecos = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/endereco/');
    const data = await response.json();
    const mapped = data.map((item: any) => ({
      id: item.id,
      rua: item.rua,
      cidade: item.cidade,
      estado: item.estado,
      cep: item.cep,
      complemento: item.complemento,
      cliente: item.cliente,
    }));
    setEnderecos(mapped);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchEnderecos();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/endereco/${id}/`, {
      method: 'DELETE',
    });
    setEnderecos(prev => prev.filter(s => s.id !== id));
  };

  const renderItem = ({ item }: { item: Endereco }) => (
    <View style={styles.card}>
      <Text style={{ fontWeight: 'bold', color: '#4B7BE5', marginBottom: 4 }}>
        ID: {item.id} | Rua: {item.rua}
      </Text>
      <Text style={styles.description}>Cidade: {item.cidade}</Text>
      <Text style={styles.description}>Estado: {item.estado}</Text>
      <Text style={styles.description}>CEP: {item.cep}</Text>
      <Text style={styles.description}>Complemento: {item.complemento}</Text>
      <Text style={styles.description}>
        Cliente: {typeof item.cliente === 'object' && item.cliente !== null ? item.cliente.nome : item.cliente}
      </Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditEndereco', { endereco: item })}
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
      <Text style={styles.title}>Endereços</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={enderecos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateEndereco')}
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

export default EnderecoScreen;
