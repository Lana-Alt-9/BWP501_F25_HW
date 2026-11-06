import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiFetch } from "../api";
import { login } from "../store/authSlice";
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import PathConstants from "../routes/pathConstants";

function LoginForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const loginSchema = Yup.object({
    login: Yup.string()
      .trim()
      .required("اسم المستخدم أو البريد الإلكتروني مطلوب"),
    password: Yup.string().trim().required("كلمة المرور مطلوبة"),
  });
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        const response = await apiFetch("login.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            login: values.login.trim(),
            password: values.password,
          }),
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          setErrors(result.errors || {});
          setStatus("اسم المستخدم أو كلمة المرور غير صحيحة.");
          return;
        }

        if (!result.user) {
          throw new Error("Login response did not include a user.");
        }

        dispatch(login(result.user));
        navigate(location.state?.from || PathConstants.PROFILE, { replace: true });
      } catch (error) {
        console.error(error);
        setStatus("تعذر الاتصال بالخادم. حاول مرة أخرى.");
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className="card shadow-sm border-0 w-100 auth-card">
      <div className="card-body">
        <h2 className="card-title text-center fw-bold mb-1">مرحبا بعودتك</h2>
        <p className="text-center text-secondary mb-4">سجل دخول</p>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="login">
              اسم المستخدم أو الايميل
            </label>
            <input
              className="form-control"
              type="text"
              id="login"
              name="login"
              placeholder="اسم المستخدم أو البريد الإلكتروني"
              autoComplete="username"
              value={formik.values.login}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.login && formik.errors.login && (
              <div className="text-danger small mt-1">
                {formik.errors.login}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="password">
              كلمة السر
            </label>
            <div className="input-group">
              <input
                className="form-control"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                className="btn btn-link btn-sm p-0 align-self-end"
                type="button"
                onClick={() => setShowPassword((e) => !e)}
              >
                {showPassword ? (
                  <IoLockClosedOutline size={32} />
                ) : (
                  <IoLockOpenOutline size={32} />
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-danger small mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>
          {formik.status && (
            <div className="text-danger small mb-3" role="alert">
              {formik.status}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "جار تسجيل الدخول..." : "سجل دخول"}
          </button>
        </form>
        <div className="d-flex align-items-center gap-3 my-4 text-secondary small">
          <span className="flex-grow-1 border-top" />
          <span>أكمل تسجيل الدخول مع</span>
          <span className="flex-grow-1 border-top" />
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary flex-fill"
            onClick={() => console.log("sign in with Google")}
          >
            غوغل
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary flex-fill"
            onClick={() => console.log("sign in with Facebook")}
          >
            فيس بوك
          </button>
        </div>
        <p className="text-center small mt-4">
        اذا لم يكن لديك حساب فقم ب <Link to={PathConstants.REGISTER}>إنشاء حساب</Link>
        </p>
      </div>
    </div>
  );
}
export default LoginForm;
