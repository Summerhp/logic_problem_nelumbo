import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import { calculateCalories } from '../utils/calorieUtils';

const CalorieCalculator: React.FC = () => {
  const [age, setAge] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [system, setSystem] = useState<string>('Decimal');
  const [calories, setCalories] = useState<number>(0);

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
    if (age > 0 && weight > 0 && height > 0) {
      const calculatedCalories = calculateCalories(age, weight, height, system);
      setCalories(calculatedCalories);
    } else {
      setCalories(0);
    }
  }, [age, weight, height, system]);

  const handleSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSystem = e.target.value;
    setSystem(newSystem);
    setAge(0);
    setWeight(0);
    setHeight(0);
    setCalories(0);
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
  return (
    <div>
      <h1>Calculadora de calorías</h1>
      <form>
        <p>Por favor, seleccione el sistema métrico:</p>
        <FormField label="Sistema métrico: " type="select" value={system} onChange={handleSystemChange} options={['Decimal', 'Imperial']} />
        <FormField label="Edad: " type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} min={16} max={105} step={1} />
        <FormField label={labels.weightLabel} type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} min={limits.weightMin} max={limits.weightMax} step={0.01} />
        <FormField label={labels.heightLabel} type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} min={limits.heightMin} max={limits.heightMax} step={0.1} />
      </form>
      <h2>Calorías Diarias: {calories} kcal</h2>
    </div>
  );
};
export default CalorieCalculator;