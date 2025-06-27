import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

// Ajuste o tipo conforme o esperado no DrawerParamList

type Props = DrawerScreenProps<DrawerParamList, 'EditEndereco'>;

const EditEnderecoScreen = ({ route, navigation }: Props) => {
  if (!route.params || !route.params.endereco) {
    navigation.navigate('Enderecos');
    return null;
  }
  const { endereco } = route.params;
  const [rua, setRua] = useState(endereco.rua);
  const [cidade, setCidade] = useState(endereco.cidade);
  const [estado, setEstado] = useState(endereco.estado);
  const [cep, setCep] = useState(endereco.cep);
  const [complemento, setComplemento] = useState(endereco.complemento);
  const [cliente, setCliente] = useState(
    typeof endereco.cliente === 'object' && endereco.cliente !== null
      ? endereco.cliente.nome
      : endereco.cliente
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setRua(endereco.rua);
    setCidade(endereco.cidade);
    setEstado(endereco.estado);
    setCep(endereco.cep);
    setComplemento(endereco.complemento);
    setCliente(
      typeof endereco.cliente === 'object' && endereco.cliente !== null
        ? endereco.cliente.nome
        : endereco.cliente
    );
  }, [endereco]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/endereco/${endereco.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rua,
          cidade,
          estado,
          cep,
          complemento,
          cliente,
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Erro ao salvar endereço');
      }
      navigation.navigate('Enderecos');
    } catch (e: any) {
      setError(e.message || 'Erro desconhecido');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
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
      <TextInput
        value={cliente}
        onChangeText={setCliente}
        style={styles.input}
      />
      {error && (
        <Text style={{ color: 'red', marginVertical: 8 }}>{error}</Text>
      )}
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Enderecos')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default EditEnderecoScreen;
