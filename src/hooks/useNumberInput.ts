import { useState } from 'react';

export function useNumberInput() {
  const [value, setValue] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  };

  return {
    value,
    showWarning,
    inputProps: {
      value,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
    },
  };
}
