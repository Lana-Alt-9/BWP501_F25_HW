import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InputProvider from "../../components/input-provider";
import { useFormik } from "formik";
import { addStudentSchema } from "./schema";
import { InputTypes } from "../../constants/enums";
import PathConstants from "../../routes/pathConstants";
import Container from "react-bootstrap/Container";
import { apiFetch } from "../../api";

function AddStudent() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      profilePicture: null,
      address: "",
    },
    validationSchema: addStudentSchema(),
      onSubmit: async (values, { resetForm, setErrors, setStatus }) => {
      setIsSaving(true);
      try {
        const formData = new FormData();
        formData.append("firstName" ,values.firstName );
        formData.append("lastName",values.lastName)
        formData.append("email",values.email);
        formData.append("phone",values.phone);
        formData.append("address",values.address);
        if (values.profilePicture) {
        formData.append("profilePicture", values.profilePicture);
        }
    const res = await apiFetch(
      "add_student.php",
      {
        method: "POST",
        body: formData
      }
    );
    const result = await res.json();
   if (!res.ok || !result.success) {
      setErrors(result.errors || {});
      setStatus(result.message || "تعذرت إضافة الطالب.");
      return;
    }
    
        resetForm();
        const fileInput = document.querySelector(
          'input[name="profilePicture"]',
        );
        if (fileInput) {
          fileInput.value = "";
        }
        navigate(PathConstants.VIEWSTUDENTS);
  } catch (err) {
    console.error(err);
    setStatus("تعذر الاتصال بالخادم. حاول مرة أخرى.");
  }
   finally {
        setIsSaving(false);
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
      placeholder: "الشعار",
      ...connectField("lastName"),
    },
    {
      type: InputTypes.EMAIL,
      fieldLabel: "البريد الإلكتروني",
      placeholder: "example@email.com",
      ...connectField("email"),
    },
    {
      type: InputTypes.TEL,
      fieldLabel: "رقم الهاتف",
      placeholder: "09XXXXXXXX",
      ...connectField("phone"),
    },
    {
      type: InputTypes.FILE,
      fieldLabel: "الصورة الشخصية",
      placeholder: "ارفع الصورة الشخصية",
      ...connectField("profilePicture"),
    },
    {
      type: InputTypes.TEXT,
      fieldLabel: "العنوان",
      placeholder: "حمص، الوعر",
      ...connectField("address"),
    },
  ];
  const nameFields = fields.slice(0, 2);
  const restFields = fields.slice(2);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1 container d-flex flex-column align-items-center justify-content-center p-4">
        <Container className="auth-card-shell d-flex flex-column align-items-center justify-content-center p-4">
          <div className="card shadow-lg border-0 rounded-4 w-100 auth-card">
            <div className="card-body">
              <h2 className="card-title text-center fw-bold mb-4">إضافة طالب</h2>
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
                  disabled={isSaving}
                >
                  {isSaving ? "جارٍ الحفظ..." : "إضافة الطالب"}
                </button>
              </form>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default AddStudent;
