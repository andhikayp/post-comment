import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';

import NavbarHeader from './NavbarHeader.component';

const queryClient = new QueryClient();

describe('NavbarHeader', () => {
  describe('#render', () => {
    it('should render home app when rendered', () => {
      const { getByText } = render(
        <QueryClientProvider client={queryClient}>
          <NavbarHeader />
        </QueryClientProvider>
      );
      const homeApp = getByText('App');

      expect(homeApp).toBeTruthy();
    });
  });
});
