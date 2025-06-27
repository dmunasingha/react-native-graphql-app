import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';

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

export default function TodoList() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [toggleTodo] = useMutation(TOGGLE_TODO, { refetchQueries: ['getTodos'], errorPolicy: 'all' });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: ['getTodos'],
    errorPolicy: 'all',
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>

      {/* Toggle */}
      <TouchableOpacity
        onPress={async () => {
          try {
            const res = await toggleTodo({ variables: { id: parseInt(item.id, 10) } });
            if (res) {

            }
          } catch (err) {
            console.error('❌ Toggle error:', err.message || err);
          }
        }}

      >
        <Text style={[styles.todoText, item.completed && styles.completed]}>
          {item.title}
        </Text>
      </TouchableOpacity>

      {/* Delete */}
      <TouchableOpacity
        onPress={async () => {
          try {
            const res = await deleteTodo({ variables: { id: parseInt(item.id, 10) } });
          } catch (err) {
            console.error('❌ Delete error:', err.message || err);
          }
        }}
      >
        <Text style={styles.delete}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  return <FlatList data={data.getTodos} keyExtractor={(item) => item.id} renderItem={renderItem} />;
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoText: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  delete: {
    color: 'red',
    fontSize: 18,
  },
});
