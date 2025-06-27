import { Picker } from '@react-native-picker/picker';
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

// Ajuste o tipo conforme o esperado no DrawerParamList

type Props = DrawerScreenProps<DrawerParamList, 'EditServico'>;

const EditServicoScreen = ({ route, navigation }: Props) => {
  if (!route.params || !route.params.servico) {
    // Se não houver parâmetro, volta para a lista
    navigation.navigate('Servicos');
    return null;
  }
  const { servico } = route.params;
  const [nome, setNome] = useState(servico.nome);
  const [descricao, setDescricao] = useState(servico.descricao);
  const [preco, setPreco] = useState(String(servico.preco));
  const [tipoDeServico, setTipoDeServico] = useState(
    typeof servico.tipoDeServico === 'object' && servico.tipoDeServico !== null
      ? String(servico.tipoDeServico.id)
      : String(servico.tipoDeServico)
  );
  const [tiposDeServico, setTiposDeServico] = useState<{ id: number; nome: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setNome(servico.nome);
    setDescricao(servico.descricao);
    setPreco(String(servico.preco));
    setTipoDeServico(
      typeof servico.tipoDeServico === 'object' && servico.tipoDeServico !== null
        ? String(servico.tipoDeServico.id)
        : String(servico.tipoDeServico)
    );
    // Buscar tipos de serviço
    fetch('http://localhost:8000/tipoDeServico/')
      .then(res => res.json())
      .then(data => setTiposDeServico(data.map((t: any) => ({ id: t.id, nome: t.nome || t.name }))));
  }, [servico]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/servicos/${servico.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          descricao,
          preco: Number(preco),
          tipo_de_servico: Number(tipoDeServico),
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Erro ao salvar serviço');
      }
      navigation.navigate('Servicos');
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
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <Text style={styles.label}>Preço</Text>
      <TextInput
        value={preco}
        onChangeText={setPreco}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Tipo de Serviço</Text>
      <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12 }}>
        <Picker
          selectedValue={tipoDeServico}
          onValueChange={setTipoDeServico}
        >
          <Picker.Item label="Selecione..." value="" />
          {tiposDeServico.map((t) => (
            <Picker.Item key={t.id} label={t.nome} value={String(t.id)} />
          ))}
        </Picker>
      </View>
      {error && (
        <Text style={{ color: 'red', marginVertical: 8 }}>{error}</Text>
      )}
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Servicos')} />
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

export default EditServicoScreen;
