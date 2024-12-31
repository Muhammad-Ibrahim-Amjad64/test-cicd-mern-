import * as yup from "yup";

const schema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  shippingaddress: yup.string().required("Shipping address is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  province: yup.string().required("Province is required"),
  postcode: yup.string().required("Postcode is required"),
  email: yup.string().email().required("Please enter your email"),
});

export default schema;