export const updateProfile = async (
  token: string,
  formData: {
    name: string;
    mobileNumber: string;
    countryCode: string;
    dob: string;
    gender: string;
  }
) => {
  // Convert YYYY-MM-DD from input[type="date"]
  // to DD-MM-YYYY expected by backend
  let formattedDob = "";

  if (formData.dob) {
    const [year, month, day] = formData.dob.split("-");
    formattedDob = `${day}-${month}-${year}`;
  }

  return fetch("/api/auth/profile", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      ...formData,
      dob: formattedDob,
    }),
  });
};