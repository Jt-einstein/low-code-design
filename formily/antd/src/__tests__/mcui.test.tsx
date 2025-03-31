import React from 'react';
import { render, screen } from '@testing-library/react';
import { McButton } from '../mcui';

describe('test mcui components', () => {
  test('render Button', () => {
    const title = '按钮';
    render(<McButton operationType="custom" buttonName={title} />);
    expect(screen.getByText(title)).toHaveTextContent(title);
  });
});
