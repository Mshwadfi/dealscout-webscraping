import React from 'react'
import { render, screen } from "@testing-library/react"
import Nav from "../components/Nav"
import '@testing-library/jest-dom';

const navIcons = [
    {src: '/assets/icons/search.svg', alt: 'search'},
    {src: '/assets/icons/black-heart.svg', alt: 'black-heart'},
    {src: '/assets/icons/user.svg', alt: 'user'}
]

describe('test nav component', () => {
    test('should render logo with text', () => {
        render(<Nav />);

        const logoImage = screen.getByAltText('logo') 
        expect(logoImage).toBeInTheDocument();

        const logoText = screen.getByText((content, element) => {
            const hasText = (node: Element) => node.textContent === 'DealScout';
            const elementHasText = hasText(element!);
            const childrenDoNotHaveText = Array.from(element!.children).every(
                (child) => !hasText(child)
            );
            return elementHasText && childrenDoNotHaveText;
        });
        expect(logoText).toBeInTheDocument();
    });

    test('should render the nav icons', () => {
        render(<Nav />);
        navIcons.forEach(icon => {
            const iconImage = screen.getByAltText(icon.alt) 
            expect(iconImage).toBeInTheDocument();
            expect(iconImage).toHaveAttribute('src', icon.src);
        });
    });

    test('should have the correct number of icons', () => {
        render(<Nav />);

        const icons = screen.getAllByRole('img');
        const nonLogoIcons = icons.filter(icon => icon.alt !== 'logo');
        expect(nonLogoIcons).toHaveLength(3);  // 3 icons (search, black-heart, user)
    });

    test('should render the logo as a link to the home page', () => {
        render(<Nav />);
    
        const logoLink = screen.getByRole('link', { name: 'logo Deal Scout' });
        expect(logoLink).toHaveAttribute('href', '/');

    });
});
