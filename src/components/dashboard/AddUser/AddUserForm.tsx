'use client'
import React from 'react';
import { useFormik } from 'formik';
import { ApiFetching } from '@/app/services/ApiFetching';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddUserForm = ({userId}:any) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      course: 'Mern Stack', 
      dateOfBirth: '02/02/2002',
      description: '',
      userId:userId,
      file: null,
    },
    onSubmit: async (values) => {
      try {
        const registeredUserForCourse:any=await ApiFetching("POST",'../../api/registeredUserForCourse',values)
        if(registeredUserForCourse.response?.status===409 && registeredUserForCourse.response?.data.success===false){
          toast.error(registeredUserForCourse.response?.data.message)
        }
        console.log(registeredUserForCourse);
        if(registeredUserForCourse.statusText==="OK"){
          toast.success(registeredUserForCourse.data.message)
        }
      } catch (error) {
        toast.error('Somthing went wrong')
      }
      formik.resetForm()
    },
  });

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 " style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Add User
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 items-baseline">
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}           
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="course">
                Select Your Course
              </label>
              <select
                id="course"
                name="course"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={formik.values.course}
                onChange={formik.handleChange}
                
              >
                <option>Mern Stack</option>
                <option>Web Designing</option>
                <option>Java Full Stack Development</option>
                <option>Python Full Stack Development</option>
              </select>
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="dateOfBirth">
                Date Of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={formik.values.dateOfBirth}
                // value={new Date('01/12/2002')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={formik.values.description}
                onChange={formik.handleChange}
                
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span className="">Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(event) => {
                          const file = event.currentTarget.files && event.currentTarget.files[0];
                          formik.setFieldValue('file', file);
                        }}
                        />
                        
                    </label>
                    <p className="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
            >
              Save
            </button>
          </div>
        </form>
      </section>
      <ToastContainer/>
    </>
  );
};

export default AddUserForm;
