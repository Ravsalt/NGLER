import { useState, useCallback } from 'react';

interface UseNumberInputProps {
  value: string;
  onChange?: (value: string) => void;
  min?: number;
  max?: number;
}

export function useNumberInput({ 
  value: externalValue, 
  onChange, 
  min, 
  max 
}: UseNumberInputProps) {
  const [internalValue, setInternalValue] = useState(externalValue);
  const [showWarning, setShowWarning] = useState(false);

  // Update internal value when external value changes
  if (externalValue !== internalValue && externalValue !== undefined) {
    setInternalValue(externalValue);
  }

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setInternalValue('');
      if (onChange) onChange('');
      return;
    }

    // Only allow numbers
    if (/^\d+$/.test(inputValue)) {
      let newValue = inputValue;
      
      // Convert to number for min/max comparison
      const numValue = parseInt(inputValue, 10);
      
      if (typeof max === 'number' && numValue > max) {
        newValue = max.toString();
      } else if (typeof min === 'number' && numValue < min) {
        newValue = min.toString();
      }
      
      setInternalValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  }, [onChange, min, max]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, ctrlKey, altKey, metaKey } = e;
    const isNumber = /^\d$/.test(key);
    const isControlKey = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key);
    const isModifierKey = ctrlKey || altKey || metaKey;

    if (!isNumber && !isControlKey && !isModifierKey) {
      e.preventDefault();
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 2000);
    } else {
      setShowWarning(false);
    }
  }, []);

  return {
    showWarning,
    inputProps: {
      value: internalValue,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
    },
  };
}
