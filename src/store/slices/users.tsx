import { User } from '@Customtypes/users';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UsersState = {
    users: Array<User>;
    getFilteredUsers: Array<User>;
    searchTerm: string;
};

const initialState: UsersState = {
    users: [],
    getFilteredUsers: [],
    searchTerm: '',
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser(state, action: PayloadAction<User>) {
            const lastUserId = state.users.at(-1)?.id || 0;
            const newUser = { ...action.payload, id: lastUserId + 1 };

            state.users.push(newUser);
            state.getFilteredUsers = state.searchTerm
                ? state.users.filter(user => [user.firstName, user.lastName, user.email].some(field => field.toLowerCase().includes(state.searchTerm)))
                : [...state.users];
        },

        deleteUserById(state, action: PayloadAction<number>) {
            state.users = state.users.filter(user => user.id !== action.payload);
            state.getFilteredUsers = state.getFilteredUsers.filter(user => user.id !== action.payload);
        },

        setUsers(state, action: PayloadAction<Array<User>>) {
            state.users = action.payload;
            state.getFilteredUsers = action.payload;
        },

        filterUsers(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload.toLowerCase();
            state.getFilteredUsers = state.users.filter(user => [user.firstName, user.lastName, user.email].some(field => field.toLowerCase().includes(state.searchTerm)));
        },

        clearSearch(state) {
            state.searchTerm = '';
            state.getFilteredUsers = [...state.users];
        },
    },
});

export const { addNewUser, deleteUserById, setUsers, filterUsers, clearSearch } = usersSlice.actions;

export const getFilteredUsers = (state: { users: UsersState }) => state.users.getFilteredUsers;
export const getCurrentSearchTerm = (state: { users: UsersState }) => state.users.searchTerm;
export default usersSlice.reducer;
