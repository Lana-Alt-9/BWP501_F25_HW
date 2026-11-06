import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PathConstants from "../../routes/pathConstants";
import { apiFetch } from "../../api";

function StudentView() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStudent = async () => {
      setIsLoading(true);
      setError("");
      setStudent(null);
      try {
        const response = await apiFetch(
          `view_students.php?id=${encodeURIComponent(id)}`,
        );
        const result = await response.json();

        if (!response.ok || !result.success || !result.student) {
          if (response.status === 404) {
            setStudent(null);
            return;
          }
          throw new Error(result.message || "تعذر تحميل بيانات الطالب.");
        }

        const data = result.student;
        setStudent({
          id: String(data.id),
          fullName: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          profilePicture: data.profile_picture || "",
        });
      } catch (loadError) {
        console.error(loadError);
        setError("تعذر تحميل بيانات الطالب. حاول مرة أخرى.");
      } finally {
        setIsLoading(false);
      }
    };

    loadStudent();
  }, [id]);

  if (isLoading) {
    return (
      <p className="text-center p-4" role="status">
        جارٍ تحميل بيانات الطالب...
      </p>
    );
  }

  if (!student) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <main className="flex-grow-1 container d-flex flex-column align-items-center justify-content-center p-4">
          <div className="card shadow-lg border-0 rounded-4 w-100 col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card-body p-4">
              <h2 className="h2 fw-bold mb-0">
                {error || "الطالب غير موجود"}
              </h2>
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

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1 container d-flex flex-column align-items-center justify-content-center p-4">
        <div className="card shadow-lg border-0 rounded-4 w-100 col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card-body p-4">
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-4">
              <h2 className="h2 fw-bold mb-0">معلومات الطالب</h2>
              <div className="d-flex gap-2">
                <Link
                  to={`/students/${student.id}/edit`}
                  className="btn btn-sm btn-outline-primary"
                >
                  تعديل
                </Link>
                <Link
                  to={PathConstants.VIEWSTUDENTS}
                  className="btn btn-sm btn-outline-secondary"
                >
                  العودة
                </Link>
              </div>
            </div>

            <div className="d-flex justify-content-center mb-4">
              {student.profilePicture ? (
                <img
                  src={student.profilePicture}
                  alt={student.fullName}
                  className="rounded-circle object-fit-cover border"
                  style={{ width: "120px", height: "120px" }}
                />
              ) : (
                <div
                  className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center fw-bold"
                  style={{ width: "120px", height: "120px", fontSize: "3rem" }}
                >
                  {student.fullName?.charAt(0)?.toUpperCase() || "؟"}
                </div>
              )}
            </div>

            <dl className="row g-3 mb-0">
              <dt className="col-12 col-sm-4 text-secondary fw-semibold">الاسم الكامل</dt>
              <dd className="col-12 col-sm-8">{student.fullName}</dd>

              <dt className="col-12 col-sm-4 text-secondary fw-semibold">الايميل</dt>
              <dd className="col-12 col-sm-8">{student.email}</dd>

              <dt className="col-12 col-sm-4 text-secondary fw-semibold">الرقم الشخصي</dt>
              <dd className="col-12 col-sm-8">{student.phone}</dd>

              <dt className="col-12 col-sm-4 text-secondary fw-semibold">العنوان</dt>
              <dd className="col-12 col-sm-8">{student.address}</dd>
            </dl>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default StudentView;
