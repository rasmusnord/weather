import Layout from "./components/Layout";
import Places from "./components/Places";
import { PlacesProvider } from "./contexts/PlacesContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { TooltipProvider } from "./contexts/TooltipContext";

const App = () => {
  return (
    <SettingsProvider>
      <PlacesProvider>
        <TooltipProvider>
          <Layout>
            <Places />
          </Layout>
        </TooltipProvider>
      </PlacesProvider>
    </SettingsProvider>
  );
};

export default App;
