import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, ListItem, Button, Divider } from "@react-native-material/core";
import AppBar from "../../components/common/AppBar";

const FinanceiroScreen = () => {
  const [payments, setPayments] = useState([
    {
      id: "1",
      date: "2023-01-15",
      amount: 50,
      participant: "John Doe",
      status: "Pago",
    },
    {
      id: "2",
      date: "2023-02-01",
      amount: 50,
      participant: "Jane Smith",
      status: "Pendente",
    },
    // Add more payment data as needed
  ]);

  const renderPaymentItem = ({ item }) => (
    <View style={styles.paymentItemContainer}>
      <ListItem>
        <View style={styles.paymentDetails}>
          <Text style={styles.participantText}>{item.participant}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <Text style={styles.amountText}>{`R$ ${item.amount.toFixed(2)}`}</Text>
      </ListItem>
      <Divider />
    </View>
  );

  return (
    <View style={styles.container}>
      <AppBar
        title="Financeiro"
        subtitle="Organize a mensalidade e priorize os mensalistas do rachão"
        centerTitle={true}
        centerSubtitle={true}
      />
      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        renderItem={renderPaymentItem}
      />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.addButton}
          onPress={() => handleAddPayment()}
          mode="contained"
        >
          Adicionar Pagamento
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  paymentItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  paymentDetails: {
    flex: 1,
    flexDirection: "column",
  },
  participantText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "#555",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  buttonContainer: {
    padding: 16,
  },
  addButton: {
    backgroundColor: "#da733c",
  },
});

export default FinanceiroScreen;
