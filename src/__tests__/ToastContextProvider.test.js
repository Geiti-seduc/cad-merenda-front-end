/** @jest-environment jsdom */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToastContextProvider from '../contexts/ToastContextProvider';

describe('ToastContextProvider', () => {
  it('should render ToastContextProvider component with child component', () => {
    const ChildComponent = () => <div>Child Component</div>;
    const { asFragment } = render(
      <ToastContextProvider>
        <ChildComponent />
      </ToastContextProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
