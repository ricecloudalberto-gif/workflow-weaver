import { useState, useEffect } from "react";
import { OeeLineChart } from "@/components/oee/OeeLineChart";
import { OeeBarChart } from "@/components/oee/OeeBarChart";
import { OeePieChart } from "@/components/oee/OeePieChart";
import { OeeKpiCard } from "@/components/oee/OeeKpiCard";
import { AlertBanner } from "@/components/oee/AlertBanner";
import { MachineDetailModal } from "@/components/oee/MachineDetailModal";
import { Gauge, Clock, Activity, CheckCircle, Download, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - replace with API calls
const generateOeeTrendData = () => {
  const hours = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
  return hours.map(time => ({
    time,
    oee: 75 + Math.random() * 15,
    availability: 85 + Math.random() * 10,
    performance: 80 + Math.random() * 15,
    quality: 95 + Math.random() * 4,
  }));
};

const machineData = [
  { machine: "CNC-01", oee: 87.5, availability: 92, performance: 95, quality: 99.5, status: "running" as const, operator: "John D.", product: "Part A-123" },
  { machine: "CNC-02", oee: 72.3, availability: 85, performance: 88, quality: 96.5, status: "running" as const, operator: "Jane S.", product: "Part B-456" },
  { machine: "CNC-03", oee: 45.2, availability: 60, performance: 78, quality: 96.5, status: "stopped" as const, operator: "Mike R.", product: "Part C-789" },
  { machine: "Press-01", oee: 91.2, availability: 95, performance: 98, quality: 98, status: "running" as const, operator: "Sarah L.", product: "Component X" },
  { machine: "Press-02", oee: 68.5, availability: 78, performance: 90, quality: 97.5, status: "maintenance" as const },
  { machine: "Assembly", oee: 82.1, availability: 88, performance: 94, quality: 99, status: "running" as const, operator: "Team A", product: "Final Assembly" },
];

const downtimeData = [
  { name: "Planned Maint.", value: 45, color: "hsl(199, 89%, 48%)" },
  { name: "Breakdown", value: 32, color: "hsl(0, 84%, 60%)" },
  { name: "Setup/Changeover", value: 28, color: "hsl(45, 93%, 47%)" },
  { name: "Material Wait", value: 18, color: "hsl(142, 76%, 36%)" },
  { name: "Other", value: 12, color: "hsl(var(--muted-foreground))" },
];

const initialAlerts = [
  { id: "1", type: "critical" as const, message: "OEE dropped below 50%", machine: "CNC-03", value: 45.2, threshold: 50, timestamp: new Date() },
  { id: "2", type: "warning" as const, message: "Performance below target", machine: "CNC-02", value: 88, threshold: 90, timestamp: new Date() },
];

export function Dashboard() {
  const [oeeData, setOeeData] = useState(generateOeeTrendData());
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedMachine, setSelectedMachine] = useState<typeof machineData[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isKioskMode, setIsKioskMode] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOeeData(prev => {
        const newData = [...prev.slice(1)];
        const lastTime = prev[prev.length - 1].time;
        const [hours] = lastTime.split(":").map(Number);
        const newHours = (hours + 1) % 24;
        newData.push({
          time: `${newHours.toString().padStart(2, "0")}:00`,
          oee: 75 + Math.random() * 15,
          availability: 85 + Math.random() * 10,
          performance: 80 + Math.random() * 15,
          quality: 95 + Math.random() * 4,
        });
        return newData;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleDismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const handleMachineClick = (machine: typeof machineData[0]) => {
    setSelectedMachine(machine);
    setModalOpen(true);
  };

  const toggleKioskMode = () => {
    if (!isKioskMode) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsKioskMode(!isKioskMode);
  };

  const currentOee = oeeData[oeeData.length - 1];
  const avgOee = machineData.reduce((sum, m) => sum + m.oee, 0) / machineData.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Production Dashboard</h1>
          <p className="text-muted-foreground">Real-time OEE monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={toggleKioskMode}>
            <Maximize2 className="h-4 w-4" />
            Kiosk
          </Button>
        </div>
      </div>

      {/* Alerts Banner */}
      <AlertBanner
        alerts={alerts}
        onDismiss={handleDismissAlert}
        onDismissAll={() => setAlerts([])}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OeeKpiCard
          title="Overall OEE"
          value={avgOee}
          target={85}
          trend={2.3}
          icon={<Gauge className="h-5 w-5" />}
          variant="default"
        />
        <OeeKpiCard
          title="Availability"
          value={currentOee.availability}
          target={90}
          trend={-1.2}
          icon={<Clock className="h-5 w-5" />}
          variant="availability"
        />
        <OeeKpiCard
          title="Performance"
          value={currentOee.performance}
          target={95}
          trend={3.5}
          icon={<Activity className="h-5 w-5" />}
          variant="performance"
        />
        <OeeKpiCard
          title="Quality"
          value={currentOee.quality}
          target={99}
          trend={0.1}
          icon={<CheckCircle className="h-5 w-5" />}
          variant="quality"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OeeLineChart
          data={oeeData}
          title="OEE Trend (Today)"
          target={85}
        />
        <OeeBarChart
          data={machineData}
          title="Machine Comparison"
          onBarClick={handleMachineClick}
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OeePieChart
            data={downtimeData}
            title="Downtime Pareto"
            totalDowntime={135}
          />
        </div>
        
        <div className="bg-card rounded-2xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Machine Status</h3>
          <div className="space-y-3">
            {machineData.map((machine, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                onClick={() => handleMachineClick(machine)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    machine.status === "running" ? "bg-emerald-500" :
                    machine.status === "stopped" ? "bg-red-500" : "bg-yellow-500"
                  }`} />
                  <span className="font-medium text-foreground">{machine.machine}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${
                    machine.oee >= 85 ? "text-emerald-500" :
                    machine.oee >= 70 ? "text-yellow-500" : "text-red-500"
                  }`}>
                    {machine.oee.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Machine Detail Modal */}
      <MachineDetailModal
        machine={selectedMachine}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
