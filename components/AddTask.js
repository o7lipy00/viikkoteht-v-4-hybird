import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddTask = ({ addTask }) => {
  // Alustetaan tila tehtävätekstille
  const [task, setTask] = useState('');

  // Funktio, jota kutsutaan, kun käyttäjä haluaa lisätä tehtävän
  const handleAddTask = () => {
    // Tarkistetaan, ettei tehtäväteksti ole tyhjää tai pelkkää välilyöntiä
    if (task.trim()) {
      // Kutsutaan vanhempaan komponenttiin annettua addTask-funktiota uuden tehtävän kanssa
      addTask(task);
      // Tyhjennetään tekstikenttä
      setTask('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Tekstikenttä tehtävän kirjoittamista varten */}
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={setTask} // Päivittää tilaa aina, kun tekstikentän teksti muuttuu
        placeholder="Enter task..." // Näyttää ohjeen tekstikentässä
      />
      {/* Nappi, jota käyttäjä painaa lisätäkseen tehtävän */}
      <Button title="SAVE" onPress={handleAddTask} />
    </View>
  );
};

// Tyylit komponentille
const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // Lisää tilaa komponentin alapuolelle
  },
  input: {
    height: 40, // Tekstikentän korkeus
    borderColor: '#ccc', // Kehyksen väri
    borderWidth: 1, // Kehyksen paksuus
    marginBottom: 10, // Lisää tilaa tekstikentän alle
    paddingHorizontal: 10, // Lisää tilaa tekstin ympärille
  },
});

export default AddTask;