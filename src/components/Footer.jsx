import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { CiLocationArrow1 } from "react-icons/ci";
import PathConstants from "../routes/pathConstants";

function Footer() {
  return (
    <footer className="bg-body-tertiary border-top mt-auto">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <h3 className="h6 text-uppercase fw-bold mb-3">معلومات التواصل</h3>
            <p className="small text-secondary mb-2">
              سوريا ,حمص
              <br />
              المحطة
            </p>
            <p className="small text-secondary mb-2">الرقم:0968961895</p>
            <p className="small text-secondary mb-2">الايميل: svu@gmail.com</p>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <h3 className="h6 text-uppercase fw-bold mb-3">روابط مهمة</h3>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link
                  className="text-secondary text-decoration-none"
                  to={PathConstants.ABOUTUS}
                >
                  حولنا
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  className="text-secondary text-decoration-none"
                  to={PathConstants.CONTACTUS}
                >
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <h3 className="h6 text-uppercase fw-bold mb-3">
              أهم فروعنا الجامعية
            </h3>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <p className="text-secondary text-decoration-none">
                  هندسة المعلوماتية
                </p>
              </li>
              <li className="mb-2">
                <p className="text-secondary text-decoration-none">
                  هندسة المدن الذكية
                </p>
              </li>
              <li className="mb-2">
                <p className="text-secondary text-decoration-none">الحقوق</p>
              </li>
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <h3 className="h6 text-uppercase fw-bold mb-3">ارسل لنا رأيك</h3>
            <p className="small text-secondary mb-2">اكتب الرسالة هنا</p>
            <div className="d-flex mt-3">
              <input
                className="form-control"
                type="text"
                placeholder="اكتب هنا"
              />
              <button
                className="btn btn-primary"
                type="button"
                aria-label="إرسال الرسالة"
              >
                <CiLocationArrow1 />
              </button>
            </div>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 border-top pt-3 mt-4 small text-secondary">
          <p className="mb-0">
            جميع الحقوق محفوظة &copy; للجامعة الافتراضية السورية
          </p>
          <div className="d-flex gap-3">
            <a
              className="text-secondary text-decoration-none"
              href="https://facebook.com"
            >
              <FaFacebook />
            </a>
            <a
              className="text-secondary text-decoration-none"
              href="https://x.com"
            >
              <FaXTwitter />
            </a>
            <a
              className="text-secondary text-decoration-none"
              href="https://linkedin.com"
            >
              <FaLinkedin />
            </a>
            <a
              className="text-secondary text-decoration-none"
              href="https://instagram.com"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
