import { useState } from "react";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUser("");
    setPassword("");
  }

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="rounded-lg shadow-lg shadow-sky-500 p-4">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="flex items-center gap-4">
            <label htmlFor="userOrEmail">Username or Email</label>
            <input
              type="text"
              id="userOrEmail"
              placeholder="username or email"
              value={user}
              className="rounded-lg p-1 my-2 border outline-none focus:ring-4 duration-300 text-black"
              onChange={(event) => setUser(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              className="rounded-lg p-1 my-2 focus:ring-4 duration-300 text-black border outline-none"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="border border-sky-500 rounded-full font-semibold text-sky-500 bg-white group active:bg-sky-500 active:text-white">
            <button
              type="submit"
              className="px-4 py-1 group-hover:scale-110 duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
