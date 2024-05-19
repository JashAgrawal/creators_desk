import { AuthProvider } from "./contexts/useAuth";
import { Toaster } from "./components/ui/sonner";
import { AppRouter } from "./router";
import { FileProvider } from "./contexts/files";

const App = () => {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <FileProvider>
          <AppRouter />
        </FileProvider>
      </AuthProvider>
    </>
  );
};

export default App;
