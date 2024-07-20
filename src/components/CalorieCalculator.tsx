import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import { calculateCalories } from '../utils/calorieUtils';

const CalorieCalculator: React.FC = () => {
  const [age, setAge] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [system, setSystem] = useState<string>('Decimal');
  const [calories, setCalories] = useState<number>(0);

  useEffect(() => {
    const calculatedCalories = calculateCalories(age, weight, height, system);
    setCalories(calculatedCalories);
  }, [age, weight, height, system]);

  return (
    <div>
      <h1>Calculadora de calorías</h1>
      <form>
        <p>Por favor, seleccione el sistema métrico:</p>
        <FormField label="Sistema métrico: " type="select" value={system} onChange={(e) => setSystem(e.target.value)} options={['Decimal', 'Imperial']} />
        <FormField label="Edad: " type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} min={16} max={105} step={1} />
        <FormField label="Peso (kg): " type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} min={40.5} max={300} step={0.01} />
        <FormField label="Altura (cm): " type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} min={140} max={225} step={0.1} />
      </form>
      <h2>Calorías Diarias: {calories} kcal</h2>
    </div>
  );
};
export default CalorieCalculator;