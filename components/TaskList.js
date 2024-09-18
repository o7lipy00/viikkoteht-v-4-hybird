import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TaskItem from './TaskItem'; // Tuodaan TaskItem-komponentti, joka näyttää yksittäiset tehtävät

const TaskList = ({ tasks, toggleTaskStatus }) => {
  return (
    <View>
      {/* FlatList-komponentti käytetään tehokkaasti pitkien listojen näyttämiseen */}
      <FlatList
        data={tasks} // Lista näytettävistä tehtävistä
        renderItem={({ item }) => (
          // Renderöidään jokainen tehtävä TaskItem-komponentilla
          <TaskItem task={item} toggleTaskStatus={toggleTaskStatus} />
        )}
        keyExtractor={item => item.id} // Määritetään yksilöllinen avain jokaiselle listan kohteelle
      />
    </View>
  );
};

export default TaskList;
