import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Invoice, mockTenants, mockProperties } from '@/lib/data';
import { Calendar, DollarSign, FileText } from 'lucide-react';

interface InvoiceDetailProps {
  invoice: Invoice;
}

export const InvoiceDetail: React.FC<InvoiceDetailProps> = ({ invoice }) => {
  const tenant = mockTenants.find(t => t.id === invoice.tenantId);
  const property = mockProperties.find(p => p.id === invoice.propertyId);

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Invoice INV-{invoice.id}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Generated on {new Date(invoice.issueDate).toLocaleDateString()}
          </p>
        </div>
        {getStatusBadge(invoice.status)}
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tenant Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Name:</span>
              <p>{tenant?.name || 'Unknown Tenant'}</p>
            </div>
            <div>
              <span className="font-medium">Email:</span>
              <p>{tenant?.email || 'N/A'}</p>
            </div>
            <div>
              <span className="font-medium">Phone:</span>
              <p>{tenant?.phone || 'N/A'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Property Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Property:</span>
              <p>{property?.name || 'Unknown Property'}</p>
            </div>
            <div>
              <span className="font-medium">Address:</span>
              <p>{property?.address || 'N/A'}</p>
            </div>
            <div>
              <span className="font-medium">Type:</span>
              <p className="capitalize">{property?.type || 'N/A'}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Issue Date:</span>
          <span>{new Date(invoice.issueDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Due Date:</span>
          <span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
        </div>
      </div>

      <Separator />

      {/* Invoice Items */}
      <div>
        <h4 className="font-semibold mb-4">Invoice Items</h4>
        <div className="space-y-2">
          {invoice.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <span>{item.description}</span>
              <span className="font-medium flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                {item.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Total */}
      <div className="flex justify-between items-center text-lg font-semibold">
        <span>Total Amount:</span>
        <span className="flex items-center">
          <DollarSign className="h-5 w-5 mr-1" />
          {invoice.amount.toLocaleString()}
        </span>
      </div>

      {/* Payment Instructions */}
      {invoice.status !== 'paid' && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-base text-blue-800">Payment Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-700">
            <p>Please make payment by the due date to avoid late fees.</p>
            <p className="mt-2">
              <strong>Payment Methods:</strong><br />
              • Online Portal: Log in to your tenant portal<br />
              • Check: Mail to property management office<br />
              • Bank Transfer: Contact office for details
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};