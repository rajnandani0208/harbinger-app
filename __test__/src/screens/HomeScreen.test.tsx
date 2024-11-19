import React from 'react';
import { fireEvent, render } from '@testing-library/react-native'
import HomeScreen from '@/src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';

const renderWithNavigation = (ui: React.ReactNode, options = {}) => {
    return render(<NavigationContainer>{ui}</NavigationContainer>, options);
};

// Mock the navigation object
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
    return {
        ...jest.requireActual('@react-navigation/native'),
        useNavigation: () => ({
            navigate: mockNavigate,
        }),
    };
});

describe('<HomeScreen /> rendering', () => {
    it('Home screen renders correctly', () => {
        const screen = renderWithNavigation(<HomeScreen />);
        const tree = screen.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('handles FormScreen navigation correctly', async () => {
        const { findByTestId } = renderWithNavigation(<HomeScreen />);
        const gotoFormBtn = await findByTestId('gotoFormBtn');

        fireEvent.press(gotoFormBtn);
        expect(mockNavigate).toHaveBeenCalledWith('FormScreen');
    })

    it('handles FormList navigation correctly', async () => {
        const { findByTestId } = renderWithNavigation(<HomeScreen />);
        const gotoFormListBtn = await findByTestId('gotoFormListBtn');

        fireEvent.press(gotoFormListBtn);
        expect(mockNavigate).toHaveBeenCalledWith('FormList');
    })

    it('handles PollList navigation correctly', async () => {
        const { findByTestId } = renderWithNavigation(<HomeScreen />);
        const gotoPollBtn = await findByTestId('gotoPollBtn');

        fireEvent.press(gotoPollBtn);
        expect(mockNavigate).toHaveBeenCalledWith('PollList');
    })

    it('handles PollSummary navigation correctly', async () => {
        const { findByTestId } = renderWithNavigation(<HomeScreen />);
        const gotoPollSummary = await findByTestId('gotoPollSummary');

        fireEvent.press(gotoPollSummary);
        expect(mockNavigate).toHaveBeenCalledWith('PollSummary', { pollId: 1 });
    })

});