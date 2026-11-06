import * as yup from "yup";

export const addStudentSchema = () =>
  yup.object({
    firstName: yup.string().trim().min(1).required("اسمك الشخصي مطلوب"),
    lastName: yup.string().trim().min(1).required("الكنية مطلوبة"),
    email: yup
      .string()
      .email("ايميل غير صالح")
      .required("الايميل مطلوب"),
    phone: yup.string().min(10).max(10).required("الرقم مطلوب"),
    profilePicture: yup.mixed().nullable().notRequired(),
    address: yup.string().min(5).required("العنوان مطلوب"),
  });
