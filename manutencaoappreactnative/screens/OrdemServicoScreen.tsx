import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'OrdemServicos'>;

export type OrdemServico = {
  id: number;
  data_fechamento: string;
  descricao: string;
  status: string;
  cliente: any;
  endereco: any;
  tecnico: any;
  servico: any;
  tipo_de_servico: any;
};

const OrdemServicoScreen = ({ navigation }: Props) => {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrdens = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/ordemServico/');
    const data = await response.json();
    setOrdens(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrdens();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/ordemServico/${id}/`, {
      method: 'DELETE',
    });
    setOrdens(prev => prev.filter(s => s.id !== id));
  };

  const statusOptions = [
    { label: 'Aberta', value: 'aberta' },
    { label: 'Em Andamento', value: 'em_andamento' },
    { label: 'Finalizada', value: 'finalizada' },
    { label: 'Cancelada', value: 'cancelada' },
  ];

  const renderItem = ({ item }: { item: OrdemServico }) => (
    <View style={styles.card}>
      <Text style={{ fontWeight: 'bold', color: '#4B7BE5', marginBottom: 4 }}>
        ID: {item.id} | Status: {item.status}
      </Text>
      <Text style={styles.description}>Data de Fechamento: {item.data_fechamento}</Text>
      <Text style={styles.description}>Descrição: {item.descricao}</Text>
      <Text style={styles.description}>Cliente: {item.cliente?.nome || item.cliente}</Text>
      <Text style={styles.description}>Endereço: {item.endereco?.rua || item.endereco}</Text>
      <Text style={styles.description}>Técnico: {item.tecnico?.nome || item.tecnico}</Text>
      <Text style={styles.description}>Serviço: {item.servico?.nome || item.servico}</Text>
      <Text style={styles.description}>Tipo de Serviço: {item.tipo_de_servico?.nome || item.tipo_de_servico}</Text>
      <Text style={styles.description}>Status: {statusOptions.find(opt => opt.value === item.status)?.label || item.status}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditOrdemServico', { ordem: item })}
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
      <Text style={styles.title}>Ordens de Serviço</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={ordens}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateOrdemServico')}
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

export default OrdemServicoScreen;
