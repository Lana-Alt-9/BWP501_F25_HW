import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import useTheme from "../context/theme/useTheme";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import PathConstants from "../routes/pathConstants";
import { apiFetch } from "../api";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [logoutError, setLogoutError] = useState("");
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    setLogoutError("");
    try {
      const response = await apiFetch("logout.php", { method: "POST" });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "تعذر تسجيل الخروج.");
      }

      dispatch(logout());
      closeMenu();
    } catch (error) {
      console.error(error);
      setLogoutError("تعذر تسجيل الخروج. حاول مرة أخرى.");
    }
  };

  return (
    <header className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" onClick={closeMenu}>
          الجامعة الافتراضية السورية
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen((e) => !e)}
          aria-label="القائمة"
          aria-expanded={menuOpen}
        >
          <IoMenu />
        </button>
        <nav
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          aria-label="التنقل الرئيسي"
        >
          <div className="navbar-nav ms-auto align-items-lg-center gap-3 flex-wrap">
            <Link className="nav-link" to="/" onClick={closeMenu}>
              الرئيسية
            </Link>
            <Link
              className="nav-link"
              to={PathConstants.ADD_STUDENT}
              onClick={closeMenu}
            >
              إضافة طالب
            </Link>
            <Link
              className="nav-link"
              to={PathConstants.PROFILE}
              onClick={closeMenu}
            >
              الملف الشخصي
            </Link>
            <Link
              className="nav-link"
              to={PathConstants.REGISTER}
              onClick={closeMenu}
            >
              انشاء حساب 
            </Link>
            <Link
              className="nav-link"
              to={PathConstants.VIEWSTUDENTS}
              onClick={closeMenu}
            >
              عرض الطلاب
            </Link>
            <Link
              className="nav-link"
              to={PathConstants.ABOUTUS}
              onClick={closeMenu}
            >
              حولنا
            </Link>

            <button
              className="btn btn-sm btn-outline-secondary"
              type="button"
              onClick={toggleTheme}
            >
              {theme === "light" ? "داكن" : "فاتح"}
            </button>
            {isAuthenticated ? (
              <>
                {user && (
                  <span className="small text-secondary text-nowrap">
                    مرحباً، {user.username || user.name || user.email?.split("@")[0] || "مستخدم"}
                  </span>
                )}
                <button
                  className="btn btn-sm btn-outline-secondary"
                  type="button"
                  onClick={handleLogout}
                >
                  تسجيل خروج
                </button>
                {logoutError && (
                  <span className="small text-danger" role="alert">
                    {logoutError}
                  </span>
                )}
              </>
            ) : (
              <>
                <Link
                  className="nav-link"
                  to={PathConstants.LOGIN}
                  onClick={closeMenu}
                >
                  تسجيل دخول
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
export default Header;
