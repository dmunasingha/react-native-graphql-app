import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { ApolloProvider } from '@apollo/client';

import client from './apollo/client';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Todo App with GraphQL</Text>
        <AddTodo />
        <TodoList />
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 40 },
  header: { fontSize: 24, textAlign: 'center', marginVertical: 20 },
});
