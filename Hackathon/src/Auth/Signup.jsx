import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
import * as Yup from 'yup';
import { useState } from "react"
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from '../firebase.js'
import { toast } from "sonner"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Eye, EyeOff } from "lucide-react";
"use client"
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirm, setShowConfirm] = useState(false);

  // toggle function
  const togglePassword = () => setShowPassword((prev) => !prev);
  // const toggleConfirmPassword = () => setShowConfirm((prev) => !prev);
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()

  const signupSchema = Yup.object().shape({
    name: Yup.string().required('name is required!'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too Short!').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      let Userdata = ''
      try {
        setloading(true)
        Userdata = await createUserWithEmailAndPassword(auth, values.email, values.password)
        if (Userdata) {
          let docRef = await addDoc(collection(db, "UserAuth"), {
            name: values.name,
            email: values.email,
            time: serverTimestamp()
          });

          console.log("User doc created with ID:", docRef.id);

          await sendEmailVerification(auth.currentUser)
          toast("User has been created. Mail has been sent to your Gmail .Check in Span")
          navigate("/login")
        }
      } catch (err) {
        toast(err)
      } finally {
        setloading(false)
      }
    },
    validationSchema: signupSchema
  });
  return (
    <div className=' flex justify-center items-center h-screen'>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create new account</CardTitle>
          <CardDescription>
            Enter your email and password below to Signup
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="text">name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Owais Ahmed"
                  required
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  style={{
                    borderColor:
                      formik.touched.name && formik.errors.name ? "red" : undefined,
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  style={{
                    borderColor:
                      formik.touched.email && formik.errors.email ? "red" : undefined,
                  }}
                  required
                />
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
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

              <div className="grid gap-2 relative">
                <Label htmlFor="text">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    borderColor:
                      formik.touched.confirmPassword && formik.errors.confirmPassword ? "red" : undefined,
                  }}
                  required
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
            {loading ? 'Creating Account' : 'Create Account'}
          </Button>
          <Button variant="outline" className="w-full">
            <Link to="/login">Already have an account</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signup