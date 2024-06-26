'use client'
import { SignInScheema } from "@/ValidationScheema/Validation";
import { ApiFetching } from "@/app/services/ApiFetching";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
interface SignInFormValues {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const [loading, setloading] = useState(false)
  const router=useRouter()
  const formik = useFormik<SignInFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInScheema,

    onSubmit: async (values) => {
      try {
        setloading(true)
        const res:any= await ApiFetching('POST','api/signIn',values)
      const token=res.data?.data.token
      const responseError=res.response?res.response:''
      
      if(responseError.status===401 && responseError.data.success===false ){
        toast.error(responseError.data.message,{autoClose:2000})
      }
     
      if(responseError.status===402 && responseError.data.success===false ){
        toast.error(responseError.data.message,{autoClose:2000})
      }
      if(res.statusText==='OK' && res.status===200 && token){
        toast.success(res.data.message,{autoClose:2000});

        router.replace('/dashboard')
      }
      } catch (error) {
       console.log(error);
        
      }finally{
        setloading(false)
      }
     
      formik.resetForm();
      
     
    },
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900 overflow-auto h-full ">
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
          Sign In
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign a account
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

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
              {loading?<CircularProgress sx={{color:'inherit'}} />:'Login'}  
              </button>
              <div className="text-sm font-light text-gray-500 dark:text-gray-400 flex justify-between">

                <Link
                  href="#"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                  Forget Password
                </Link>
                <Link
                  href="/SignUp"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                  Create New Account
                </Link>
                  </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default SignIn;
