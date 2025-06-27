import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditTipoDeServico'>;

const EditTipoDeServicoScreen = ({ route, navigation }: Props) => {
  const { tipoDeServico } = route.params;
  const [name, setName] = useState(tipoDeServico.name);
  const [description, setDescription] = useState(tipoDeServico.description);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(tipoDeServico.name);
    setDescription(tipoDeServico.description);
  }, [tipoDeServico]);  

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/tipoDeServico/${tipoDeServico.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, descricao: description }),
      }
    );
    navigation.navigate('TipoDeServicos');        
    setSaving(false);  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('TipoDeServicos')} />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fff' 
  },
  label: { 
    fontWeight: 'bold', 
    marginTop: 12, 
    marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default EditTipoDeServicoScreen;