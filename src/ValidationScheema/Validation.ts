import * as Yup from 'yup';

export const signUpSchema = Yup.object({
  name: Yup.string()
    .min(3, "Username should be at least 3 characters")
    .max(25)
    .required("Please Enter Your Username"),
    email: Yup.string().required('Please Enter Your Email').email("Enter valid Email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter and one digit"
    )
    .required("Please Enter Your Password"),
  Confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords don't match")
    .required("Confirm your password!"),
});
export const SignInScheema = Yup.object({
    email: Yup.string().required('Please Enter Your Email').email("Enter valid Email"), 
    password: Yup.string()
      .min(6, "password must be 6 letter")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter and one digit"
      )
      .required("Please Enter Your Password"),
  });