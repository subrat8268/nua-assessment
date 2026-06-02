import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SizeSelector } from '../src/components/SizeSelector/SizeSelector';
import { AddToCartButton } from '../src/components/AddToCartButton/AddToCartButton';
import { QuantityPicker } from '../src/components/QuantityPicker/QuantityPicker';
import { ToastProvider } from '../src/stores/ToastContext';

describe('Variant Selector & Add to Cart Logic', () => {
  it('1. Sold-out size button is disabled', () => {
    const mockSizes = [
      { label: 'S', stock: 10 },
      { label: 'M', stock: 0 },
      { label: 'L', stock: 5 },
    ];
    const mockOnSelect = vi.fn();

    render(
      <SizeSelector
        sizes={mockSizes}
        selectedSize=""
        onSelect={mockOnSelect}
      />
    );

    const mButton = screen.getByRole('radio', { name: 'M' });
    expect(mButton).toBeDisabled();

    fireEvent.click(mButton);
    expect(mockOnSelect).not.toHaveBeenCalled();
  });

  it('2. Add to Cart CTA is disabled when sold out', () => {
    const mockOnAdd = vi.fn();

    render(
      <ToastProvider>
        <AddToCartButton
          onAdd={mockOnAdd}
          disabled={true}
          text="Sold Out"
        />
      </ToastProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('3. Quantity picker is capped at maxStock', () => {
    const mockOnChange = vi.fn();

    render(
      <QuantityPicker
        quantity={5}
        maxStock={5}
        onChange={mockOnChange}
      />
    );

    const plusButton = screen.getByRole('button', { name: /increase/i });
    expect(plusButton).toBeDisabled();

    fireEvent.click(plusButton);
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
