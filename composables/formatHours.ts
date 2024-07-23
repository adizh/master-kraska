const openHoursRegex =
  /Понедельник|Вторник|Воскресенье|Пятница|Суббота|Среда|Четверг/gi;
const dayAbbreviations = {
  Понедельник: "Пн",
  Вторник: "Вт",
  Воскресенье: "Вс",
  Пятница: "Пт",
  Суббота: "Сб",
  Среда: "Ср",
  Четверг: "Чт"
};

export const formatHours = (hours: string) => {
  return hours.replace(
    openHoursRegex,
    (match) => dayAbbreviations[match as keyof typeof dayAbbreviations]
  );
};
