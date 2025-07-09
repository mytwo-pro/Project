"use client"

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar"
import { Sprout, LayoutDashboard, TestTube2, CalendarDays, BookOpen, LifeBuoy, Settings } from "lucide-react"

const menuItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/seed-insights', label: 'Seed Insights', icon: Sprout },
    { href: '/soil-analysis', label: 'Soil Analysis', icon: TestTube2 },
    { href: '/planting-calendar', label: 'Planting Calendar', icon: CalendarDays },
    { href: '/growing-specs', label: 'Growing Specs', icon: BookOpen },
];


export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-lg">
                        <Sprout className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h1 className="text-xl font-bold font-headline">VerdantAI</h1>
                </div>
            </SidebarHeader>
            <SidebarContent className="p-2">
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <Link href={item.href} legacyBehavior passHref>
                                <SidebarMenuButton isActive={pathname === item.href}>
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <LifeBuoy className="h-5 w-5" />
                            <span>Support</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Settings className="h-5 w-5" />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
