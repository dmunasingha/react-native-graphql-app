import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import customDarkTheme from '../theme';
import { Button, TextInput } from 'react-native-paper';

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
        if (!title.trim()) { alert('Add title'); return; }
        addTodo({ variables: { title } });
        setTitle('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Add new todo"
                placeholderTextColor={theme.colors.onBackground}
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <Button icon="plus" mode='contained-tonal' style={{ borderRadius: 5 }} onPress={onSubmit} >
                Add
            </Button>
        </View>
    );
}

const theme = customDarkTheme;

const styles = StyleSheet.create({
    container: { flexDirection: 'row', margin: 10, marginBottom: 20 },
    input: {
        flex: 1,
        marginRight: 10,
        paddingHorizontal: 8,
        height: 40,
        color: theme.colors.onBackground,
        backgroundColor: theme.colors.surface,
    },
});
