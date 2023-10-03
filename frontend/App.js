import AppRouter from "./src/AppRoute/AppRouter";
import AuthContext from "./src/context/AuthContext";
export default function App() {
  return (
    <AuthContext>
      <AppRouter />
    </AuthContext>
  )
}
