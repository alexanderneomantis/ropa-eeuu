import './App.css';
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import {ProgressBarStyle} from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";
import Router from "./routes";

function App() {
  return (
    <ThemeConfig>
      <GlobalStyles />
      <ProgressBarStyle />
      <ScrollToTop />
      <Router />
    </ThemeConfig>
  );
}

export default App;
