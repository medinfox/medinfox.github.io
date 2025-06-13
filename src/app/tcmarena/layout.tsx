import { SidebarInset, SidebarProvider } from "@/shadcn/components/ui/sidebar";

import { AppSidebar } from "./sidebar";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
