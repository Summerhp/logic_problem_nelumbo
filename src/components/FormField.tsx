import React from 'react';

interface FormFieldProps {
  label: string;
  type: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, value, onChange, options, min, max, step}) => {
  return (
    <div>
      <label>{label}</label>
      {type === 'select' ? (
        <select value={value} onChange={onChange}>
          {options && options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} value={value} onChange={onChange} min={min} max={max} step={step} />
      )}
    </div>
  );
};
export default FormField;