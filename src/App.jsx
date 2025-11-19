import { ThemeProvider } from "./context/ThemeContext";
import AppRouter from "./routes/AppRoutes";
import { UserRoleProvider } from "./routes/UserRoleContext";

export default function App() {
  return (
    <ThemeProvider>
      <UserRoleProvider>
        <AppRouter />
      </UserRoleProvider>
    </ThemeProvider>
  );
}
