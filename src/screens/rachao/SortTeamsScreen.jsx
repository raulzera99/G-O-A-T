import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Switch, TextInput } from "@react-native-material/core";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import Checkbox from "expo-checkbox";
import { useForm, Controller } from "react-hook-form";
import AppBar from "../../components/common/AppBar";

const SortTeamsScreen = ({ navigation }) => {
  const { control, handleSubmit, setValue } = useForm();
  const [numTimes, setNumTimes] = useState(0);
  const [sortearNotas, setSortearNotas] = useState(false);
  const [priorizarMensalistas, setPriorizarMensalistas] = useState(false);
  const [formato, setFormato] = useState("5x5"); // Valor padrão 5x5
  const [times, setTimes] = useState([]);
  const [jogadores, setJogadores] = useState([]);
  const [jogadoresNotas, setJogadoresNotas] = useState([]);
  const [jogadoresMensalistas, setJogadoresMensalistas] = useState([]);
  const [jogadoresNaoMensalistas, setJogadoresNaoMensalistas] = useState([]);

  const onSubmit = (data) => {
    // Manipular os dados do formulário aqui
    console.log(data);
    // Navegar para a próxima tela (por exemplo, "Rachao")
    navigation.navigate("AliveMatchup");
  };

  return (
    <>
      <AppBar
        title="Sorteio de Times"
        subtitle="Sorteie os times para o rachão"
        centerSubtitle={true}
      />
      <View style={styles.container}>
        <Text style={styles.label}>Configurações do Sorteio</Text>
        <View style={styles.formContainer}>
          <View style={styles.formItem}>
            <Controller
              control={control}
              render={({ field }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Número de times"
                  onChangeText={(text) => {
                    setNumTimes(text);
                    setValue("numTimes", text);
                  }}
                  value={numTimes}
                  keyboardType="numeric"
                ></TextInput>
              )}
              name="numTimes"
              rules={{ required: "Campo obrigatório" }}
            />
          </View>

          <View style={styles.formItem}>
            <Text style={styles.formLabel}>
              Sortear com base nas notas dos jogadores
            </Text>
            <Controller
              control={control}
              render={({ field }) => (
                <Switch
                  value={sortearNotas}
                  onValueChange={(value) => setSortearNotas(value)}
                />
              )}
              name="sortearNotas"
            />
          </View>

          <View style={styles.formItem}>
            <Text style={styles.formLabel}>
              Priorizar mensalistas do rachão
            </Text>
            <Controller
              control={control}
              render={({ field }) => (
                <Switch
                  value={priorizarMensalistas}
                  onValueChange={(value) => setPriorizarMensalistas(value)}
                />
              )}
              name="priorizarMensalistas"
            />
          </View>

          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Formato</Text>
            <Controller
              control={control}
              render={({ field }) => (
                <View style={styles.radioGroup}>
                  <View style={styles.checkboxContainer}>
                    <Text style={styles.radioLabel}>3x3</Text>
                    <Checkbox
                      value={formato === "3x3"}
                      onValueChange={(value) => {
                        if (!value) {
                          setFormato("");
                        } else {
                          setFormato("3x3");
                        }
                      }}
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.checkboxContainer}>
                    <Text style={styles.radioLabel}>5x5</Text>
                    <Checkbox
                      value={formato === "5x5"}
                      onValueChange={(value) => {
                        if (!value) {
                          setFormato("");
                        } else {
                          setFormato("5x5");
                        }
                      }}
                      style={styles.checkbox}
                    />
                  </View>
                </View>
              )}
              name="formato"
            />
          </View>
        </View>

        <Button
          style={styles.button}
          title="Sortear"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  formContainer: {
    marginBottom: 16,
  },
  formItem: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  button: {
    marginBottom: 16,
    backgroundColor: "#da733c",
  },
  checkbox: {
    marginHorizontal: 64,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SortTeamsScreen;
