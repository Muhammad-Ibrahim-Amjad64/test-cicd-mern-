import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required("Please enter your email"),
  password: yup
    .string()
    .min(8)
    .max(15)
    .required("please Enter your password")
    // .matches(
    //   /(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //   "Must Contain 8 Characters, and One Special Case Character"
    // ),
    ,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must match").required(),
});


export default schema 

// https://www.npmjs.com/package/yup

// https://stackoverflow.com/questions/55451304/formik-yup-password-strength-validation-with-react
