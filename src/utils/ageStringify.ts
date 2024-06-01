const yearsVariants = ["лет", "год", "года"];
const monthsVariants = ["месяцев", "месяц", "месяца"];

const getSuffix = (count: number, variants: string[]) => {
  if (count >= 5 && count <= 20) {
    return variants[0];
  } else {
    count = count % 10;
    if (count == 1) {
      return variants[1];
    } else if (count >= 2 && count <= 4) {
      return variants[2];
    } else {
      return variants[0];
    }
  }
};

export const ageStringify = (age: number, month?: boolean) => {
  const months = age % 12;
  if (month) {
    age = Math.floor(age / 12);
    const count = age % 100;

    if (months) {
      const yearsTxt = `${age} ${getSuffix(count, yearsVariants)}`;
      return `${age ? yearsTxt : ""} ${months} ${getSuffix(
        months,
        monthsVariants
      )}`;
    } else {
      return `${age} ${getSuffix(count, yearsVariants)}`;
    }
  } else {
    const count = age % 100;
    return `${age} ${getSuffix(count, yearsVariants)}`;
  }
};
