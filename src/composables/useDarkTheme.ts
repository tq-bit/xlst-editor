import { ref, onMounted, computed } from "vue";
type AppThemeName = "light-theme" | "dark-theme";

// Create a shared state outside the composable
const userTheme = ref<AppThemeName>("light-theme");
const isDarkTheme = computed(() => {
  return userTheme.value === "dark-theme";
});

export function useDarkTheme() {

  const toggleDarkTheme = () => {
    const newTheme = isDarkTheme.value ? "light-theme" : "dark-theme";
    setTheme(newTheme);
  };

  const getMediaPreferences: () => AppThemeName = () => {
    const hasDarkPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (hasDarkPreference) {
      return "dark-theme";
    } else {
      return "light-theme";
    }
  };

  const setTheme = (theme: AppThemeName) => {
    localStorage.setItem("user-theme", theme);
    userTheme.value = theme;
    document.documentElement.className = theme;
  };

  const getTheme: () => AppThemeName = () => {
    const theme = localStorage.getItem("user-theme");
    if (theme) {
      return theme as AppThemeName;
    } else {
      return getMediaPreferences();
    }
  };

  const initDarkTheme = () => {
    const theme = getTheme();
    setTheme(theme);
  };

  onMounted(() => {
    initDarkTheme();
  });

  return {
    isDarkTheme,
    toggleDarkTheme,
    userTheme,
  };
}
