import { useFormik } from "formik";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InputProvider from "../../components/input-provider";
import { registerSchema } from "./schema";
import { InputTypes } from "../../constants/enums";
import PathConstants from "../../routes/pathConstants";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../api";


function Register(){
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeRules: false,
    },
    validationSchema: registerSchema(),
    onSubmit: async (values, { setSubmitting, resetForm, setErrors, setStatus }) => {
      try {
        const res = await apiFetch("register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password,
              confirmPassword: values.confirmPassword,
            }),
          });
        const result = await res.json();

        if (!res.ok || !result.success) {
          setErrors(result.errors || {});
          setStatus(result.message || "تعذر إنشاء الحساب.");
          return;
        }

        resetForm();
        navigate(PathConstants.LOGIN);
      } catch (error) {
        console.error(error);
        setStatus("تعذر الاتصال بالخادم. حاول مرة أخرى.");
      } finally {
        setSubmitting(false);
      }
    },
  });
  const connectField = (name) => ({
    name,
    fieldValue: formik.values[name],
    onChangeFunction: (value) => formik.setFieldValue(name, value),
    onBlurFunction: () => formik.setFieldTouched(name, true),
    error: formik.errors[name],
    touched: formik.touched[name],
  });
  const fields = [
    {
      type: InputTypes.TEXT,
      fieldLabel: "الاسم الأول",
      placeholder: "محمد",
      ...connectField("firstName"),
    },
    {
      type: InputTypes.TEXT,
      fieldLabel: "اسم العائلة",
      placeholder: "الخطيب",
      ...connectField("lastName"),
    },
    {
      type: InputTypes.EMAIL,
      fieldLabel: "البريد الإلكتروني",
      placeholder: "example@email.com",
      ...connectField("email"),
    },
    {
      type: InputTypes.PASSWORD,
      fieldLabel: "كلمة المرور",
      placeholder: "********",
      ...connectField("password"),
    },
    {
      type: InputTypes.PASSWORD,
      fieldLabel: "تأكيد كلمة المرور",
      placeholder: "********",
      ...connectField("confirmPassword"),
    },
    {
      type: InputTypes.CHECKBOX,
      fieldLabel: "أوافق على الشروط والأحكام",
      ...connectField("agreeRules"),
    },
  ];
  const nameFields = fields.slice(0, 2);
  const restFields = fields.slice(2);
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1 container d-flex flex-column align-items-center justify-content-center p-4">
        <div className="card shadow-lg border-0 rounded-4 w-100 auth-card">
          <div className="card-body">
            <h2 className="card-title text-center fw-bold mb-1">إنشاء حساب</h2>
            <p className="text-center text-secondary mb-4">أدخل بياناتك لإنشاء حساب جديد</p>
            <form onSubmit={formik.handleSubmit} noValidate>
              <div className="row g-3">
                {nameFields.map((item) => (
                  <div className="col-12 col-md-6" key={item.name}>
                    <InputProvider itemObject={item} />
                  </div>
                ))}
              </div>
              {restFields.map((item) => (
                <div className="col-12" key={item.name}>
                  <InputProvider itemObject={item} />
                </div>
              ))}
              {formik.status && (
                <div className="text-danger small mt-3" role="alert">
                  {formik.status}
                </div>
              )}
              <button
                type="submit"
                className="btn btn-success w-100 mt-3"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "جارٍ إنشاء الحساب..." : "إنشاء حساب"}
              </button>
            </form>
            <div className="d-flex align-items-center gap-3 my-4 text-secondary small">
              <span className="flex-grow-1 border-top" />
              <span>أو تابع باستخدام</span>
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
              إذا كان لديك حساب بالفعل
              <br />
              <Link to={PathConstants.LOGIN}>تسجيل دخول</Link>
            </p>
          </div>
        </div>
        <p
          className="link-primary text-decoration-underline mt-3">
          <Link to={PathConstants.HOME}>
            العودة للصفحة الرئيسية
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
export default Register;
