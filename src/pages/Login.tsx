import { useState } from "react";
// import { useAxios } from "@/hooks/api/axios";
import axios from "@/hooks/api/axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react"; 

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  // const { axios, loading: axiosLoading } = useAxios();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });

      console.log("🔑 Full login response:", data);

      const token = data.data?.token;

      console.log("LOCAL:", localStorage.getItem("token"));
      console.log("SESSION:", sessionStorage.getItem("token"));


      if (token && data.success) {
        // ✅ store token securely
        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }
        navigate("/Dashboard"); // redirect to dashboard
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Try again.");
      
    } finally {
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border border-gray-200 bg-white">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold text-gray-900">
            HOK Admin Panel
          </CardTitle>
          <p className="text-sm text-gray-600">
            Sign in to access your dashboard
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <Input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />

            {/* Password */}
            <div className="relative w-full">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            </div>

            {/* Remember Me*/}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                  className="h-4 w-4"
                />
                <span className="text-gray-700">Remember me</span>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            {/* Login Button */}
            {/* <Button
              type="submit"
              disabled={axiosLoading}
              className="w-full h-11 text-white font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition flex items-center justify-center"
            >
              {axiosLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Login"
              )}
            </Button> */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 ..."
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
