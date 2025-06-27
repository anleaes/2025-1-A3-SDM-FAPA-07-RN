import { Picker } from '@react-native-picker/picker';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateOrdemServicoItem'>;

const CreateOrdemServicoItemScreen = ({ navigation }: Props) => {
  const [quantidade, setQuantidade] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [ordemServico, setOrdemServico] = useState('');
  const [servico, setServico] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ordens, setOrdens] = useState<{ id: number }[]>([]);
  const [servicos, setServicos] = useState<{ id: number; nome: string }[]>([]);

  useFocusEffect(
    useCallback(() => {
      setQuantidade('');
      setValorUnitario('');
      setOrdemServico('');
      setServico('');
      setError(null);
      fetch('http://localhost:8000/ordemServico/')
        .then(res => res.json())
        .then(data => setOrdens(data.map((o: any) => ({ id: o.id }))))
        .catch(() => setOrdens([]));
      fetch('http://localhost:8000/servicos/')
        .then(res => res.json())
        .then(data => setServicos(data.map((s: any) => ({ id: s.id, nome: s.nome || s.name })))).catch(() => setServicos([]));
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/ordemServicoItem/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quantidade: quantidade ? Number(quantidade) : null,
          valor_unitario: valorUnitario ? Number(valorUnitario) : null,
          ordem_servico: ordemServico ? Number(ordemServico) : null,
          servico: servico ? Number(servico) : null,
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Erro ao criar item');
      }
      setQuantidade('');
      setValorUnitario('');
      setOrdemServico('');
      setServico('');
      navigation.navigate('OrdemServicoItens');
    } catch (e: any) {
      setError(e.message || 'Erro desconhecido');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Item da Ordem de Serviço</Text>
      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        value={quantidade}
        onChangeText={setQuantidade}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Valor Unitário</Text>
      <TextInput
        value={valorUnitario}
        onChangeText={setValorUnitario}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Ordem de Serviço</Text>
      <View style={[styles.input, { padding: 0 }]}> 
        <Picker selectedValue={ordemServico} onValueChange={setOrdemServico}>
          <Picker.Item label="Selecione..." value="" />
          {ordens.map(o => (
            <Picker.Item key={o.id} label={String(o.id)} value={String(o.id)} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Serviço</Text>
      <View style={[styles.input, { padding: 0 }]}> 
        <Picker selectedValue={servico} onValueChange={setServico}>
          <Picker.Item label="Selecione..." value="" />
          {servicos.map(s => (
            <Picker.Item key={s.id} label={s.nome} value={String(s.id)} />
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
      <Button title="Voltar" onPress={() => navigation.navigate('OrdemServicoItens')} />
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

export default CreateOrdemServicoItemScreen;
