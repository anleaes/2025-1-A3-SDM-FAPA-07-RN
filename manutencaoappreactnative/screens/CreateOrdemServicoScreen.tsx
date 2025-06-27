import { Picker } from '@react-native-picker/picker';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateOrdemServico'>;

const CreateOrdemServicoScreen = ({ navigation }: Props) => {
  const [dataFechamento, setDataFechamento] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('aberta');
  const [cliente, setCliente] = useState('');
  const [endereco, setEndereco] = useState('');
  const [tecnico, setTecnico] = useState('');
  const [servico, setServico] = useState('');
  const [tipoDeServico, setTipoDeServico] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientes, setClientes] = useState<{ id: number; nome: string }[]>([]);
  const [enderecos, setEnderecos] = useState<{ id: number; rua: string }[]>([]);
  const [tecnicos, setTecnicos] = useState<{ id: number; nome: string }[]>([]);
  const [servicos, setServicos] = useState<{ id: number; nome: string }[]>([]);
  const [tiposDeServico, setTiposDeServico] = useState<{ id: number; nome: string }[]>([]);

  const statusOptions = [
    { label: 'Aberta', value: 'aberta' },
    { label: 'Em Andamento', value: 'em_andamento' },
    { label: 'Finalizada', value: 'finalizada' },
    { label: 'Cancelada', value: 'cancelada' },
  ];

  useFocusEffect(
    useCallback(() => {
      setDataFechamento('');
      setDescricao('');
      setStatus('aberta');
      setCliente('');
      setEndereco('');
      setTecnico('');
      setServico('');
      setTipoDeServico('');
      setError(null);
      fetch('http://localhost:8000/cliente/')
        .then(res => res.json())
        .then(data => setClientes(data.map((c: any) => ({ id: c.id, nome: c.nome || c.name })))).catch(() => setClientes([]));
      fetch('http://localhost:8000/endereco/')
        .then(res => res.json())
        .then(data => setEnderecos(data.map((e: any) => ({ id: e.id, rua: e.rua })))).catch(() => setEnderecos([]));
      fetch('http://localhost:8000/tecnico/')
        .then(res => res.json())
        .then(data => setTecnicos(data.map((t: any) => ({ id: t.id, nome: t.nome || t.name })))).catch(() => setTecnicos([]));
      fetch('http://localhost:8000/servicos/')
        .then(res => res.json())
        .then(data => setServicos(data.map((s: any) => ({ id: s.id, nome: s.nome || s.name })))).catch(() => setServicos([]));
      fetch('http://localhost:8000/tipoDeServico/')
        .then(res => res.json())
        .then(data => setTiposDeServico(data.map((t: any) => ({ id: t.id, nome: t.nome || t.name })))).catch(() => setTiposDeServico([]));
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/ordemServico/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data_fechamento: dataFechamento,
          descricao,
          status,
          cliente: cliente ? Number(cliente) : null,
          endereco: endereco ? Number(endereco) : null,
          tecnico: tecnico ? Number(tecnico) : null,
          servico: servico ? Number(servico) : null,
          tipos_servicos: tipoDeServico ? [Number(tipoDeServico)] : [],
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Erro ao criar ordem de serviço');
      }
      setDataFechamento('');
      setDescricao('');
      setStatus('aberta');
      setCliente('');
      setEndereco('');
      setTecnico('');
      setServico('');
      setTipoDeServico('');
      navigation.navigate('OrdemServicos');
    } catch (e: any) {
      setError(e.message || 'Erro desconhecido');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Ordem de Serviço</Text>
      <Text style={styles.label}>Data de Fechamento</Text>
      <TextInput
        value={dataFechamento}
        onChangeText={setDataFechamento}
        style={styles.input}
        placeholder="YYYY-MM-DD"
      />
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        style={[styles.input, { height: 80 }]}
        multiline
      />
      <Text style={styles.label}>Status</Text>
      <View style={[styles.input, { padding: 0 }]}> 
        <Picker selectedValue={status} onValueChange={v => setStatus(v)}>
          {statusOptions.map(opt => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Cliente</Text>
      <View style={[styles.input, { padding: 0 }]}> 
        <Picker selectedValue={cliente} onValueChange={setCliente}>
          <Picker.Item label="Selecione..." value="" />
          {clientes.map(c => (
            <Picker.Item key={c.id} label={c.nome} value={String(c.id)} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Endereço</Text>
      <View style={[styles.input, { padding: 0 }]}> 
        <Picker selectedValue={endereco} onValueChange={setEndereco}>
          <Picker.Item label="Selecione..." value="" />
          {enderecos.map(e => (
            <Picker.Item key={e.id} label={e.rua} value={String(e.id)} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Técnico</Text>
      <View style={[styles.input, { padding: 0 }]}> 
        <Picker selectedValue={tecnico} onValueChange={setTecnico}>
          <Picker.Item label="Selecione..." value="" />
          {tecnicos.map(t => (
            <Picker.Item key={t.id} label={t.nome} value={String(t.id)} />
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
      <Text style={styles.label}>Tipo de Serviço</Text>
      <View style={[styles.input, { padding: 0 }]}> 
        <Picker selectedValue={tipoDeServico} onValueChange={setTipoDeServico}>
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
      <Button title="Voltar" onPress={() => navigation.navigate('OrdemServicos')} />
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

export default CreateOrdemServicoScreen;
