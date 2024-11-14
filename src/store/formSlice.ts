import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
    formData: Record<string, any>;
    errors: Record<string, string>;
    submittedForms: Array<Record<string, any>>;
}

const initialState: FormState = {
    formData: {},
    errors: {},
    submittedForms: [],
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateFormField: (state, action: PayloadAction<{ field: string; value: any }>) => {
            state.formData[action.payload.field] = action.payload.value;
            delete state.errors[action.payload.field];
        },
        setErrors: (state, action: PayloadAction<Record<string, string>>) => {
            state.errors = action.payload;
        },
        submitForm: (state) => {
            state.submittedForms.push({
                ...state.formData,
                id: Date.now(), // Add timestamp as ID
                submittedAt: new Date().toISOString(),
            });
            state.formData = {};
            state.errors = {};
        },
        resetForm: (state) => {
            state.formData = {};
            state.errors = {};
        },
    },
});

export const { updateFormField, setErrors, submitForm, resetForm } = formSlice.actions;
export default formSlice.reducer;