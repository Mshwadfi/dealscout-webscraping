import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Carousel from '../components/Carousel';
import '@testing-library/jest-dom';

jest.useFakeTimers(); 

describe('Carousel Component', () => {
  test('should render carousel images', () => {
    render(<Carousel />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(5); 
  });

  test('should automatically slide image after 3 seconds', async () => {
    render(<Carousel />);

    const firstImage = screen.getByAltText('carousel image 1');
    expect(firstImage).toBeInTheDocument();

    jest.advanceTimersByTime(3000);

    const secondImage = screen.getByAltText('carousel image 2');
    expect(secondImage).toBeInTheDocument();
  });

  test('should change image when clicking on a dot', async () => {
    render(<Carousel />);
    
    const activeDot = screen.getAllByRole('button')[0];
    expect(activeDot).toHaveClass('bg-blue-500');

    const secondDot = screen.getAllByRole('button')[1];
    fireEvent.click(secondDot);

    expect(secondDot).toHaveClass('bg-blue-500');
    
    expect(activeDot).toHaveClass('bg-gray-400');
  });

  test('should stop the timer when the component is unmounted', () => {

    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    const {unmount} = render(<Carousel />);
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    
  });
});
