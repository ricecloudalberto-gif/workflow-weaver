import { StatsCard } from "@/components/dashboard/StatsCard";
import { MiniChart } from "@/components/dashboard/MiniChart";
import { DonutChart, DonutLegend } from "@/components/dashboard/DonutChart";
import { ActivityList } from "@/components/dashboard/ActivityList";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { Heart, MessageSquare, Link as LinkIcon, FileText } from "lucide-react";
import { useState } from "react";

const chartData = [45, 52, 38, 65, 48, 72, 58, 80, 65, 75, 68, 82];
const donutData = [
  { label: "Success", value: 80, color: "hsl(350, 85%, 60%)" },
  { label: "Pending", value: 15, color: "hsl(25, 95%, 65%)" },
  { label: "Failed", value: 5, color: "hsl(45, 90%, 55%)" },
];

const weeklyData = [
  { day: "M", primary: 45, secondary: 12 },
  { day: "T", primary: 52, secondary: 8 },
  { day: "W", primary: 65, secondary: 15 },
  { day: "T", primary: 48, secondary: 5 },
  { day: "F", primary: 72, secondary: 10 },
  { day: "S", primary: 38, secondary: 6 },
  { day: "S", primary: 25, secondary: 3 },
];

const activityItems = [
  {
    id: "1",
    title: "Jira → Slack Notification",
    subtitle: "Workflow execution",
    category: "Workflow",
    views: "7.2k",
    change: 4,
  },
  {
    id: "2",
    title: "Gmail to Sheets Sync",
    subtitle: "Data synchronization",
    category: "Sync",
    views: "3.8k",
    change: 5,
  },
  {
    id: "3",
    title: "GitHub PR → Notion",
    subtitle: "Development automation",
    category: "Dev",
    views: "2.1k",
    change: 6,
  },
  {
    id: "4",
    title: "Stripe Payment Alert",
    subtitle: "Financial notification",
    category: "Finance",
    views: "1.4k",
    change: -8,
  },
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("Workflows");

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Executions"
          value="23.0K"
          variant="gradient"
          breakdown={[
            { label: "Success", value: 80 },
            { label: "Pending", value: 15 },
            { label: "Failed", value: 5 },
          ]}
          chart={<MiniChart data={chartData} color="white" height={50} />}
        />

        <StatsCard
          title="Active Workflows"
          value="20.8k"
          change={12}
          chart={
            <div className="flex items-center gap-4">
              <DonutChart data={donutData} size={80} strokeWidth={10} />
              <DonutLegend data={donutData} />
            </div>
          }
        />

        <div className="space-y-4">
          <div className="bg-card rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl gradient-coral flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3.2k</p>
                <p className="text-sm text-muted-foreground">API Calls</p>
              </div>
            </div>
            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-3/4 gradient-coral rounded-full" />
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl gradient-sunset flex items-center justify-center">
                <LinkIcon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">10.5k</p>
                <p className="text-sm text-muted-foreground">Data Synced</p>
              </div>
            </div>
            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-2/3 gradient-sunset rounded-full" />
            </div>
          </div>
        </div>

        <WeeklyChart title="Execution Stats" data={weeklyData} />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityList
            items={activityItems}
            title="Recent Activity"
            tabs={["Workflows", "Integrations"]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        <div className="space-y-4">
          <div className="bg-card rounded-2xl border border-border shadow-card p-5">
            <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Completed</p>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">874</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Credits Used</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">2.4k</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-card p-5">
            <h3 className="font-semibold text-foreground mb-2">Plan Usage</h3>
            <p className="text-sm text-muted-foreground mb-4">Pro Plan • 15 days left</p>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Executions</span>
                  <span className="font-medium">8,240 / 10,000</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[82%] gradient-coral rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Data Transfer</span>
                  <span className="font-medium">3.2 / 5 GB</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[64%] gradient-sunset rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
