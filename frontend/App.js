import { SafeAreaView, StyleSheet, Text, useColorScheme } from 'react-native';
import { ApolloProvider } from '@apollo/client';

import client from './apollo/client';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { PaperProvider } from 'react-native-paper';
import customDarkTheme from './theme';

const theme = customDarkTheme;

export default function App() {

  return (
    <PaperProvider theme={theme}>
      <ApolloProvider client={client}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Todo App with GraphQL</Text>
          <AddTodo />
          <TodoList />
        </SafeAreaView>
      </ApolloProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'flex-start', alignItems: 'stretch', paddingTop: 40, backgroundColor: theme.colors.background, color: theme.colors.onBackground
  },
  header: { fontSize: 34, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: theme.colors.onBackground },
});
