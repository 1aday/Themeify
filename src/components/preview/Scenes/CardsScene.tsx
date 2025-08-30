'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from '@/components/ui/chart';
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChevronLeft, ChevronRight, Minus, Plus, TrendingUp, Users, Activity, BarChart3, Settings, Bell, Palette, Zap, Calendar, Target, CreditCard } from 'lucide-react';

export function CardsScene() {
  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 2000 },
    { month: 'Apr', revenue: 2780 },
    { month: 'May', revenue: 1890 },
    { month: 'Jun', revenue: 2390 },
  ];

  const exerciseData = [
    { day: 'Mon', current: 45, baseline: 30 },
    { day: 'Tue', current: 52, baseline: 35 },
    { day: 'Wed', current: 85, baseline: 40 },
    { day: 'Thu', current: 38, baseline: 38 },
    { day: 'Fri', current: 65, baseline: 42 },
    { day: 'Sat', current: 72, baseline: 45 },
    { day: 'Sun', current: 58, baseline: 48 },
  ];

  const moveGoalData = [
    { day: 'Mon', calories: 320 },
    { day: 'Tue', calories: 380 },
    { day: 'Wed', calories: 420 },
    { day: 'Thu', calories: 290 },
    { day: 'Fri', calories: 350 },
    { day: 'Sat', calories: 410 },
    { day: 'Sun', calories: 280 },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Component Showcase</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience the beauty of your theme across different UI components
        </p>
      </div>

      {/* Clean 2-Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Revenue Chart Card */}
        <Card className="theme-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Total Revenue</CardTitle>
                <CardDescription>Monthly revenue trends and insights</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">$15,231.89</div>
            <p className="text-sm text-muted-foreground">+20.1% from last month</p>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  theme: {
                    light: "var(--chart-1)",
                    dark: "var(--chart-1)"
                  }
                }
              }}
              className="h-48 w-full"
            >
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--chart-1)" 
                  strokeWidth={3}
                  dot={{ fill: "var(--chart-1)", strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Calendar Card */}
        <Card className="theme-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-secondary text-secondary-foreground">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>June 2025</CardTitle>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button size="sm" variant="outline" className="p-1">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="p-1">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="p-2 text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
              {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                <div 
                  key={day} 
                  className={`p-2 text-sm cursor-pointer rounded-md transition-colors ${
                    day === 5 ? 'bg-accent/20 text-accent-foreground' : 
                    day === 13 ? 'bg-primary text-primary-foreground' : 
                    'hover:bg-muted/50'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exercise Chart Card */}
        <Card className="theme-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Exercise Minutes</CardTitle>
                <CardDescription>Your exercise minutes are ahead of where you normally are</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                current: {
                  label: "Current",
                  theme: {
                    light: "var(--chart-2)",
                    dark: "var(--chart-2)"
                  }
                },
                baseline: {
                  label: "Normal",
                  theme: {
                    light: "var(--chart-3)",
                    dark: "var(--chart-3)"
                  }
                }
              }}
              className="h-48 w-full"
            >
              <LineChart data={exerciseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="current" 
                  stroke="var(--chart-2)" 
                  strokeWidth={3}
                  dot={{ fill: "var(--chart-2)", strokeWidth: 2, r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="baseline" 
                  stroke="var(--chart-3)" 
                  strokeWidth={3}
                  dot={{ fill: "var(--chart-3)", strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Move Goal Card */}
        <Card className="theme-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-secondary text-secondary-foreground">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Move Goal</CardTitle>
                <CardDescription>Set your daily activity goal</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold">350 CALORIES/DAY</div>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Button size="sm" variant="outline" className="p-1">
                  <Minus className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="p-1">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ChartContainer
              config={{
                calories: {
                  label: "Calories",
                  theme: {
                    light: "var(--chart-4)",
                    dark: "var(--chart-4)"
                  }
                }
              }}
              className="h-32 w-full"
            >
              <BarChart data={moveGoalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="calories" 
                  fill="var(--chart-4)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
            <Button className="w-full">Set Goal</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
