"use client";

import { AudioWaveform, Combine, Swords, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/shadcn/components/ui/sidebar";

import { NavUser } from "@/components/nav-user";

const user = {
  name: "Tcm Arena",
  email: "tcmarena@medinfox.org",
  avatar: "/assets/images/shadcn.jpg",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <Header />
      <Body />
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

const Header = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <AudioWaveform className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-bold">TCM Arena</span>
              <span className="truncate text-xs">
                {"a very longdescription here..."}
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

const Body = () => {
  const pathname = usePathname();

  const items = [
    { label: "Extractor", icon: Combine, href: "/tcmarena/extractor" },
    { label: "Battle", icon: Swords, href: "/tcmarena/battle" },
    { label: "Leaderboard", icon: Trophy, href: "/tcmarena/leaderboard" },
  ];

  const history = [
    { id: "1", title: "Deepseek R1 vs Qwen2.5 32B", type: "battle" },
    { id: "2", title: "Extract with Deepseek R1", type: "extractor" },
  ];

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Arena</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                isActive={pathname.includes(item.label.toLowerCase())}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 size-4" />
                  {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>History</SidebarGroupLabel>
        <SidebarMenu>
          {history.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton className="truncate">
                {item.type === "battle" ? (
                  <Swords className="rounded-full p-0.5" />
                ) : (
                  <Combine className="rounded-full p-0.5" />
                )}
                {item.title}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
};
