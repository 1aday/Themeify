'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Common color presets
  const colorPresets = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
    '#008000', '#800000', '#000080', '#808080', '#C0C0C0'
  ];

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPicker]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Auto-apply if it's a valid hex color
    if (newValue.match(/^#[0-9A-Fa-f]{6}$/)) {
      onChange(newValue);
    }
  };

  const handlePresetClick = (color: string) => {
    setInputValue(color);
    onChange(color);
    setShowPicker(false);
  };

  const handleInputBlur = () => {
    // Validate and apply on blur
    if (inputValue.match(/^#[0-9A-Fa-f]{6}$/)) {
      onChange(inputValue);
    } else {
      setInputValue(value); // Reset to original value
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className={`h-8 w-8 p-0 ${className}`}
        style={{ backgroundColor: value }}
        onClick={() => setShowPicker(!showPicker)}
      >
        <Palette className="h-4 w-4" />
      </Button>
      
      {showPicker && (
        <div ref={pickerRef} className="absolute top-full left-0 mt-2 p-4 bg-background border border-border rounded-lg shadow-lg z-50 w-64">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Hex Color</label>
              <Input
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder="#000000"
                className="font-mono"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Color Presets</label>
              <div className="grid grid-cols-5 gap-2">
                {colorPresets.map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded border border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => handlePresetClick(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Custom Color</label>
              <input
                type="color"
                value={value}
                onChange={(e) => {
                  const newColor = e.target.value;
                  setInputValue(newColor);
                  onChange(newColor);
                }}
                className="w-full h-10 rounded border border-border cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
