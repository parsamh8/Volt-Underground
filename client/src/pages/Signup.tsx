import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { input: { ...formState } },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-zinc-900 text-white space">
      {data ? (
        <p>
          Success! You may now head <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <form
          onSubmit={handleFormSubmit}
          className="flex w-[30rem] flex-col space-y-10"
        >
          <div className="text-center text-4xl font-medium">Sign Up</div>
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-violet-500">
            <input
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              placeholder="Your username"
              name="username"
              type="text"
              value={formState.username}
              onChange={handleChange}
            />
          </div>
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-violet-500">
            <input
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-violet-500">
            <input
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <button className="transform rounded-sm bg-violet-700 py-2 font-bold duration-300 hover:bg-violet-900">
            SIGN UP
          </button>

          <p className="text-center text-lg">
            Have an account already?
            <a
              href="/login"
              className="font-medium text-violet-500 underline-offset-4 hover:underline ml-2"
            >
              Log In
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

export default Signup;

// <main className="flex-row justify-center mb-4">
//   <div className="col-12 col-lg-10">
//     <div className="card">
//       <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
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
//               placeholder="Your username"
//               name="username"
//               type="text"
//               value={formState.username}
//               onChange={handleChange}
//             />
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

//       </div>
//     </div>
//   </div>
// </main>
