import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  fetchRefreshToken,
  fetchToken,
  isTokenExpired,
} from "../features/tokenSlice";
import { useSelector } from "react-redux";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { access, refresh } = useSelector((state: RootState) => state.token);
  const dispatch: AppDispatch = useDispatch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(fetchToken({ username_or_email: user, password: password }));
    setUser("");
    setPassword("");
    console.log(isTokenExpired(access));
    if (isTokenExpired(access)) {
      dispatch(fetchRefreshToken({ refresh: refresh }));
    }
  }

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="rounded-lg shadow-lg shadow-sky-500 p-4">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <label htmlFor="userOrEmail">Username or Email</label>
          <input
            type="text"
            id="userOrEmail"
            placeholder="username or email"
            value={user}
            className="rounded-lg p-1 my-2 outline-none focus:ring-4 duration-300"
            onChange={(event) => setUser(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            className="rounded-lg p-1 my-2 outline-none focus:ring-4 duration-300"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
}
