import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const formSchema = Yup.object({
  UserName: Yup.string().required("UserName is required"),
  Password: Yup.string().required("Password is required"),
});

export default function Login() {
  const formik = useFormik({
    initialValues: {
      UserName: "",
      Password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      console.log(values);

      const { UserName, Password } = formik.values;

      await axios
        .post("https://cookiedemo.sparkdemos.com/login", {
          UserName,
          Password,
        })
        .then((res) => console.log(res))
        .then((err) => console.log(err))
        .then(() => formik.resetForm());
    },
  });

  const { UserName, Password } = formik.values;

  const handleCheck = async () => {
    await axios
      .get("https://cookiedemo.sparkdemos.com/check", {
        UserName,
        Password,
      })
      .then((res) => console.log(res))
      .then((err) => console.log(err));
  };

  return (
    <div className="flex h-screen w-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="UserName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              UserName
            </label>
            <div className="mt-2">
              <input
                type="text"
                autoComplete="text"
                name="UserName"
                value={UserName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.touched.UserName && formik.errors.UserName && (
                <div className="mt-3 text-sm text-red-500">
                  {formik.errors.UserName}
                </div>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="Password"
                name="Password"
                autoComplete="Password"
                value={Password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.touched.Password && formik.errors.Password && (
                <div className="mt-3 text-sm text-red-500">
                  {formik.errors.Password}
                </div>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <button
          className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleCheck}
        >
          Check
        </button>
      </div>
    </div>
  );
}
