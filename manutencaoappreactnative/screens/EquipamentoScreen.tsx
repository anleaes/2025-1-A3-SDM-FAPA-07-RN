import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Equipamentos'>;

export type Equipamento = {
  id: number;
  modelo: string;
  marca: string;
  numero_serie: string;
  tipo: string;
  cliente: any;
};

const EquipamentoScreen = ({ navigation }: Props) => {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEquipamentos = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/equipamento/');
    const data = await response.json();
    setEquipamentos(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchEquipamentos();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/equipamento/${id}/`, {
      method: 'DELETE',
    });
    setEquipamentos(prev => prev.filter(s => s.id !== id));
  };

  const renderItem = ({ item }: { item: Equipamento }) => (
    <View style={styles.card}>
      <Text style={{ fontWeight: 'bold', color: '#4B7BE5', marginBottom: 4 }}>
        ID: {item.id} | Modelo: {item.modelo}
      </Text>
      <Text style={styles.description}>Marca: {item.marca}</Text>
      <Text style={styles.description}>Número de Série: {item.numero_serie}</Text>
      <Text style={styles.description}>Tipo: {item.tipo}</Text>
      <Text style={styles.description}>Cliente: {item.cliente?.nome || item.cliente}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditEquipamento', { equipamento: item })}
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
      <Text style={styles.title}>Equipamentos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={equipamentos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateEquipamento')}
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
});

export default EquipamentoScreen;
