import { ChevronLeft, ChevronRight, Shield, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  fraudProtection: boolean;
  onFraudProtectionChange: (value: boolean) => void;
  payrollLock: boolean;
  onPayrollLockChange: (value: boolean) => void;
}

export function AdminSidebar({
  isCollapsed,
  onToggleCollapse,
  fraudProtection,
  onFraudProtectionChange,
  payrollLock,
  onPayrollLockChange,
}: AdminSidebarProps) {
  return (
    <div
      className={cn(
        "h-full bg-card border-r border-border transition-all duration-300 flex flex-col",
        isCollapsed ? "w-14" : "w-72"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Admin Controls</span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Settings */}
      {!isCollapsed && (
        <div className="flex-1 p-4 space-y-6 animate-fade-up">
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Security Policies
            </h3>

            {/* Fraud Protection Toggle */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">Financial Fraud Protection</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Detect suspicious invoice changes
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {fraudProtection ? "Active" : "Disabled"}
                </span>
                <Switch
                  checked={fraudProtection}
                  onCheckedChange={onFraudProtectionChange}
                />
              </div>
            </div>

            {/* Payroll Lock Toggle */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">Strict Payroll Lock</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Require biometric auth for bank edits
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {payrollLock ? "Active" : "Disabled"}
                </span>
                <Switch
                  checked={payrollLock}
                  onCheckedChange={onPayrollLockChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed State Icons */}
      {isCollapsed && (
        <div className="flex-1 flex flex-col items-center pt-4 gap-3">
          <div
            className={cn(
              "p-2 rounded-lg transition-colors",
              fraudProtection ? "bg-primary/10" : "bg-muted"
            )}
            title="Financial Fraud Protection"
          >
            <Shield
              className={cn(
                "w-4 h-4",
                fraudProtection ? "text-primary" : "text-muted-foreground"
              )}
            />
          </div>
          <div
            className={cn(
              "p-2 rounded-lg transition-colors",
              payrollLock ? "bg-primary/10" : "bg-muted"
            )}
            title="Strict Payroll Lock"
          >
            <Shield
              className={cn(
                "w-4 h-4",
                payrollLock ? "text-primary" : "text-muted-foreground"
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
