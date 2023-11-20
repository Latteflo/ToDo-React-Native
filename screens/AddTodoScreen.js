import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';

function AddTodoScreen({ route, navigation }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    route.params.addTodo(text);
    navigation.goBack();
    setText('');
  };

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e" }}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="New todo" 
          placeholderTextColor="#aaa" 
          value={text} 
          onChangeText={setText} 
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleSubmit}
        >
          <Text style={styles.addButtonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    color: '#fff', 
  },
  addButton: {
    backgroundColor: '#E91790',
    borderRadius: 50,
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20, 
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default AddTodoScreen;
