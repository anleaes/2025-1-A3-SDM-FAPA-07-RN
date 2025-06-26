import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditTipoDeServico'>;

const EditTipoDeServicoScreen = ({ route, navigation }: Props) => {
  const { tipo } = route.params;
  const [nome, setNome] = useState(tipo.nome);
  const [descricao, setDescricao] = useState(tipo.descricao);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    setNome(tipo.nome);
    setDescricao(tipo.descricao);
  }, [tipo]);

  const handleSalvar = async () => {
    setSalvando(true);
    try {
      await fetch(`http://127.0.0.1:8000/tipoDeServico/${tipo.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, descricao }),
      });
      navigation.navigate('TipoDeServico');
    } catch (error) {
      console.error('Erro ao atualizar tipo de serviço:', error);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Tipo de Serviço</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      {salvando ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSalvar} color="#4B7BE5" />
      )}

      <Button title="Voltar" onPress={() => navigation.navigate('TipoDeServico')} />
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
    alignSelf: 'center'
  },
  label: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10
  },
});

export default EditTipoDeServicoScreen;