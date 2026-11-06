import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PathConstants from "../../routes/pathConstants";

function Profile() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <main className="flex-grow-1 container d-flex flex-column align-items-center justify-content-center p-4">
          <div className="card shadow-lg border-0 rounded-4 w-100 col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card-body p-4 text-center">
              <h2 className="h4 fw-bold mb-1">الملف الشخصي</h2>
              <p className="text-secondary mb-4">
                لم تقم بتسجيل الدخول, قم بالتسجيل لعرض ملفك الشخصي
              </p>
              <Link to={PathConstants.LOGIN} className="btn btn-success w-100">
                تسجيل الدخول
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
          <div className="card-body p-4 text-center">
            <div className="d-flex justify-content-center mb-3">
              <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center fw-bold fs-1" style={{ width: "32px", height: "32px" }}>
                {(user.username || user.name || user.email || "م").charAt(0)}
              </div>
            </div>
            <h2 className="h4 fw-bold mb-1">
              {user.username || user.name || "مستخدم"}
            </h2>
            <p className="text-secondary mb-4">{user.email || ""}</p>

            <dl className="row g-2 text-start mt-3 mb-0">
              <dt className="col-12 col-sm-4 text-secondary fw-semibold">الاسم</dt>
              <dd className="col-12 col-sm-8">
                {user.username || user.name || "—"}
              </dd>

              <dt className="col-12 col-sm-4 text-secondary fw-semibold">الإيميل</dt>
              <dd className="col-12 col-sm-8">{user.email || "—"}</dd>
            </dl>

            <Link
              to={PathConstants.HOME}
              className="btn btn-outline-secondary w-100 mt-3"
            >
العودة للصفحة الرئيسية
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
