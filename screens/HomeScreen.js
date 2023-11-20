import React, { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  View,
  ImageBackground,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

function HomeScreen({ navigation }) {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const savedTodos = await AsyncStorage.getItem("todos")
        if (savedTodos) {
          setTodos(JSON.parse(savedTodos))
        }
      } catch (e) {
        console.error("Failed to load todos.")
      }
    }

    loadTodos()
  }, [])

  const addTodo = async (todo) => {
    const newTodos = [...todos, todo]
    setTodos(newTodos)
    await AsyncStorage.setItem("todos", JSON.stringify(newTodos))
  }

  const deleteTodo = async (index) => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
    await AsyncStorage.setItem("todos", JSON.stringify(newTodos))
  }

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e",
      }}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <FlatList
          data={todos}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => deleteTodo(index)}
              style={styles.todo}
            >
              <Text style={styles.todoText}>{item}</Text>
              <MaterialIcons name="delete" size={24} color="#fff" />
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTodo", { addTodo })}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  addButton: {
    backgroundColor: "#E91790",
    borderRadius: 45,
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 150,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
  },
  todo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 16,
    marginTop: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  todoText: {
    color: "#fff",
    flex: 1,
  },
})

export default HomeScreen
