'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, TrendingUp, TrendingDown, Users, DollarSign, Activity, Target } from 'lucide-react';

/**
 * Dashboard scene using shadcn/ui components
 * Shows tables, filters, and KPI tiles as specified in the PRD
 * All styling is themeable via CSS variables
 */
export function DashboardScene() {
  const kpiData = [
    { 
      title: 'Total Revenue', 
      value: '$45,231', 
      change: '+20.1%', 
      trend: 'up',
      icon: DollarSign,
      description: 'Total revenue this month'
    },
    { 
      title: 'Subscriptions', 
      value: '+2,350', 
      change: '+180.1%', 
      trend: 'up',
      icon: Users,
      description: 'New subscriptions'
    },
    { 
      title: 'Active Users', 
      value: '+12,234', 
      change: '+19%', 
      trend: 'up',
      icon: Activity,
      description: 'Active users this month'
    },
    { 
      title: 'Conversion Rate', 
      value: '3.24%', 
      change: '-1.2%', 
      trend: 'down',
      icon: Target,
      description: 'Conversion rate'
    }
  ];

  const tableData = [
    { 
      id: 1, 
      name: 'Acme Corp', 
      email: 'contact@acme.com',
      status: 'Active', 
      revenue: '$12,000', 
      growth: '+12%',
      lastSeen: '2 hours ago'
    },
    { 
      id: 2, 
      name: 'TechStart Inc', 
      email: 'hello@techstart.com',
      status: 'Pending', 
      revenue: '$8,500', 
      growth: '+8%',
      lastSeen: '1 day ago'
    },
    { 
      id: 3, 
      name: 'Global Solutions', 
      email: 'info@globalsolutions.com',
      status: 'Active', 
      revenue: '$15,200', 
      growth: '+15%',
      lastSeen: '3 hours ago'
    },
    { 
      id: 4, 
      name: 'Innovation Labs', 
      email: 'team@innovationlabs.com',
      status: 'Inactive', 
      revenue: '$3,800', 
      growth: '-2%',
      lastSeen: '1 week ago'
    },
    { 
      id: 5, 
      name: 'Future Systems', 
      email: 'hello@futuresystems.com',
      status: 'Active', 
      revenue: '$22,100', 
      growth: '+22%',
      lastSeen: '5 hours ago'
    }
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 
          className="text-3xl font-bold"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Dashboard
        </h1>
        <p 
          className="text-muted-foreground mt-2"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Overview of key metrics and business performance
        </p>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kpiData.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="theme-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle 
                  className="text-sm font-medium text-muted-foreground"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {kpi.title}
                </CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div 
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {kpi.value}
                </div>
                <div 
                  className="text-xs text-muted-foreground mt-1"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {kpi.description}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-accent" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-accent" />
                  )}
                  <span 
                    className="text-xs text-primary"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {kpi.change} from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters and Table Section */}
      <Card className="theme-shadow">
        <CardHeader>
          <CardTitle 
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Customer Performance
          </CardTitle>
          <CardDescription 
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Detailed view of customer metrics and revenue data
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input 
                placeholder="Search customers..." 
                className="max-w-sm"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="revenue">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table using shadcn/ui Table component */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Customer
                  </TableHead>
                  <TableHead 
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Status
                  </TableHead>
                  <TableHead 
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Revenue
                  </TableHead>
                  <TableHead 
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Growth
                  </TableHead>
                  <TableHead 
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Last Seen
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div>
                        <div 
                          className="font-medium"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          {row.name}
                        </div>
                        <div 
                          className="text-sm text-muted-foreground"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          {row.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={row.status === 'Active' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell 
                      className="font-medium"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {row.revenue}
                    </TableCell>
                    <TableCell>
                      <span 
                        className={row.growth.startsWith('+') ? 'text-primary' : 'text-destructive'}
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {row.growth}
                      </span>
                    </TableCell>
                    <TableCell 
                      className="text-muted-foreground"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {row.lastSeen}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel 
                            style={{ fontFamily: 'var(--font-sans)' }}
                          >
                            Actions
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            style={{ fontFamily: 'var(--font-sans)' }}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            style={{ fontFamily: 'var(--font-sans)' }}
                          >
                            Edit Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            style={{ fontFamily: 'var(--font-sans)' }}
                          >
                            Delete Customer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div 
              className="text-sm text-muted-foreground"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Showing 1 to 5 of 5 results
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
