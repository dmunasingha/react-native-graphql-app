const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    Query: {
        getTodos: async () => {
            return await prisma.todo.findMany({
                orderBy: { createdAt: 'desc' },
            });
        },
    },
    Mutation: {
        addTodo: async (_, { title }) => {
            return await prisma.todo.create({
                data: { title },
            });
        },

        toggleTodo: async (_, { id }) => {
            const todo = await prisma.todo.findUnique({ where: { id } });
            if (!todo) throw new Error('Todo not found');
            return await prisma.todo.update({
                where: { id },
                data: { completed: !todo.completed },
            });
        },

        deleteTodo: async (_, { id }) => {
            await prisma.todo.delete({ where: { id } });
            return "Deleted successfully";
        },
    },
};
