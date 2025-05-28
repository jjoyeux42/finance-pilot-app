
import { 
  LayoutDashboard, 
  TrendingUp, 
  PiggyBank, 
  Users, 
  FileText, 
  Settings, 
  CreditCard,
  BarChart3,
  Target,
  AlertCircle
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
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Trésorerie",
    url: "/tresorerie",
    icon: PiggyBank,
  },
  {
    title: "Rentabilité",
    url: "/rentabilite",
    icon: TrendingUp,
  },
  {
    title: "Commercial",
    url: "/commercial",
    icon: Users,
  },
  {
    title: "Rapports",
    url: "/rapports",
    icon: FileText,
  },
  {
    title: "Prévisions",
    url: "/previsions",
    icon: Target,
  },
  {
    title: "Alertes",
    url: "/alertes",
    icon: AlertCircle,
  },
  {
    title: "Paramètres",
    url: "/parametres",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-white border-r border-gray-200">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-finance-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">FinancePilot</h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-medium">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-finance-50">
                    <a href={item.url} className="flex items-center space-x-3 text-gray-700">
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

      <SidebarFooter className="p-6 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          © 2024 FinancePilot
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
