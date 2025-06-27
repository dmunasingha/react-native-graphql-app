import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import { List, Snackbar, IconButton, useTheme } from 'react-native-paper';
import customDarkTheme from '../theme';

const GET_TODOS = gql`
  query getTodos {
    getTodos {
      id
      title
      completed
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation toggleTodo($id: Int!) {
    toggleTodo(id: $id) {
      id
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

export default function TodoList() {
  const theme = customDarkTheme;

  const { loading, error, data } = useQuery(GET_TODOS);
  const [toggleTodo] = useMutation(TOGGLE_TODO, { refetchQueries: ['getTodos'] });
  const [deleteTodo] = useMutation(DELETE_TODO, { refetchQueries: ['getTodos'] });
  const [createTodo] = useMutation(ADD_TODO, { refetchQueries: ['getTodos'] });

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarAction, setSnackbarAction] = useState(null);
  const [snackbarCounter, setSnackbarCounter] = useState(0);

  const [lastToggledId, setLastToggledId] = useState(null);

  if (loading) return null;
  if (error) return null;

  const handleToggle = async (id) => {
    try {
      await toggleTodo({ variables: { id: parseInt(id, 10) } });

      setSnackbarAction(null);
      setSnackbarMessage('');

      setLastToggledId(id);

      setSnackbarCounter((c) => c + 1);

      setSnackbarMessage('Todo toggled!');
      setSnackbarAction(() => () => handleUndoToggle());
      setSnackbarVisible(true);
    } catch (err) {
      console.error('❌ Toggle error:', err.message || err);
    }
  };

  const handleUndoToggle = async () => {
    if (lastToggledId != null) {
      try {
        await toggleTodo({ variables: { id: parseInt(lastToggledId, 10) } });
      } catch (err) {
        console.error('❌ Undo toggle error:', err.message || err);
      }
    }
  };

  const handleDelete = async (item) => {
    Alert.alert(
      'Delete Todo',
      `Are you sure you want to delete "${item.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTodo({ variables: { id: parseInt(item.id, 10) } });

              setSnackbarAction(null);
              setSnackbarMessage('');

              setSnackbarCounter((c) => c + 1);

              setSnackbarAction(() => async () => {
                try {
                  await createTodo({
                    variables: { title: item.title },
                  });
                  setSnackbarMessage('Todo restored!');
                  setSnackbarVisible(true);
                } catch (err) {
                  console.error('❌ Undo delete error:', err.message || err);
                }
              });

              setSnackbarMessage('Todo deleted!');
              setSnackbarVisible(true);
            } catch (err) {
              console.error('❌ Delete error:', err.message || err);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <List.Item
      title={item.title}
      titleStyle={[
        styles.todoText,
        item.completed && { textDecorationLine: 'line-through', color: theme.colors.disabled },
      ]}
      onPress={() => handleToggle(item.id)}
      left={(props) => (
        <List.Icon
          {...props}
          icon={item.completed ? 'check-circle' : 'checkbox-blank-circle-outline'}
          color={item.completed ? theme.colors.accent : theme.colors.onBackground}
        />
      )}
      right={(props) => (
        <IconButton
          {...props}
          icon="delete"
          color={theme.colors.error}
          onPress={() => handleDelete(item)}
          accessibilityLabel={`Delete ${item.title}`}
        />
      )}
      style={styles.todoItem}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={data.getTodos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <Snackbar
        key={snackbarCounter}
        visible={snackbarVisible}
        onDismiss={() => {
          setSnackbarVisible(false);
          setSnackbarAction(null);
          setSnackbarMessage('');
        }}
        duration={3000}
        action={
          snackbarAction
            ? {
              label: 'Undo',
              onPress: () => snackbarAction?.(),
            }
            : undefined
        }
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todoItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  todoText: {
    fontSize: 18,
    color: '#eee',
  },
});
