export const calculateCalories = (age: number, weight: number, height: number, system: string): number => {
  if (system === "Decimal") {
    weight = weight * 2.20462
    height = height * 0.393701
  }
  if (weight < 165) {
    return parseFloat(((10 * weight + 6.25 * height - 10 * age + 5) * 1.6).toFixed(2));
  }
  else if (weight >= 165 && weight <= 200) {
    return parseFloat(((10 * weight + 6.25 * height - 10 * age + 5) * 1.4).toFixed(2));
  }
  else if (weight > 200 && weight <= 220) {
    return parseFloat(((10 * weight + 6.25 * height - 10 * age + 5) * 1.2).toFixed(2));
  }
  else {
    return parseFloat(((10 * weight + 6.25 * height - 10 * age + 5) * 1).toFixed(2));
  }
  return 0
};