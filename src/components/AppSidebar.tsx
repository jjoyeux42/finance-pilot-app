
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
  LogOut,
  FileText,
  PiggyBank,
  Target,
  Activity,
  AlertTriangle,
  FileBarChart
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

const mainItems = [
  {
    title: "Tableau de bord",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Trésorerie",
    icon: Wallet,
    url: "/treasury",
  },
  {
    title: "Commercial",
    icon: TrendingUp,
    url: "/sales",
  },
  {
    title: "Rentabilité",
    icon: DollarSign,
    url: "/profitability",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    url: "/analytics",
  },
];

const managementItems = [
  {
    title: "Clients",
    icon: Users,
    url: "/customers",
  },
  {
    title: "Factures",
    icon: FileText,
    url: "/invoices",
  },
  {
    title: "Budget",
    icon: PiggyBank,
    url: "/budget",
  },
];

const dashboardItems = [
  {
    title: "Vue Exécutive",
    icon: Target,
    url: "/executive",
  },
  {
    title: "Vue Opérationnelle",
    icon: Activity,
    url: "/operational",
  },
  {
    title: "Risques",
    icon: AlertTriangle,
    url: "/risk",
  },
];

const reportItems = [
  {
    title: "Rapports",
    icon: FileBarChart,
    url: "/reports",
  },
];

const settingsItems = [
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
    <Sidebar className="border-r-0 bg-gradient-to-b from-white to-white backdrop-blur-xl shadow-2xl">
      <SidebarHeader className="border-b border-white bg-white/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3 px-3 sm:px-4 py-4 sm:py-6">
          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-white font-bold text-sm sm:text-lg">FP</span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-slate-900 text-base sm:text-lg truncate">Finance Pilot</h2>
            <p className="text-xs text-slate-500 truncate">Tableau de bord</p>
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
              {mainItems.map((item) => {
                const isActive = currentPath === item.url || 
                  (item.url !== "/" && currentPath.startsWith(item.url));
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`
                        transition-all duration-200 hover:bg-white hover:text-slate-800
                        ${isActive ? 'bg-blue-100 text-blue-800 font-medium border-r-2 border-white' : 'text-slate-600'}
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
            Gestion
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => {
                const isActive = currentPath === item.url || 
                  (item.url !== "/" && currentPath.startsWith(item.url));
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`
                        transition-all duration-200 hover:bg-white hover:text-slate-800
                        ${isActive ? 'bg-blue-100 text-blue-800 font-medium border-r-2 border-white' : 'text-slate-600'}
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
            Tableaux de Bord
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => {
                const isActive = currentPath === item.url || 
                  (item.url !== "/" && currentPath.startsWith(item.url));
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`
                        transition-all duration-200 hover:bg-white hover:text-slate-800
                        ${isActive ? 'bg-blue-100 text-blue-800 font-medium border-r-2 border-white' : 'text-slate-600'}
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
            Rapports
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {reportItems.map((item) => {
                const isActive = currentPath === item.url || 
                  (item.url !== "/" && currentPath.startsWith(item.url));
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`
                        transition-all duration-200 hover:bg-white hover:text-slate-800
                        ${isActive ? 'bg-blue-100 text-blue-800 font-medium border-r-2 border-white' : 'text-slate-600'}
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
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="transition-all duration-200 hover:bg-white hover:text-slate-800 text-slate-600"
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

      <SidebarFooter className="border-t border-white p-4 bg-white space-y-2">
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-white rounded-lg p-2 transition-colors"
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
