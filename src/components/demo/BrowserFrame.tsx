import { useState } from "react";
import { Shield, User, Lock, Unlock, Settings, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

type Tab = "invoice" | "gusto" | "wire" | "chase" | string;
type SecurityStatus = "safe" | "warning" | "neutral";

interface TabData {
  id: string;
  label: string;
  url: string;
  closeable?: boolean;
}

interface BrowserFrameProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
  addressBarUrl: string;
  securityStatus: SecurityStatus;
  fraudProtection: boolean;
  onFraudProtectionChange: (value: boolean) => void;
  payrollLock: boolean;
  onPayrollLockChange: (value: boolean) => void;
  enclaveMode: boolean;
  onEnclaveActivation: () => void;
  onNavigate?: (url: string) => void;
  children: React.ReactNode;
}

const defaultTabs: TabData[] = [
  { id: "inbox", label: "Inbox", url: "mail.google.com/mail/u/0/#inbox", closeable: false },
  { id: "invoice", label: "Invoice PDF", url: "docs.dentalsupplies.com/invoice-2024-1847.pdf", closeable: false },
  { id: "gusto", label: "Gusto Payroll", url: "app.gusto.com/payroll/employees", closeable: false },
  { id: "wire", label: "Wire Transfer", url: "business.bank.com/transfers/new", closeable: false },
];

export function BrowserFrame({
  currentTab,
  onTabChange,
  addressBarUrl,
  securityStatus,
  fraudProtection,
  onFraudProtectionChange,
  payrollLock,
  onPayrollLockChange,
  enclaveMode,
  onEnclaveActivation,
  onNavigate,
  children,
}: BrowserFrameProps) {
  const [tabs, setTabs] = useState<TabData[]>(defaultTabs);
  const [addressInput, setAddressInput] = useState(addressBarUrl);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const getShieldColor = () => {
    switch (securityStatus) {
      case "safe":
        return "text-palo-green";
      case "warning":
        return "text-palo-amber";
      default:
        return "text-muted-foreground";
    }
  };

  const handleAddTab = () => {
    const newTabId = `tab-${Date.now()}`;
    const newTab: TabData = {
      id: newTabId,
      label: "New Tab",
      url: "about:blank",
      closeable: true,
    };
    setTabs([...tabs, newTab]);
    onTabChange(newTabId);
  };

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(updatedTabs);
    if (currentTab === tabId && updatedTabs.length > 0) {
      onTabChange(updatedTabs[updatedTabs.length - 1].id);
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingAddress(false);
    if (onNavigate) {
      onNavigate(addressInput);
    }
  };

  return (
    <div className={cn(
      "flex-1 flex flex-col bg-background rounded-2xl browser-chrome overflow-hidden transition-all duration-700",
      enclaveMode && "enclave-glow"
    )}>
      {/* Browser Chrome */}
      <div className={cn(
        "transition-all duration-700",
        enclaveMode ? "enclave-gradient" : "prisma-gradient"
      )}>
        {/* Tab Bar */}
        <div className="flex items-center gap-1 px-2 pt-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "px-4 py-2 text-sm rounded-t-lg transition-all flex items-center gap-2 group relative",
                currentTab === tab.id
                  ? "bg-background text-foreground font-medium"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              )}
            >
              <span className="truncate max-w-[120px]">{tab.label}</span>
              {tab.closeable && (
                <X
                  className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handleCloseTab(tab.id, e)}
                />
              )}
            </button>
          ))}

          {/* Add Tab Button */}
          <button
            onClick={handleAddTab}
            className="px-2 py-2 text-sm rounded-t-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all"
            title="New Tab"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Address Bar */}
        <div className="bg-background px-3 py-2 flex items-center gap-3">
          {/* Traffic Lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-palo-amber/80" />
            <div className="w-3 h-3 rounded-full bg-palo-green/80" />
          </div>

          {/* Address Bar Input */}
          <form onSubmit={handleAddressSubmit} className="flex-1">
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
              <div className={cn(
                "transition-all",
                enclaveMode ? "text-panw-orange animate-pulse" : getShieldColor()
              )}>
                {enclaveMode ? (
                  <Shield className="w-4 h-4 animate-in zoom-in-50 duration-500" />
                ) : securityStatus === "safe" ? (
                  <Lock className="w-4 h-4" />
                ) : securityStatus === "warning" ? (
                  <Shield className="w-4 h-4" />
                ) : (
                  <Unlock className="w-4 h-4" />
                )}
              </div>
              {isEditingAddress ? (
                <Input
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  onBlur={() => setIsEditingAddress(false)}
                  autoFocus
                  className="flex-1 border-0 bg-transparent p-0 h-auto text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Enter URL or search"
                />
              ) : (
                <span
                  onClick={() => {
                    setIsEditingAddress(true);
                    setAddressInput(addressBarUrl);
                  }}
                  className="text-sm text-muted-foreground flex-1 truncate cursor-text"
                >
                  https://{addressBarUrl}
                </span>
              )}
            </div>
          </form>

          {/* Enclave Security Badge */}
          {enclaveMode && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-panw-orange/10 border border-panw-orange/30 animate-in fade-in slide-in-from-right-5 duration-500">
              <Shield className="w-3.5 h-3.5 text-panw-orange" />
              <span className="text-xs font-semibold text-panw-orange whitespace-nowrap">SECURED</span>
            </div>
          )}

          {/* Settings Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Settings className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Security Settings
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Financial Fraud Protection */}
              <div className="p-3 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Financial Fraud Protection</h4>
                      <Switch
                        checked={fraudProtection}
                        onCheckedChange={onFraudProtectionChange}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Detect suspicious invoice changes and verify bank account modifications
                    </p>
                    <span className="text-xs text-muted-foreground">
                      Status: <span className={cn("font-medium", fraudProtection ? "text-palo-green" : "text-muted-foreground")}>
                        {fraudProtection ? "Active" : "Disabled"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Strict Payroll Lock */}
              <div className="p-3 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Strict Payroll Lock</h4>
                      <Switch
                        checked={payrollLock}
                        onCheckedChange={onPayrollLockChange}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Require biometric authentication before modifying banking information
                    </p>
                    <span className="text-xs text-muted-foreground">
                      Status: <span className={cn("font-medium", payrollLock ? "text-palo-green" : "text-muted-foreground")}>
                        {payrollLock ? "Active" : "Disabled"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Avatar */}
          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/150?img=47"
              alt="Sarah"
              className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
            />
            <span className="text-sm font-medium text-foreground">Sarah</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-muted/30 overflow-auto">
        {children}
      </div>
    </div>
  );
}
