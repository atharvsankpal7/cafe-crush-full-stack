export const login = async (email, password) => {
    const response = await fetch("/api/auth/manager-login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
  
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("managerToken", data.token);
    }
    return data;
  };
  