// the last step of formik is  5th---------
// total 10  steps

//---------------------------------------------------------

// 6th  step make a folder in src naming schemas  -> make a folder index.js
// 7th write a validation logic in

// agar kisi folder ke andar index.js file hogi to us folder ko call krny pr index.js call hoti h

import { useFormik } from "formik"; // 1st step

import schema from "../schemas"; // 7th step

const initialValues = {
  email: "", //  3rd step should be same as name attribute
  password: "",
  confirmPassword: "",
};

const SimpleInput = (props) => {
  //    const Formik = useFormik(  // second step
  const { handleChange, values, handleSubmit, handleBlur, errors, touched } =
    useFormik(
      // 2nd step  destructering for clear code
      {
        initialValues: initialValues,
        validationSchema: schema,
        // 10th step add action property to clear the form
        onSubmit: (values, action) => {
          console.log(values);

          alert("submit hua");
          action.resetForm();
          
        },
      }
    );

  const invalitStyle = {
    color: "red",
  };
  return (
    // 4th step on mn handleSubmit

    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="Email">Email</label>
        <input
          type="text"
          id="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email ? (
          <p style={invalitStyle}>{errors.email}</p>
        ) : (
          ""
        )}
        {/*must include name property  */}
        {/* 8th step errors.somthing wali lines add
        9th step integrate touched property */}
      </div>
      <div className="form-control">
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="Password"
          name="password"
          //   5th step include these 3 values as it is in every input field
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password ? (
          <p style={invalitStyle}>{errors.password}</p>
        ) : (
          ""
        )}
      </div>

      <div className="form-control">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.confirmPassword && errors.confirmPassword ? (
          <p style={invalitStyle}>{errors.confirmPassword}</p>
        ) : (
          ""
        )}
        {/*must include name property  */}
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

// THAPPA TECHNICAL CODE GUIDE
// https://github.com/thapatechnical/reactValidation
