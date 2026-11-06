import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomButton from "../../components/custom-button";
import { deleteStudent, setStudents } from "../../store/studentsSlice";
import PathConstants from "../../routes/pathConstants";
import { useEffect } from "react";
import { apiFetch } from "../../api";

function ViewStudents() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.items);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await apiFetch("view_students.php");
        const result = await response.json();

        if (!response.ok || !result.success || !Array.isArray(result.students)) {
          throw new Error(result.message || "تعذر تحميل قائمة الطلاب.");
        }

        const list = result.students.map((student) => ({
          id: String(student.id),
          fullName: student.name,
          email: student.email,
          phone: student.phone,
          address: student.address,
          profilePicture: student.profile_picture || "",
        }));
        dispatch(setStudents(list));
      } catch (error) {
        console.error(error);
        setPageError("تعذر تحميل قائمة الطلاب. حاول تحديث الصفحة.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [dispatch]);


  const filteredStudents = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return students;
    }

    return students.filter((student) =>
      [student.fullName, student.email, student.phone, student.address].some(
        (value) => (value || "").toLowerCase().includes(normalizedSearch),
      ),
    );
  }, [searchTerm, students]);

  const handleDelete = async (studentId) => {
    const student = students.find((item) => item.id === studentId);

    if (!student) {
      return;
    }

    const confirmed = window.confirm(
      `هل أنت متأكد من حذف الطالب ${student.fullName}؟`,
    );

    if (confirmed) {
      setIsDeleting(true);
      setPageError("");
      try {
        const response = await apiFetch("delete_student.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: studentId }),
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "تعذر حذف الطالب.");
        }

        dispatch(deleteStudent(studentId));
      } catch (error) {
        console.error(error);
        setPageError(error.message || "تعذر حذف الطالب. حاول مرة أخرى.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />

      <main className="flex-grow-1 container py-4 py-md-5">
        <section className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
              <div>
                <h1 className="h2 fw-bold mb-1">عرض الطلاب</h1>
                <p className="text-secondary mb-0">
                  قم بإدارة جميع الطلاب المسجلة
                </p>
              </div>

              <Link
                to={PathConstants.ADD_STUDENT}
                className="btn btn-success text-decoration-none"
              >
                إضافة طالب
              </Link>
            </div>

            {pageError && (
              <div className="alert alert-danger" role="alert">
                {pageError}
              </div>
            )}

            {isLoading ? (
              <p className="text-center p-4" role="status">
                جارٍ تحميل قائمة الطلاب...
              </p>
            ) : (
            <>
            <div className="mb-3">
              <label htmlFor="studentSearch" className="form-label fw-semibold">
                ابحث عن الطلاب
              </label>

              <input
                id="studentSearch"
                type="search"
                className="form-control"
                placeholder="ابحث عن الطلاب بواسطة الاسم الشخصي,الرقم او حتى العنوان"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <div className="text-secondary small mb-3">
            عرض {filteredStudents.length} من أصل {students.length} طالباً
            </div>

            {filteredStudents.length > 0 ? (
              <>
                <div className="table-responsive d-none d-lg-block">
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr>
                        <th scope="col">الطالب</th>
                        <th scope="col">الايميل</th>
                        <th scope="col">الرقم الشخصي</th>
                        <th scope="col">العنوان</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              {student.profilePicture ? (
                                <img
                                  src={student.profilePicture}
                                  alt={student.fullName}
                                  className="rounded-circle object-fit-cover flex-shrink-0"
                                  style={{ width: "32px", height: "32px" }}
                                />
                              ) : (
                                <div
                                  className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                                  style={{ width: "32px", height: "32px" }}
                                >
                                  {student.fullName.charAt(0).toUpperCase()}
                                </div>
                              )}

                              <span className="fw-semibold text-nowrap">
                                {student.fullName}
                              </span>
                            </div>
                          </td>
                          <td>{student.email}</td>
                          <td>{student.phone}</td>
                          <td>{student.address}</td>
                          <td>
                            <div className="d-flex flex-wrap gap-2">
                              <Link
                                to={`/students/${student.id}`}
                                className="btn btn-sm btn-outline-primary text-decoration-none"
                              >
                                عرض
                              </Link>

                              <Link
                                to={`/students/${student.id}/edit`}
                                className="btn btn-sm btn-outline-secondary text-decoration-none"
                              >
                                تعديل
                              </Link>

                              <CustomButton
                                variant="outline-danger"
                                className="btn-sm"
                                onClick={() => handleDelete(student.id)}
                                disabled={isDeleting}
                              >
                                حذف
                              </CustomButton>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-lg-none">
                  {filteredStudents.map((student) => (
                    <article
                      className="card border shadow-sm mb-3"
                      key={student.id}
                    >
                      <div className="card-body border-bottom">
                        <div className="d-flex align-items-center gap-2">
                          {student.profilePicture ? (
                            <img
                              src={student.profilePicture}
                              alt={student.fullName}
                              className="rounded-circle object-fit-cover flex-shrink-0"
                              style={{ width: "32px", height: "32px" }}
                            />
                          ) : (
                            <div
                              className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                              style={{ width: "32px", height: "32px" }}
                            >
                              {student.fullName.charAt(0).toUpperCase()}
                            </div>
                          )}

                          <span className="fw-semibold text-nowrap">
                            {student.fullName}
                          </span>
                        </div>
                      </div>

                      <div className="card-body pb-0">
                        <p>
                          <strong>الايميل</strong> {student.email}
                        </p>
                        <p>
                          <strong>الرقم</strong> {student.phone}
                        </p>
                        <p>
                          <strong>العنوان</strong> {student.address}
                        </p>
                      </div>

                      <div className="d-flex flex-wrap gap-2">
                        <Link
                          to={`/students/${student.id}`}
                          className="btn btn-sm btn-outline-primary text-decoration-none"
                        >
                          عرض
                        </Link>

                        <Link
                          to={`/students/${student.id}/edit`}
                          className="btn btn-sm btn-outline-secondary text-decoration-none"
                        >
                          تعديل
                        </Link>

                        <CustomButton
                          variant="outline-danger"
                          className="btn-sm"
                          onClick={() => handleDelete(student.id)}
                          disabled={isDeleting}
                        >
                          حذف
                        </CustomButton>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center border rounded p-5 bg-body">
                <h2>لا يوجد طلاب لعرضهم</h2>
                <p>جرّب تغيير كلمات البحث للعثور على الطلاب</p>
                <Link
                  to={PathConstants.ADD_STUDENT}
                  className="btn btn-success text-decoration-none"
                >
                  اضافة طالب
                </Link>
              </div>
            )}
            </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ViewStudents;
