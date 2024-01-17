/** @jest-environment jsdom */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../Fallback';
import ErrorTestChild from '../components/__mocks__/ErrorTestChild';

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Error Boundary', () => {
  it('should render error boundary component when there is an error', async () => {
    const { findByText } = render(
      <ErrorBoundary>
        <ErrorTestChild />
      </ErrorBoundary>,
    );
    const errorMessage = await findByText('Algo deu errado!');
    expect(errorMessage).toBeInTheDocument();
  });
});
