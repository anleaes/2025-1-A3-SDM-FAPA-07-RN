import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

// Ajuste o tipo conforme o esperado no DrawerParamList

type Props = DrawerScreenProps<DrawerParamList, 'EditCliente'>;

const EditClienteScreen = ({ route, navigation }: Props) => {
  if (!route.params || !route.params.cliente) {
    navigation.navigate('Clientes');
    return null;
  }
  const { cliente } = route.params;
  const [nome, setNome] = useState(cliente.nome);
  const [telefone, setTelefone] = useState(cliente.telefone);
  const [email, setEmail] = useState(cliente.email);
  const [cpf_cnpj, setCpfCnpj] = useState(cliente.cpf_cnpj);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setNome(cliente.nome);
    setTelefone(cliente.telefone);
    setEmail(cliente.email);
    setCpfCnpj(cliente.cpf_cnpj);
  }, [cliente]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/cliente/${cliente.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          telefone,
          email,
          cpf_cnpj,
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Erro ao salvar cliente');
      }
      navigation.navigate('Clientes');
    } catch (e: any) {
      setError(e.message || 'Erro desconhecido');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <Text style={styles.label}>Telefone</Text>
      <TextInput
        value={telefone}
        onChangeText={setTelefone}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <Text style={styles.label}>CPF/CNPJ</Text>
      <TextInput
        value={cpf_cnpj}
        onChangeText={setCpfCnpj}
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
      <Button title="Voltar" onPress={() => navigation.navigate('Clientes')} />
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

export default EditClienteScreen;
