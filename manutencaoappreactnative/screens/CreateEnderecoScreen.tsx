import { Picker } from '@react-native-picker/picker';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateEndereco'>;

const CreateEnderecoScreen = ({ navigation }: Props) => {
  const [rua, setRua] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cliente, setCliente] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientes, setClientes] = useState<{ id: number; nome: string }[]>([]);

  useFocusEffect(
    useCallback(() => {
      setRua('');
      setCidade('');
      setEstado('');
      setCep('');
      setComplemento('');
      setCliente('');
      setError(null);
      // Buscar clientes do backend
      fetch('http://localhost:8000/cliente/')
        .then(res => res.json())
        .then(data => setClientes(data.map((c: any) => ({ id: c.id, nome: c.nome || c.name }))))
        .catch(() => setClientes([]));
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/endereco/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rua,
          cidade,
          estado,
          cep,
          complemento,
          cliente: cliente ? Number(cliente) : null,
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Erro ao criar endereço');
      }
      setRua('');
      setCidade('');
      setEstado('');
      setCep('');
      setComplemento('');
      setCliente('');
      navigation.navigate('Enderecos');
    } catch (e: any) {
      setError(e.message || 'Erro desconhecido');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo endereço</Text>
      <Text style={styles.label}>Rua</Text>
      <TextInput
        value={rua}
        onChangeText={setRua}
        style={styles.input}
      />
      <Text style={styles.label}>Cidade</Text>
      <TextInput
        value={cidade}
        onChangeText={setCidade}
        style={styles.input}
      />
      <Text style={styles.label}>Estado</Text>
      <TextInput
        value={estado}
        onChangeText={setEstado}
        style={styles.input}
      />
      <Text style={styles.label}>CEP</Text>
      <TextInput
        value={cep}
        onChangeText={setCep}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Complemento</Text>
      <TextInput
        value={complemento}
        onChangeText={setComplemento}
        style={styles.input}
      />
      <Text style={styles.label}>Cliente</Text>
      <View style={[styles.input, { padding: 0 }]}> 
        <Picker
          selectedValue={cliente}
          onValueChange={setCliente}
        >
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
      <Button title="Voltar" onPress={() => navigation.navigate('Enderecos')} />
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

export default CreateEnderecoScreen;
