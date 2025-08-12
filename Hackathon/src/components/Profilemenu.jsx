import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"
import useAppStore from "../Store"
import {toast} from "sonner"
import { Navigate } from "react-router-dom"
const Profilemenu = () => {
    const {setUserId} = useAppStore()
  return (
    <div>
      <DropdownMenu>
  <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem
    onClick={()=>{
        setUserId('')
        toast("Logged out successfully")
        Navigate('/login')
    }}
    >Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    </div>
  )
}
export default Profilemenu
