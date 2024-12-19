import React from "react";

import { render, screen } from '@testing-library/react';
import PriceInfoCard from '../components/PriceInfoCard';
import '@testing-library/jest-dom';

describe('PriceInfoCard', () => {
  test('renders the title, inpmcon, and value correctly', () => {
    const props = {
      title: 'Price',
      iconSrc: '/assets/icons/price-icon.svg',
      value: '$100',
    };

    render(<PriceInfoCard {...props} />);

    const titleElement = screen.getByText(props.title);
    expect(titleElement).toBeInTheDocument();

    const iconElement = screen.getByAltText(props.title);
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('src', props.iconSrc); 

    const valueElement = screen.getByText(props.value);
    expect(valueElement).toBeInTheDocument();
  });
});
