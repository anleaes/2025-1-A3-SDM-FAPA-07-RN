import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

// Ajuste o tipo conforme o esperado no DrawerParamList

type Props = DrawerScreenProps<DrawerParamList, 'EditTecnico'>;

const EditTecnicoScreen = ({ route, navigation }: Props) => {
  if (!route.params || !route.params.tecnico) {
    navigation.navigate('Tecnicos');
    return null;
  }
  const { tecnico } = route.params;
  const [nome, setNome] = useState(tecnico.nome);
  const [telefone, setTelefone] = useState(tecnico.telefone);
  const [email, setEmail] = useState(tecnico.email);
  const [especialidade, setEspecialidade] = useState(tecnico.especialidade);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setNome(tecnico.nome);
    setTelefone(tecnico.telefone);
    setEmail(tecnico.email);
    setEspecialidade(tecnico.especialidade);
  }, [tecnico]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/tecnico/${tecnico.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          telefone,
          email,
          especialidade,
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Erro ao salvar técnico');
      }
      navigation.navigate('Tecnicos');
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
      <Text style={styles.label}>Especialidade</Text>
      <TextInput
        value={especialidade}
        onChangeText={setEspecialidade}
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
      <Button title="Voltar" onPress={() => navigation.navigate('Tecnicos')} />
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

export default EditTecnicoScreen;
