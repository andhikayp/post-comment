import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';

import Layout from './Layout.component';

const queryClient = new QueryClient();

describe('Layout', () => {
  describe('#render', () => {
    it('should render title, subtitle, and content', () => {
      const props = {
        title: 'title',
        content: () => <div>content</div>,
        isLoading: false,
        subtitle: 'subtitle'
      };
      const { getByText } = render(
        <QueryClientProvider client={queryClient}>
          <Layout {...props} />
        </QueryClientProvider>
      );
      const title = getByText('title');
      const subtitle = getByText('subtitle');
      const content = getByText('content');

      expect(title).toBeTruthy();
      expect(subtitle).toBeTruthy();
      expect(content).toBeTruthy();
    });

    it('should not render subtitle when subtitle is empty', () => {
      const props = {
        title: 'title',
        content: () => <div>content</div>,
        isLoading: false
      };
      const { queryByText } = render(
        <QueryClientProvider client={queryClient}>
          <Layout {...props} />
        </QueryClientProvider>
      );
      const subtitle = queryByText('subtitle');

      expect(subtitle).toBeFalsy();
    });

    it('should not render title and content when isLoading is true', () => {
      const props = {
        title: 'title',
        content: () => <div>content</div>,
        isLoading: true
      };
      const { queryByText } = render(
        <QueryClientProvider client={queryClient}>
          <Layout {...props} />
        </QueryClientProvider>
      );
      const title = queryByText('title');
      const content = queryByText('content');

      expect(title).toBeFalsy();
      expect(content).toBeFalsy();
    });
  });
});
