import Header from "../../components/Header";
import LoginForm from "../../components/loginForm";

function Login() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1 container d-flex flex-column align-items-center justify-content-center p-4">
        <div className="auth-card-shell">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
export default Login;
