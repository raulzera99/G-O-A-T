import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Button, Divider } from "@react-native-material/core";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddRachaoScreen = () => {
  const [date, setDate] = useState(new Date());
  const [start_time, setStartTime] = useState(new Date());
  const [end_time, setEndTime] = useState(new Date());

  const handleDateChange = (event, selectedDate) => {
    setDate(selectedDate || date);
  };

  const handleStartTimeChange = (event, selectedTime) => {
    setStartTime(selectedTime || start_time);
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setEndTime(selectedTime || end_time);
  };

  const handleSubmit = () => {
    // Salvar dados no AsyncStorage
    // TODO - Salvar dados no AsyncStorage
    // Redirecionar para a tela de rachão
    alert("Rachão adicionado com sucesso!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>DATA</Text>
      <View style={styles.pickerContainer}>
        <View style={styles.picker}>
          <DateTimePicker
            value={date}
            onChange={handleDateChange}
            mode="date"
            locale="pt-BR"
            style={styles.dateTimePicker}
          />
        </View>
      </View>
      <Divider style={styles.divider} />
      <Text style={styles.label}>INÍCIO</Text>
      <View style={styles.pickerContainer}>
        <View style={styles.picker}>
          <DateTimePicker
            value={start_time}
            onChange={handleStartTimeChange}
            mode="time"
            locale="pt-BR"
            style={styles.dateTimePicker}
          />
        </View>
      </View>
      <Divider style={styles.divider} />
      <Text style={styles.label}>FIM</Text>
      <View style={styles.pickerContainer}>
        <View style={styles.picker}>
          <DateTimePicker
            value={end_time}
            onChange={handleEndTimeChange}
            mode="time"
            locale="pt-BR"
            style={styles.dateTimePicker}
          />
        </View>
      </View>
      <Divider style={styles.divider} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>ADICIONAR RACHÃO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFAD80",
  },
  pickerContainer: {
    marginBottom: 20,
    justifyContent: "center",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 8,
  },
  picker: {
    width: "100%",
    alignItems: "center",
  },
  dateTimePicker: {},
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#da733c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  divider: {
    marginBottom: 20,
  },
});

export default AddRachaoScreen;
