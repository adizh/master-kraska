import ru from "./ru.json";
import kg from "./kg.json";

let lan = "ru";
if (process.client) {
  const localLan = localStorage.getItem("selectedLanguage");
  if (localLan) {
    lan = localLan;
  }
}
export default defineI18nConfig(() => ({
  legacy: false,
  locale: lan,
  messages: {
    ru: ru,
    kg: kg,
  },
}));
