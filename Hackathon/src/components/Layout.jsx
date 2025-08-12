import { SidebarProvider ,SidebarTrigger} from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { ModeToggle } from "./mode-toggle"
import Profilemenu from "./Profilemenu"

export default function Layout({children}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen">
        <div className="flex  items-center justify-between p-2  shadow-lg shadow-gray-700">
        <SidebarTrigger />
        <div className="flex gap-4 items-center justify-center p-1">
         <ModeToggle/>
         <Profilemenu />
         </div>
         </div>
      <div className="p-2">
      {children}
      </div>
      </main>
    </SidebarProvider>
  )
}