"use client";
import React from "react";
import { useFormik } from "formik";
import { signUpSchema } from "@/ValidationScheema/Validation";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { ApiFetching } from "@/app/services/ApiFetching";

interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  Confirm_password: string;
  role: string;
}

const SignUp: React.FC = () => {
  const router=useRouter()
  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      Confirm_password: "",
      role: "Admin",
    },
    validationSchema: signUpSchema,

    onSubmit: async (values) => {
      try {
        const  res:any= await ApiFetching('POST','api/users',values);
        if(res.statusText==='OK' && res.status===200){
          router.replace('/')
        }
        if(res.response.status===409 && res.response.data.success===false){
          toast.error(res.response.data.message)
        }
        if(res.response.status===402 && res.response.data.success===false){
          toast.error(res.response?.data.message)
        }
        
      } catch (error) {
        console.log('error is',error);  
      }
 
      formik.resetForm();
    },
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-8 overflow-auto h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://www.shutterstock.com/image-vector/man-key-near-computer-account-260nw-1499141258.jpg"
            alt="logo"
          />
          Sign Up
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <span className="font-medium text-red-600">
                  {formik.touched.name && formik.errors.name}
                </span>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                <span className="font-medium text-red-600">
                  {formik.touched.email && formik.errors.email}
                </span>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <span className="font-medium text-red-600">
                  {formik.touched.password && formik.errors.password}
                </span>
              </div>
              <div>
                <label
                  htmlFor="Confirm_password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Confirm_password}
                  type="password"
                  name="Confirm_password"
                  id="Confirm_password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <span className="font-medium text-red-600">
                  {formik.touched.Confirm_password &&
                    formik.errors.Confirm_password}
                </span>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default SignUp;
