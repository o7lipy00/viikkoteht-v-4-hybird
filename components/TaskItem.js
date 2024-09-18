import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const TaskItem = ({ task, toggleTaskStatus }) => {
  return (
    <TouchableOpacity
      // Muodostetaan komponentin tyyli: lisätään done-tyyli, jos tehtävä on tehty
      style={[styles.item, task.done && styles.done]}
      // Kun tehtävää painetaan, kutsutaan toggleTaskStatus-funktiota tehtävän id:llä
      onPress={() => toggleTaskStatus(task.id)}
    >
      {/* Näytetään tehtävän teksti */}
      <Text style={styles.text}>{task.text}</Text>
    </TouchableOpacity>
  );
};

// Tyylit komponentille
const styles = StyleSheet.create({
  item: {
    padding: 15, // Lisää tilaa sisäreunoihin
    marginBottom: 10, // Lisää tilaa komponentin alle
    backgroundColor: '#f8f8f8', // Komponentin taustaväri
    borderRadius: 5, // Kulmien pyöristys
  },
  done: {
    backgroundColor: '#d3ffd3', // Väri, joka näytetään, kun tehtävä on tehty
  },
  text: {
    fontSize: 18, // Tekstin koko
  },
});

export default TaskItem;

