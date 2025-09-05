import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Camera, 
  User, 
  Plus, 
  Clock, 
  MapPin, 
  FileText,
  HelpCircle,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data for recent reports
  const recentReports = [
    {
      id: 1,
      title: "Broken streetlight",
      location: "Main Street & 5th Ave",
      status: "acknowledged" as const,
      date: "2 days ago",
      image: "streetlight.jpg"
    },
    {
      id: 2,
      title: "Pothole on road",
      location: "Park Avenue",
      status: "new" as const,
      date: "1 week ago",
      image: "pothole.jpg"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-status-new';
      case 'acknowledged': return 'bg-status-acknowledged';
      case 'resolved': return 'bg-status-resolved';
      default: return 'bg-muted';
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="bg-accent text-accent-foreground p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold">CityReport</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-8 w-8 text-accent-foreground hover:bg-accent-foreground/20"
            >
              <LogOut className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="max-w-md mx-auto p-4 space-y-6 pb-20">
        {/* Main CTA */}
        <Card className="card-mobile bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Camera className="h-8 w-8 text-primary-foreground" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-mobile-title text-accent">
                Report an Issue
              </h2>
              <p className="text-mobile-body text-secondary">
                Tap to take a photo and submit
              </p>
            </div>

            <Button
              onClick={() => navigate("/report")}
              className="btn-touch text-mobile-body font-semibold shadow-button transition-smooth w-full"
            >
              <Plus className="h-5 w-5 mr-2" />
              Start New Report
            </Button>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-mobile-subtitle text-accent">Recent Reports</h3>
            <Button
              variant="ghost"
              onClick={() => navigate("/reports")}
              className="text-primary font-medium"
            >
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {recentReports.map((report) => (
              <Card key={report.id} className="card-mobile">
                <CardContent className="pt-4">
                  <div className="flex space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Camera className="h-6 w-6 text-secondary" />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-mobile-body font-medium text-accent">
                          {report.title}
                        </h4>
                        <Badge 
                          className={`${getStatusColor(report.status)} text-white text-xs px-2 py-1`}
                        >
                          {report.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-mobile-caption">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{report.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{report.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Guided Tour Card */}
        <Card className="card-mobile bg-secondary/5 border-secondary/20">
          <CardContent className="pt-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <HelpCircle className="h-5 w-5 text-secondary-foreground" />
              </div>
              
              <div className="flex-1 space-y-2">
                <h4 className="text-mobile-body font-medium text-accent">
                  How to submit a report
                </h4>
                <p className="text-mobile-caption">
                  Learn how to effectively report city issues and track their progress
                </p>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="text-secondary border-secondary hover:bg-secondary hover:text-secondary-foreground"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;