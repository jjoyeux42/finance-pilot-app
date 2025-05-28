
import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Settings,
  BarChart3,
  Wallet
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
    isActive: true,
  },
  {
    title: "Trésorerie",
    icon: Wallet,
    url: "/treasury",
  },
  {
    title: "Rentabilité",
    icon: TrendingUp,
    url: "/profitability",
  },
  {
    title: "Commercial",
    icon: Users,
    url: "/sales",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    url: "/analytics",
  },
];

const secondaryItems = [
  {
    title: "Paramètres",
    icon: Settings,
    url: "/settings",
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-finance-100">
      <SidebarHeader className="border-b border-finance-100 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl finance-gradient flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-finance-900">FinancePilot</h1>
            <p className="text-sm text-finance-600">Pilotage financier</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-finance-700 font-semibold">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`
                      transition-all duration-200 hover:bg-finance-50 hover:text-finance-700
                      ${item.isActive ? 'bg-finance-100 text-finance-800 font-medium border-r-2 border-finance-500' : 'text-finance-600'}
                    `}
                  >
                    <a href={item.url} className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-finance-700 font-semibold">
            Système
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="transition-all duration-200 hover:bg-finance-50 hover:text-finance-700 text-finance-600"
                  >
                    <a href={item.url} className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-finance-100 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-finance-100 flex items-center justify-center">
            <span className="text-sm font-medium text-finance-700">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-finance-900">John Doe</p>
            <p className="text-xs text-finance-600 truncate">admin@financepilot.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
