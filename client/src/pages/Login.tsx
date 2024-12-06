import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white space">
      {data ? (
        <p>
          Success! You may now head <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <form
          onSubmit={handleFormSubmit}
          className="flex w-[30rem] flex-col space-y-10"
        >
          <div className="text-center text-4xl font-medium">Log In</div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <button className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">
            LOG IN
          </button>

          <a
            href="#"
            className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
          >
            FORGOT PASSWORD?
          </a>

          <p className="text-center text-lg">
            No account?
            <a
              href="/signup"
              className="font-medium text-indigo-500 underline-offset-4 hover:underline ml-2"
            >
              Create One
            </a>
          </p>
        </form>
      )}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </main>
  );
};

export default Login;
// <main className="flex-row justify-center mb-4">
//   <div className="col-12 col-lg-10">
//     <div className="card">
//       <h4 className="card-header bg-dark text-light p-2">Login</h4>
//       <div className="card-body">
//         {data ? (
//           <p>
//             Success! You may now head{' '}
//             <Link to="/">back to the homepage.</Link>
//           </p>
//         ) : (
//           <form onSubmit={handleFormSubmit}>
//             <input
//               className="form-input"
//               placeholder="Your email"
//               name="email"
//               type="email"
//               value={formState.email}
//               onChange={handleChange}
//             />
//             <input
//               className="form-input"
//               placeholder="******"
//               name="password"
//               type="password"
//               value={formState.password}
//               onChange={handleChange}
//             />
//             <button
//               className="btn btn-block btn-primary"
//               style={{ cursor: 'pointer' }}
//               type="submit"
//             >
//               Submit
//             </button>
//           </form>
//         )}

//
//       </div>
//     </div>
//   </div>
// </main>
