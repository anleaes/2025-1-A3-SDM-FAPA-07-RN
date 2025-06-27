import { Picker } from '@react-native-picker/picker';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateServico'>;

const CreateServicoScreen = ({ navigation }: Props) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [tipoDeServico, setTipoDeServico] = useState<string>('');
  const [tiposDeServico, setTiposDeServico] = useState<{ id: number; nome: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      setNome('');
      setDescricao('');
      setPreco('');
      setTipoDeServico('');
      setError(null);
      // Buscar tipos de serviço
      fetch('http://localhost:8000/tipoDeServico/')
        .then(res => res.json())
        .then(data => setTiposDeServico(data.map((t: any) => ({ id: t.id, nome: t.nome || t.name }))))
        .catch(() => setTiposDeServico([]));
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/servicos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          descricao,
          preco: Number(preco),
          tipo_de_servico: tipoDeServico ? Number(tipoDeServico) : null,
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Erro ao criar serviço');
      }
      setNome('');
      setDescricao('');
      setPreco('');
      setTipoDeServico('');
      navigation.navigate('Servicos');
    } catch (e: any) {
      setError(e.message || 'Erro desconhecido');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo serviço</Text>
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
      <View style={[styles.input, { padding: 0 }]}>
        <Picker
          selectedValue={tipoDeServico}
          onValueChange={setTipoDeServico}
        >
          <Picker.Item label="Selecione..." value="" />
          {tiposDeServico.map(ts => (
            <Picker.Item key={ts.id} label={ts.nome} value={String(ts.id)} />
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
      <Button title="Voltar" onPress={() => navigation.navigate('Servicos')} />
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

export default CreateServicoScreen;