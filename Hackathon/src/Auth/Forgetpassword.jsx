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
import {auth} from '../firebase.js'
import {sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { useState } from "react"
 import * as Yup from 'yup';
 import { useFormik } from "formik"
 import { toast } from "sonner"

function Forgetpassword() {
   const navigate = useNavigate()
   const [loading,setloading] = useState(false)

   const loginSchema = Yup.object().shape({
   email: Yup.string().email('Invalid email').required('Required'),
 });



  const formik = useFormik({
    initialValues: {
      email:"",
    },
    validationSchema:loginSchema,
   onSubmit: async (values) => {
  try {
    setloading(true);
    await sendPasswordResetEmail(auth,values.email)
    toast("email sended successfully!")
    navigate("/login")
  } catch (err) {
     toast(err.message)
  } finally {
      setloading(false)
  }
}
});

  return (
     <div className=' flex justify-center items-center h-screen'>
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Forget Password</CardTitle>
        <CardDescription>
          Enter your email below to find your account
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
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button disabled={loading} type="submit" className="w-full" onClick={formik.submitForm}>
          { loading ? 'Sending...' : 'Send Verification code'}
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Forgetpassword