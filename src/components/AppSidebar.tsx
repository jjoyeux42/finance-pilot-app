
import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Settings,
  BarChart3,
  Wallet,
  PieChart,
  User,
  LogOut
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
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

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
    icon: PieChart,
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
  const currentPath = window.location.pathname;
  const { user, signOut } = useAuth();
  const { profile } = useProfile();

  const handleSignOut = async () => {
    await signOut();
  };

  const displayName = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}`
    : user?.email || 'Utilisateur';

  const initials = profile?.first_name && profile?.last_name
    ? `${profile.first_name[0]}${profile.last_name[0]}`
    : user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <Sidebar className="border-r border-slate-200 bg-white">
      <SidebarHeader className="border-b border-slate-200 p-4 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900">FinancePilot</h1>
            <p className="text-sm text-slate-600">Pilotage financier</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-700 font-semibold">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = currentPath === item.url || 
                  (item.url !== "/" && currentPath.startsWith(item.url));
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`
                        transition-all duration-200 hover:bg-slate-100 hover:text-slate-800
                        ${isActive ? 'bg-blue-100 text-blue-800 font-medium border-r-2 border-blue-500' : 'text-slate-600'}
                      `}
                    >
                      <a href={item.url} className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-700 font-semibold">
            Système
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="transition-all duration-200 hover:bg-slate-100 hover:text-slate-800 text-slate-600"
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

      <SidebarFooter className="border-t border-slate-200 p-4 bg-white space-y-2">
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-slate-50 rounded-lg p-2 transition-colors"
             onClick={() => window.location.href = '/profile'}>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-medium text-sm">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">{displayName}</p>
            <p className="text-xs text-slate-600 truncate">{user?.email}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleSignOut}
          className="w-full justify-start text-slate-600 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
