import React from 'react';
import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, DollarSign, AlertTriangle, Calendar, TrendingUp } from 'lucide-react';
import { mockProperties, mockTenants, mockPayments, mockInvoices } from '@/lib/data';

export const DashboardHome: React.FC = () => {
  const { user } = useAuth();

  // Calculate stats
  const totalProperties = mockProperties.length;
  const occupiedProperties = mockProperties.filter(p => p.status === 'occupied').length;
  const totalTenants = mockTenants.filter(t => t.status === 'active').length;
  const overduePayments = mockPayments.filter(p => p.status === 'overdue').length;
  const totalRentDue = mockInvoices
    .filter(i => i.status === 'pending')
    .reduce((sum, i) => sum + i.amount, 0);

  // Tenant-specific data
  const tenantData = user?.tenantId ? mockTenants.find(t => t.id === user.tenantId) : null;
  const tenantProperty = tenantData ? mockProperties.find(p => p.id === tenantData.propertyId) : null;
  const tenantPayments = user?.tenantId ? mockPayments.filter(p => p.tenantId === user.tenantId) : [];
  const nextRentDue = user?.tenantId ? mockInvoices.find(i => i.tenantId === user.tenantId && i.status === 'pending') : null;

  if (user?.role === 'tenant') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, {user.name}!</h2>
          <p className="text-muted-foreground">Here's an overview of your rental information.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Rent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${tenantData?.rentAmount || 0}</div>
              <p className="text-xs text-muted-foreground">Monthly payment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {nextRentDue ? new Date(nextRentDue.dueDate).toLocaleDateString() : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">Due date</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Badge variant={nextRentDue?.status === 'pending' ? 'secondary' : 'default'}>
                  {nextRentDue?.status || 'Current'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Current status</p>
            </CardContent>
          </Card>
        </div>

        {tenantProperty && (
          <Card>
            <CardHeader>
              <CardTitle>Your Property</CardTitle>
              <CardDescription>Details about your rental property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">{tenantProperty.name}</h3>
                  <p className="text-muted-foreground">{tenantProperty.address}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Type:</span>
                    <p className="capitalize">{tenantProperty.type}</p>
                  </div>
                  <div>
                    <span className="font-medium">Bedrooms:</span>
                    <p>{tenantProperty.bedrooms}</p>
                  </div>
                  <div>
                    <span className="font-medium">Bathrooms:</span>
                    <p>{tenantProperty.bathrooms}</p>
                  </div>
                  <div>
                    <span className="font-medium">Rent:</span>
                    <p>${tenantProperty.rent}/month</p>
                  </div>
                </div>
                {tenantProperty.amenities.length > 0 && (
                  <div>
                    <span className="font-medium">Amenities:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tenantProperty.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline">{amenity}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">Here's what's happening with your properties today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              {occupiedProperties} occupied
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTenants}</div>
            <p className="text-xs text-muted-foreground">Currently renting</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRentDue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Pending this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Payments</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overduePayments}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Properties</CardTitle>
            <CardDescription>Your latest property additions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProperties.slice(0, 3).map((property) => (
                <div key={property.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{property.name}</p>
                    <p className="text-sm text-muted-foreground">{property.address}</p>
                  </div>
                  <Badge variant={property.status === 'occupied' ? 'default' : 'secondary'}>
                    {property.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Latest payment activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPayments.slice(0, 3).map((payment) => {
                const tenant = mockTenants.find(t => t.id === payment.tenantId);
                return (
                  <div key={payment.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{tenant?.name}</p>
                      <p className="text-sm text-muted-foreground">{payment.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${payment.amount}</p>
                      <Badge variant={payment.status === 'paid' ? 'default' : payment.status === 'overdue' ? 'destructive' : 'secondary'}>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};