import {ThemeProvider} from 'styled-components/native';
import type {Preview} from '@storybook/react';
import {lightTheme} from '../app/config/theme';

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <ThemeProvider theme={lightTheme}>
        <Story {...context} />
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
