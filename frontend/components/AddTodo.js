import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { gql, useMutation } from '@apollo/client';

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

export default function AddTodo() {
    const [title, setTitle] = useState('');
    const [addTodo] = useMutation(ADD_TODO, {
        refetchQueries: ['getTodos'],
    });

    const onSubmit = () => {
        if (!title.trim()) return;
        addTodo({ variables: { title } });
        setTitle('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Add new todo"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <Button title="Add" onPress={onSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', margin: 10 },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#999',
        marginRight: 10,
        paddingHorizontal: 8,
        height: 40,
        borderRadius: 4,
    },
});
