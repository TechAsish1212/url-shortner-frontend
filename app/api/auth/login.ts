interface LoginParams{
    email:string,
    password:string
}

export const signin = async ({
  email,
  password,
}: LoginParams) => {
  return fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};