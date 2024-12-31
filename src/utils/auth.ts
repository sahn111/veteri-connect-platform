export const verifyToken = async (): Promise<boolean> => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/verify/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: localStorage.getItem("access_token") }),
      });
  
      return response.ok;
    } catch (error) {
      return false;
    }
  };
  
export const refreshToken = async (): Promise<boolean> => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: localStorage.getItem("refresh_token") }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("access_token", data.access);
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

export const ensureToken = async () => {
  const isValid = await verifyToken();

  if (!isValid) {
    const refreshed = await refreshToken();
    if (!refreshed) {
      console.error("Token geçersiz ve yenilenemedi.");
      return false;
    }
  }

  return true;
};
