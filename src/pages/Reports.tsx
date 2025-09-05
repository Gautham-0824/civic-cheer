import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  Camera, 
  MapPin, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Eye
} from "lucide-react";

const Reports = () => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Mock reports data
  const reports = [
    {
      id: 1,
      title: "Broken streetlight",
      category: "Street Lighting",
      location: "Main Street & 5th Ave",
      status: "acknowledged" as const,
      date: "2024-01-15",
      description: "The streetlight has been flickering and finally went out completely yesterday evening.",
      timeline: [
        { status: "Submitted", date: "2024-01-15", completed: true },
        { status: "Acknowledged", date: "2024-01-16", completed: true },
        { status: "Resolved", date: null, completed: false }
      ]
    },
    {
      id: 2,
      title: "Pothole on main road",
      category: "Infrastructure", 
      location: "Park Avenue",
      status: "new" as const,
      date: "2024-01-10",
      description: "Large pothole causing damage to vehicles and creating safety hazards.",
      timeline: [
        { status: "Submitted", date: "2024-01-10", completed: true },
        { status: "Acknowledged", date: null, completed: false },
        { status: "Resolved", date: null, completed: false }
      ]
    },
    {
      id: 3,
      title: "Overflowing garbage bin",
      category: "Sanitation",
      location: "City Park Entrance",
      status: "resolved" as const,
      date: "2024-01-05",
      description: "Garbage bin near park entrance is overflowing and attracting pests.",
      timeline: [
        { status: "Submitted", date: "2024-01-05", completed: true },
        { status: "Acknowledged", date: "2024-01-06", completed: true },
        { status: "Resolved", date: "2024-01-08", completed: true }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-status-new text-white';
      case 'acknowledged': return 'bg-status-acknowledged text-white';
      case 'resolved': return 'bg-status-resolved text-accent';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="h-4 w-4" />;
      case 'acknowledged': return <Eye className="h-4 w-4" />;
      case 'resolved': return <CheckCircle2 className="h-4 w-4" />;
      default: return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="bg-accent text-accent-foreground p-4">
        <div className="max-w-md mx-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="h-8 w-8 text-accent-foreground hover:bg-accent-foreground/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">My Reports</h1>
        </div>
      </nav>

      <div className="max-w-md mx-auto p-4 pb-20">
        <div className="space-y-3">
          {reports.map((report) => (
            <Card 
              key={report.id} 
              className="card-mobile cursor-pointer hover:shadow-lg transition-smooth"
              onClick={() => setSelectedReport(report)}
            >
              <CardContent className="pt-4">
                <div className="flex space-x-3">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Camera className="h-6 w-6 text-secondary" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="text-mobile-body font-medium text-accent">
                        {report.title}
                      </h3>
                      <Badge className={`${getStatusColor(report.status)} text-xs px-2 py-1 flex items-center space-x-1`}>
                        {getStatusIcon(report.status)}
                        <span>{report.status}</span>
                      </Badge>
                    </div>
                    
                    <p className="text-mobile-caption text-secondary">
                      {report.category}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-mobile-caption">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{report.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{getRelativeTime(report.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {reports.length === 0 && (
          <div className="text-center py-12 space-y-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Camera className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-mobile-subtitle text-accent">No reports yet</h3>
              <p className="text-mobile-body text-secondary">
                Start by reporting your first city issue
              </p>
            </div>
            <Button
              onClick={() => navigate("/report")}
              className="btn-touch text-mobile-body font-semibold shadow-button"
            >
              Report an Issue
            </Button>
          </div>
        )}
      </div>

      {/* Report Detail Modal */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-mobile-subtitle text-accent">
              Report Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedReport && (
            <div className="space-y-6">
              {/* Photo */}
              <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                <Camera className="h-8 w-8 text-secondary" />
              </div>

              {/* Basic Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-mobile-body font-medium text-accent">
                    {selectedReport.title}
                  </h3>
                  <Badge className={`${getStatusColor(selectedReport.status)} text-xs px-2 py-1`}>
                    {selectedReport.status}
                  </Badge>
                </div>
                
                <p className="text-mobile-body text-secondary">
                  {selectedReport.description}
                </p>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-mobile-caption">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedReport.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-mobile-caption">
                    <Clock className="h-4 w-4" />
                    <span>Submitted {formatDate(selectedReport.date)}</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                <h4 className="text-mobile-body font-medium text-accent">Progress</h4>
                <div className="space-y-3">
                  {selectedReport.timeline.map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        item.completed ? 'bg-primary' : 'bg-muted'
                      }`}>
                        {item.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-mobile-caption font-medium ${
                          item.completed ? 'text-accent' : 'text-muted-foreground'
                        }`}>
                          {item.status}
                        </p>
                        {item.date && (
                          <p className="text-xs text-muted-foreground">
                            {formatDate(item.date)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;