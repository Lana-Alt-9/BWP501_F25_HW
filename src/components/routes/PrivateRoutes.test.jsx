import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";

const response = (data, status = 200) =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
  });

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.endsWith("/session.php")) {
      return response({ success: true, authenticated: false, user: null });
    }

    if (url.endsWith("/login.php")) {
      return response({
        success: true,
        user: { id: 1, username: "test", email: "test@example.com" },
      });
    }

    return response({ success: true, students: [] });
  });
});

test("redirects guests to login and returns them to the protected page", async () => {
  window.history.pushState({}, "", "/AddStudent");
  render(<App />);

  expect(
    await screen.findByRole("heading", { name: /مرحبا بعودتك/i }),
  ).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/اسم المستخدم أو الايميل/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("كلمة السر"), {
    target: { value: "password" },
  });
  fireEvent.click(screen.getByRole("button", { name: "سجل دخول" }));

  expect(
    await screen.findByRole("heading", { name: "إضافة طالب" }),
  ).toBeInTheDocument();
});

test("renders the student list for an authorized user", async () => {
  global.fetch = jest.fn((url) => {
    if (url.endsWith("/session.php")) {
      return response({
        success: true,
        authenticated: true,
        user: { id: 1, username: "test", email: "test@example.com" },
      });
    }

    return response({ success: true, students: [] });
  });
  window.history.pushState({}, "", "/viewstudents");
  render(<App />);

  expect(
    await screen.findByRole("heading", { name: "عرض الطلاب" }),
  ).toBeInTheDocument();
});
