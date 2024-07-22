import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import { calculateCalories } from '../utils/calorieUtils';

const CalorieCalculator: React.FC = () => {
  const [age, setAge] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [system, setSystem] = useState<string>('Decimal');
  const [calories, setCalories] = useState<number>(0);
  const [warnings, setWarnings] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const [labels, setLabels] = useState({
    weightLabel: 'Peso (kg): ',
    heightLabel: 'Altura (cm): '
  });
  const [limits, setLimits] = useState({
    weightMin: 40.5,
    weightMax: 300,
    heightMin: 140,
    heightMax: 225
  });

  useEffect(() => {
    if (isValid) {
      const calculatedCalories = calculateCalories(age, weight, height, system);
      setCalories(calculatedCalories);
    } else {
      setCalories(0);
    }
  }, [age, weight, height, system, isValid]);

  const handleSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSystem = e.target.value;
    setSystem(newSystem);
    setAge(0);
    setWeight(0);
    setHeight(0);
    setCalories(0);
    setWarnings({});
    setIsValid(false);
    if (newSystem === 'Imperial') {
      setLabels({
        weightLabel: 'Peso (lbs): ',
        heightLabel: 'Altura (in): '
      });
      setLimits({
        weightMin: 89.29,
        weightMax: 661.39,
        heightMin: 55.12,
        heightMax: 88.58,
      });
    } else {
      setLabels({
        weightLabel: 'Peso (kg): ',
        heightLabel: 'Altura (cm): '
      });
      setLimits({
        weightMin: 40.5,
        weightMax: 300,
        heightMin: 140,
        heightMax: 225,
      });
    }
  };

  const validateAndSet = (value: number, setter: React.Dispatch<React.SetStateAction<number>>, min: number, max: number, fieldName: string) => {
    if (value < min || value > max) {
      setWarnings(prevWarnings => ({...prevWarnings, [fieldName]: `El valor de ${fieldName} debe estar entre ${min} y ${max}.`}));
      setIsValid(false);
    } else {
      setWarnings(prevWarnings => {
        const newWarnings = { ...prevWarnings };
        delete newWarnings[fieldName];
        return newWarnings;
      });
      setter(value);
      setIsValid(true);
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAge(value);
    validateAndSet(value, setAge, 16, 105, 'Edad');
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setWeight(value);
    validateAndSet(value, setWeight, limits.weightMin, limits.weightMax, 'Peso');
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setHeight(value);
    validateAndSet(value, setHeight, limits.heightMin, limits.heightMax, 'Altura');
  };

  return (
    <div>
      <h1>Calculadora de calorías</h1>
      <form>
        <p>Por favor, seleccione el sistema métrico:</p>
        <FormField label="Sistema métrico: " type="select" value={system} onChange={handleSystemChange} options={['Decimal', 'Imperial']} />
        <FormField label="Edad: " type="number" value={age} onChange={handleAgeChange} min={16} max={105} step={1} />
        {warnings['Edad'] && <p style={{ color: 'red' }}>{warnings['Edad']}</p>}
        <FormField label={labels.weightLabel} type="number" value={weight} onChange={handleWeightChange} min={limits.weightMin} max={limits.weightMax} step={0.01} />
        {warnings['Peso'] && <p style={{ color: 'red' }}>{warnings['Peso']}</p>}
        <FormField label={labels.heightLabel} type="number" value={height} onChange={handleHeightChange} min={limits.heightMin} max={limits.heightMax} step={0.1} />
        {warnings['Altura'] && <p style={{ color: 'red' }}>{warnings['Altura']}</p>}
      </form>
      <h2>Calorías a consumir diariamente: {calories} kcal</h2>
    </div>
  );
};
export default CalorieCalculator;