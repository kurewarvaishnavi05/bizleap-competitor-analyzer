"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Bell, Shield, CreditCard, Key } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        <aside className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" /> Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <Shield className="mr-2 h-4 w-4" /> Security
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <Key className="mr-2 h-4 w-4" /> API Keys
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <CreditCard className="mr-2 h-4 w-4" /> Billing
          </Button>
        </aside>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue="john.doe@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input defaultValue="Acme Corp" />
              </div>
            </CardContent>
            <CardFooter className="border-t border-border pt-4">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your platform experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Reports</p>
                  <p className="text-sm text-muted-foreground">Receive weekly competitive intelligence summaries.</p>
                </div>
                <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer">
                  <div className="h-4 w-4 bg-white rounded-full absolute right-1 top-1"></div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-medium">Competitor Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when tracked competitors change pricing.</p>
                </div>
                <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer">
                  <div className="h-4 w-4 bg-white rounded-full absolute right-1 top-1"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
