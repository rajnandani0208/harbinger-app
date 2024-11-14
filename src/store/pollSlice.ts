// store/pollSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Vote {
    pollId: number;
    questionId: number;
    answerId: number;
}

interface PollState {
    votes: Vote[];
    error: string | null;
}

const initialState: PollState = {
    votes: [],
    error: null,
};

const pollSlice = createSlice({
    name: 'poll',
    initialState,
    reducers: {
        submitVote: (state, action: PayloadAction<Vote>) => {
            state.votes.push(action.payload);
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearVotes: (state) => {
            state.votes = [];
        },
    },
});

// Export actions
export const { submitVote, setError, clearVotes } = pollSlice.actions;

// Export the reducer
export default pollSlice.reducer;