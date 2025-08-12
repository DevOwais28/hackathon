import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useFormik} from "formik"
 import * as Yup from 'yup';
 import {auth} from '../firebase.js'
import {signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import {Link, useNavigate} from 'react-router-dom'
import { toast } from "sonner"
import { sendEmailVerification } from "firebase/auth";
import useAppStore from "../Store.js"
import { Eye, EyeOff } from "lucide-react";

function Login() {
  let {setUserId} = useAppStore()
   const navigate = useNavigate()
   const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
   const [loading,setloading] = useState(false)
   const loginSchema = Yup.object().shape({
   email: Yup.string().email('Invalid email').required('Required'),
   password: Yup.string().min(6, 'Too Short!').required('Required')
 });

  const formik = useFormik({
    initialValues: {
      email:"",
      password:""
    },
    validationSchema:loginSchema,
   onSubmit: async (values) => {
    let userCredential =''
  try {
    setloading(true)
    userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
    console.log("Login successful:", userCredential);
    console.log(values)

    toast("Login successful");
    if (userCredential?.user?.emailVerified) {
      setUserId(userCredential?.user?.uid)
      navigate('/')
    }
    else {
      await sendEmailVerification(auth.currentUser)
      toast("You are not Verified. Mail has been sent to your Gmail .Check in Span")
    }
    // You can add a redirect or user state update here
  } catch (err) {
    toast(err.message || "Login failed");
    console.log(err)
  } finally {
    setloading(false);
  }
}
});



  return (
     <div className=' flex justify-center items-center h-screen'>
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"               
                placeholder="m@example.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                required
                style={{
                     borderColor:
                    formik.touched.email && formik.errors.email ? "red" : undefined,
                }}
              />
              {/* {formik.errors.email && formik.touched.email && (
             document.getElementById('email').style.borderColor="red")
             } */}
            </div>
             <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forget-password"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    borderColor:
                      formik.touched.password && formik.errors.password ? "red" : undefined,
                  }}
                />
                <span
                  onClick={togglePassword}
                  className="absolute right-3 top-8 cursor-pointer text-gray-500 hover:text-black transition-all duration-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
      <Button disabled={loading} type="submit" className="w-full" onClick={formik.submitForm}>
          { loading ? 'logging In' : 'Login'}
        </Button>
        <Button variant="outline" className="w-full">
          <Link to="/signup" 
          >Create new account</Link>
        </Button>

        
      </CardFooter>
    </Card>
    </div>
  )
}


export default Login
