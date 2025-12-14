import { useState } from "react";
import { Users, DollarSign, Calendar, Fingerprint, X, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GustoScenarioProps {
  payrollLockEnabled: boolean;
  onSecurityEvent: (status: "warning" | "safe") => void;
}

export function GustoScenario({ payrollLockEnabled, onSecurityEvent }: GustoScenarioProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleBankFieldClick = () => {
    if (payrollLockEnabled) {
      setShowAuthModal(true);
      onSecurityEvent("warning");
    }
  };

  const handleDismiss = () => {
    setShowAuthModal(false);
    onSecurityEvent("safe");
  };

  return (
    <div className="h-full p-6 relative">
      {/* Gusto Dashboard Mock */}
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Payroll Dashboard</h1>
              <p className="text-sm text-muted-foreground">Bright Smile Dental</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Run Payroll
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-sm text-muted-foreground">Employees</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-palo-green/10">
                <DollarSign className="w-5 h-5 text-palo-green" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">$48,250</p>
                <p className="text-sm text-muted-foreground">Next Payroll</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-palo-amber/10">
                <Calendar className="w-5 h-5 text-palo-amber" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">Dec 20</p>
                <p className="text-sm text-muted-foreground">Pay Date</p>
              </div>
            </div>
          </div>
        </div>

        {/* Employee List */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Team Members</h2>
          </div>
          <div className="divide-y divide-border">
            {/* Sarah Chen - Target Employee */}
            <div className="px-6 py-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full prisma-accent-gradient flex items-center justify-center">
                  <span className="text-white font-medium">SC</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">Office Manager</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">$5,200/mo</p>
                  <p className="text-sm text-muted-foreground">Salary</p>
                </div>
                <div className="w-64">
                  <label className="text-xs text-muted-foreground block mb-1">Bank Account</label>
                  <div
                    onClick={handleBankFieldClick}
                    className={cn(
                      "px-3 py-2 rounded-lg border flex items-center gap-2 cursor-pointer transition-all",
                      payrollLockEnabled
                        ? "bg-muted border-border hover:border-primary"
                        : "bg-background border-input"
                    )}
                  >
                    {payrollLockEnabled && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
                    <span className="text-sm text-foreground font-mono">•••• •••• 7890</span>
                    <span className="text-xs text-primary ml-auto">Edit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Employees */}
            {[
              { initials: "JD", name: "James Davis", role: "Dentist", salary: "$12,500/mo" },
              { initials: "MR", name: "Maria Rodriguez", role: "Dental Hygienist", salary: "$4,800/mo" },
              { initials: "TW", name: "Tyler Williams", role: "Dental Assistant", salary: "$3,200/mo" },
            ].map((employee) => (
              <div key={employee.initials} className="px-6 py-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground font-medium">{employee.initials}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{employee.name}</p>
                    <p className="text-sm text-muted-foreground">{employee.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{employee.salary}</p>
                    <p className="text-sm text-muted-foreground">Salary</p>
                  </div>
                  <div className="w-64">
                    <label className="text-xs text-muted-foreground block mb-1">Bank Account</label>
                    <div className="px-3 py-2 rounded-lg bg-muted border border-border">
                      <span className="text-sm text-foreground font-mono">•••• •••• ****</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Biometric Auth Modal */}
      {showAuthModal && (
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 backdrop-blur-sm animate-fade-up">
          <div className="glass-overlay rounded-2xl p-6 max-w-sm mx-4 animate-scale-in">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Fingerprint className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Biometric Auth Required</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Editing banking details requires additional verification to protect your employees.
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleDismiss}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 prisma-accent-gradient hover:opacity-90"
                onClick={handleDismiss}
              >
                <Fingerprint className="w-4 h-4 mr-2" />
                Authenticate
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
