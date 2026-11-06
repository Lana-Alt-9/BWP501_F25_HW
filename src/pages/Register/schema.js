import * as Yup from "yup";

export const registerSchema = () =>
  Yup.object({
    firstName: Yup.string()
      .min(2, "الاسم يجب ان يتكون من حرفين على الاقل")
      .required("اسمك الشخصي مطلوب"),
    lastName: Yup.string()
      .min(2, "الكنية يجب ان تتكون من حرفين على الاقل")
      .required("الكنية مطلوبة"),
    email: Yup.string()
      .email("الايميل غير صالح")
      .required("الايميل مطلوب"),
    password: Yup.string()
      .min(8, "يجب ان تكون كلمة السر على الاقل 8 خانات")
      .required("كلمة السر مطلوبة"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "يجب ان تتطابق مع كلمة السر")
      .required("تأكيد كلمة السر مطلوب"),
    agreeRules: Yup.boolean().oneOf([true], "يجب الموافقة على الشروط والاحكام"),
  });
