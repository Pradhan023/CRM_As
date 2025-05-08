import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { useState, type FormEvent } from "react"
import { loginUser } from "@/pages/login/LoginSlice"
import type { AppDispatch } from "@/lib/store"
import { useNavigate } from "react-router-dom"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const{ token } = useSelector((state:any) => state.login);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const handleChange = (e:any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser(credentials));
    if (result.meta.requestStatus === 'fulfilled') {
      setCredentials({ username: '', password: '' });
      navigate('/dashboard');
    }
  };
console.log(token)
  return (
    <div className={cn("flex flex-col gap-6 xl:w-1/2 xl:h-1/2", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your CRM account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">User Name</Label>
                <Input
                  id="email"
                  name="username"
                  type="text"
                  placeholder="example22"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" required onChange={handleChange} />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <div className="bg-gradient-to-b from-blue-500 via-white to-blue-500 relative hidden md:flex justify-center items-center flex-col gap-3 ">
            <h1 className="text-xl font-bold text-blue-300">Welcome Here!</h1>
            <p className="text-sm text-blue-500">Sign-in to get the best experience</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
