import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskList from './components/TaskList';  // Tuodaan TaskList-komponentti, joka näyttää tehtävät
import AddTask from './components/AddTask';    // Tuodaan AddTask-komponentti, joka lisää uusia tehtäviä

const App = () => {
  // Alustetaan tila tehtäville
  const [tasks, setTasks] = useState([]);

  // Käytetään useEffectia tehtävien lataamiseen kun komponentti on ladattu
  useEffect(() => {
    const loadTasks = async () => {
      try {
        // Yritetään hakea tallennetut tehtävät AsyncStorage:stä
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          // Jos tehtäviä löytyy, asetetaan ne tilaan
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        // Jos tapahtuu virhe, tulostetaan virhe konsoliin
        console.error(error);
      }
    };

    loadTasks();
  }, []);  // Tyhjät riippuvuudet tarkoittavat, että tämä koodi ajetaan vain kerran, kun komponentti ladataan

  // Funktio, jolla lisätään uusi tehtävä
  const addTask = async (task) => {
    // Luodaan uusi tehtävälistaus, jossa uusi tehtävä lisätään
    const newTasks = [...tasks, { id: Date.now().toString(), text: task, done: false }];
    // Päivitetään tila uudella tehtävälistalla
    setTasks(newTasks);
    // Tallennetaan uusi tehtävälista AsyncStorage:iin
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  // Funktio, jolla vaihdetaan tehtävän tilaa (tehty/ei tehty)
  const toggleTaskStatus = async (id) => {
    // Päivitetään tehtävän tila
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    // Päivitetään tila päivitettyjen tehtävien kanssa
    setTasks(updatedTasks);
    // Tallennetaan päivitetty tehtävälista AsyncStorage:iin
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Funktio, jolla poistetaan kaikki tehtävät
  const clearTasks = async () => {
    try {
      // Tyhjennetään tehtävälista ja poistetaan kaikki tiedot AsyncStorage:stä
      setTasks([]);
      await AsyncStorage.removeItem('tasks');
    } catch (error) {
      // Jos tapahtuu virhe, tulostetaan virhe konsoliin
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      {/* Näytetään AddTask-komponentti, joka mahdollistaa uusien tehtävien lisäämisen */}
      <AddTask addTask={addTask} />
      {/* Näytetään TaskList-komponentti, joka näyttää tehtävät ja mahdollistaa niiden tilan vaihtamisen */}
      <TaskList tasks={tasks} toggleTaskStatus={toggleTaskStatus} />
      {/* Näytetään nappi, jolla voidaan poistaa kaikki tehtävät */}
      <Button title="DELETE TASKS" onPress={clearTasks} color="#ff4444" />
    </View>
  );
};

// Tyylit komponentille
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 20, // Lisätty vaakasuora tyylitys parempaa asettelua varten
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default App;
