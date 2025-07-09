import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-full">
        <AppSidebar />
        <SidebarInset>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
