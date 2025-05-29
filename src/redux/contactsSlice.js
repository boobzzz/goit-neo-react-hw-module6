import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: []
    },
    reducers: {
        addContact(state, action) {
            state.items.push(action.payload);
        },
        removeContact(state, action) {
            state.items = state.items.filter(contact => {
                return contact.id !== action.payload
            });
        }
    }
});

export const { addContact, removeContact } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
