import ru from "./ru.json";
import kg from "./kg.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "ru",
  messages: {
    ru: ru,
    kg: kg,
  },
}));
