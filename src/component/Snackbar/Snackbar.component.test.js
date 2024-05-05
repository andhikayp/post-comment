import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';

import Snackbar from './Snackbar.component';

const queryClient = new QueryClient();

describe('Snackbar', () => {
  describe('#render', () => {
    it('should render alert message when rendered', () => {
      const props = {
        message: 'message',
      };
      const { getByText } = render(
        <QueryClientProvider client={queryClient}>
          <Snackbar {...props} />
        </QueryClientProvider>
      );
      const message = getByText('message');

      expect(message).toBeTruthy();
    });
  });
});
