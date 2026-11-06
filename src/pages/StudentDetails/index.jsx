import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomButton from "../../components/custom-button";

import PathConstants from "../../routes/pathConstants";
import { apiFetch } from "../../api";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  


  const [form, setForm] = useState({
    id:"",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    profilePicture: "",
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
useEffect(() => {
    const load = async () => {
      try {
        const res = await apiFetch(
          `view_students.php?id=${encodeURIComponent(id)}`,
        );

        if (!res.ok) {
          setNotFound(true);
          return;
        }

        const result = await res.json();
        if (!result.student) {      
        setNotFound(true);
        return;
        } 
        const student = result.student;

        setForm({
          id: student.id,
          fullName: student.name ?? student.fullName ?? "",
          email: student.email ?? "",
          phone: student.phone ?? "",
          address: student.address ?? "",
          profilePicture:
            student.profile_picture ?? student.profilePicture ?? "",
        });
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [id]);
  if (isLoading) {
    return <p>جارٍ التحميل...</p>;
  }

  if (notFound) {
    
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <main className="flex-grow-1 container d-flex flex-column align-items-center justify-content-center p-4">
          <div className="card shadow-lg border-0 rounded-4 w-100 col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card-body p-4">
              <h2 className="h2 fw-bold mb-0">الطالب غير موجود</h2>
              <Link
                to={PathConstants.VIEWSTUDENTS}
                className="btn btn-secondary mt-3"
              >
العودة للطلاب
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const validate = () => {
    const nextErrors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = "الاسم الكامل مطلوب";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "البريد الإلكتروني غير صالح";
    }
    if (!/^\d{10}$/.test(form.phone)) {
      nextErrors.phone = "يجب أن يتكون رقم الهاتف من 10 أرقام";
    }
    if (!form.address.trim() || form.address.trim().length < 5) {
      nextErrors.address = "العنوان مطلوب";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "file"
        ? event.target.files?.[0] ?? null
        : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  if (!validate()) {
    return;
  }
  setIsSaving(true);
  try {
    const formData = new FormData();
    formData.append("id", form.id);
    formData.append("fullName", form.fullName);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("address", form.address);
    if (form.profilePicture instanceof File) {
      formData.append("profilePicture", form.profilePicture);
    }
    const res = await apiFetch("update_student.php", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();

    if (!res.ok || !result.success) {
      setErrors((current) => ({
        ...current,
        submit: result.message || "تعذر حفظ التغييرات",
      }));
      return;
    }

    navigate(PathConstants.VIEWSTUDENTS);
  } catch (err) {
    console.error(err);
    setErrors((current) => ({ ...current, submit: "تعذر حفظ التغييرات" }));
  } finally {
    setIsSaving(false);
  }
};


  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1 container d-flex flex-column align-items-center justify-content-center p-4">
        <div className="card shadow-lg border-0 rounded-4 w-100 col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card-body p-4">
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-4">
              <h2 className="h2 fw-bold mb-0">عدل معلومات الطالب</h2>
              <Link
                to={PathConstants.VIEWSTUDENTS}
                className="btn btn-sm btn-outline-secondary"
              >
                العودة
              </Link>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small" htmlFor="fullName">
الاسم الكامل
                  </label>
                  <input
                    id="fullName"
                    name="full name"
                    type="text"
                    className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                    value={form.fullName}
                    onChange={handleChange("fullName")}
                  />
                  {errors.fullName && (
                    <div className="text-danger small mt-1">{errors.fullName}</div>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small" htmlFor="email">
                    الايميل
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    value={form.email}
                    onChange={handleChange("email")}
                  />
                  {errors.email && (
                    <div className="text-danger small mt-1">{errors.email}</div>
                  )}
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold small" htmlFor="phone">
                    الرقم الشخصي
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    value={form.phone}
                    onChange={handleChange("phone")}
                  />
                  {errors.phone && (
                    <div className="text-danger small mt-1">{errors.phone}</div>
                  )}
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold small" htmlFor="address">
                    العنوان
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    value={form.address}
                    onChange={handleChange("address")}
                  />
                  {errors.address && (
                    <div className="text-danger small mt-1">{errors.address}</div>
                  )}
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold small" htmlFor="profilePicture">
                    صورة الصفحة الشخصية
                  </label>
                  <input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    className="form-control"
                    onChange={handleChange("profilePicture")}
                  />
                  {form.profilePicture && (
                    <img
                      src={form.profilePicture}
                      alt="معاينة الصورة الشخصية"
                      className="rounded-circle mt-3 object-fit-cover border"
                      style={{ width: "120px", height: "120px" }}
                    />
                  )}
                </div>
              </div>

              {errors.submit && (
                <div className="alert alert-danger" role="alert">
                  {errors.submit}
                </div>
              )}

              <CustomButton type="submit" variant="success" disabled={isSaving}>
                {isSaving ? "جارٍ الحفظ..." : "حفظ التغييرات"}
              </CustomButton>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default StudentDetails;
