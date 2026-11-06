import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main>
      <h1>هذه الصفحة غير موجودة</h1>
      <Link to="/">اذهب الى الصفحة الرئيسية</Link>
    </main>
  );
}
export default NotFound;
