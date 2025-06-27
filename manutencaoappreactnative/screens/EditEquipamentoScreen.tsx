import { Picker } from '@react-native-picker/picker';
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditEquipamento'>;

const EditEquipamentoScreen = ({ route, navigation }: Props) => {
  if (!route.params || !route.params.equipamento) {
    navigation.navigate('Equipamentos');
    return null;
  }
  const { equipamento } = route.params;
  const [modelo, setModelo] = useState(equipamento.modelo);
  const [marca, setMarca] = useState(equipamento.marca);
  const [numeroSerie, setNumeroSerie] = useState(equipamento.numero_serie);
  const [tipo, setTipo] = useState(equipamento.tipo);
  const [cliente, setCliente] = useState(equipamento.cliente?.id ? String(equipamento.cliente.id) : '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientes, setClientes] = useState<{ id: number; nome: string }[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/cliente/')
      .then(res => res.json())
      .then(data => setClientes(data.map((c: any) => ({ id: c.id, nome: c.nome || c.name })))).catch(() => setClientes([]));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/equipamento/${equipamento.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelo,
          marca,
          numero_serie: numeroSerie,
          tipo,
          cliente: cliente ? Number(cliente) : null,
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Erro ao salvar equipamento');
      }
      navigation.navigate('Equipamentos');
    } catch (e: any) {
      setError(e.message || 'Erro desconhecido');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Equipamento</Text>
      <Text style={styles.label}>Modelo</Text>
      <TextInput
        value={modelo}
        onChangeText={setModelo}
        style={styles.input}
      />
      <Text style={styles.label}>Marca</Text>
      <TextInput
        value={marca}
        onChangeText={setMarca}
        style={styles.input}
      />
      <Text style={styles.label}>Número de Série</Text>
      <TextInput
        value={numeroSerie}
        onChangeText={setNumeroSerie}
        style={styles.input}
      />
      <Text style={styles.label}>Tipo</Text>
      <TextInput
        value={tipo}
        onChangeText={setTipo}
        style={styles.input}
      />
      <Text style={styles.label}>Cliente</Text>
      <View style={[styles.input, { padding: 0 }]}> 
        <Picker selectedValue={cliente} onValueChange={setCliente}>
          <Picker.Item label="Selecione..." value="" />
          {clientes.map(c => (
            <Picker.Item key={c.id} label={c.nome} value={String(c.id)} />
          ))}
        </Picker>
      </View>
      {error && (
        <Text style={{ color: 'red', marginVertical: 8 }}>{error}</Text>
      )}
      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Equipamentos')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 12, 
    alignSelf: 'center' },
  label: { 
    fontWeight: '600', 
    marginTop: 12, 
    marginBottom: 4 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default EditEquipamentoScreen;
