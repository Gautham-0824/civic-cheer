import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Camera, 
  Upload, 
  MapPin, 
  CheckCircle,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportIssue = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    photo: null as File | null,
    category: "",
    description: "",
    location: "Current Location",
    address: "123 Main Street, City"
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    "Infrastructure",
    "Sanitation", 
    "Street Lighting",
    "Traffic Issues",
    "Waste Management",
    "Public Safety",
    "Other"
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      setCurrentStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!formData.category || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report Submitted!",
        description: "We've received your complaint and will review it soon",
        className: "bg-primary text-primary-foreground"
      });
      navigate("/dashboard");
    }, 2000);
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-6">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${currentStep >= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
            `}
          >
            {currentStep > step ? <CheckCircle className="h-4 w-4" /> : step}
          </div>
          {step < 4 && (
            <div 
              className={`w-8 h-0.5 mx-1 
                ${currentStep > step ? 'bg-primary' : 'bg-muted'}
              `} 
            />
          )}
        </div>
      ))}
    </div>
  );

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
          <h1 className="text-lg font-bold">Report Issue</h1>
        </div>
      </nav>

      <div className="max-w-md mx-auto p-4 pb-20">
        <StepIndicator />

        {/* Step 1: Photo Upload */}
        {currentStep === 1 && (
          <Card className="card-mobile">
            <CardHeader>
              <CardTitle className="text-center text-mobile-subtitle text-accent">
                Add Photo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-24 h-24 bg-primary/10 border-2 border-dashed border-primary rounded-xl flex items-center justify-center">
                  <Camera className="h-12 w-12 text-primary" />
                </div>
                <p className="text-mobile-body text-secondary">
                  Take a clear photo of the issue to help us understand the problem better
                </p>
              </div>

              <div className="space-y-3">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Button 
                    className="w-full btn-touch text-mobile-body font-semibold shadow-button"
                    asChild
                  >
                    <span>
                      <Camera className="h-5 w-5 mr-2" />
                      Take Photo
                    </span>
                  </Button>
                </label>

                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Button 
                    variant="outline"
                    className="w-full btn-touch text-mobile-body"
                    asChild
                  >
                    <span>
                      <Upload className="h-5 w-5 mr-2" />
                      Upload from Gallery
                    </span>
                  </Button>
                </label>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Category and Description */}
        {currentStep === 2 && (
          <Card className="card-mobile">
            <CardHeader>
              <CardTitle className="text-center text-mobile-subtitle text-accent">
                Describe the Issue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-mobile-body font-medium text-accent">
                  Category *
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="btn-touch">
                    <SelectValue placeholder="Select issue category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-mobile-body font-medium text-accent">
                  Description *
                </label>
                <Textarea
                  placeholder="Describe the issue in detail..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-24 resize-none"
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 btn-touch"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  disabled={!formData.category || !formData.description}
                  className="flex-1 btn-touch text-mobile-body font-semibold shadow-button"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Location */}
        {currentStep === 3 && (
          <Card className="card-mobile">
            <CardHeader>
              <CardTitle className="text-center text-mobile-subtitle text-accent">
                Confirm Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="h-8 w-8 text-primary mx-auto" />
                    <p className="text-mobile-body font-medium text-accent">Interactive Map</p>
                    <p className="text-mobile-caption text-secondary">
                      Pin your exact location
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-mobile-body font-medium text-accent">
                    Address
                  </label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="btn-touch"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 btn-touch"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(4)}
                  className="flex-1 btn-touch text-mobile-body font-semibold shadow-button"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Review and Submit */}
        {currentStep === 4 && (
          <Card className="card-mobile">
            <CardHeader>
              <CardTitle className="text-center text-mobile-subtitle text-accent">
                Review & Submit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Camera className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-mobile-body font-medium text-accent">Photo attached</p>
                    <p className="text-mobile-caption">Ready for submission</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-mobile-body font-medium text-accent">Category:</p>
                  <p className="text-mobile-body text-secondary">{formData.category}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-mobile-body font-medium text-accent">Description:</p>
                  <p className="text-mobile-body text-secondary">{formData.description}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-mobile-body font-medium text-accent">Location:</p>
                  <p className="text-mobile-body text-secondary">{formData.address}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(3)}
                  disabled={isSubmitting}
                  className="flex-1 btn-touch"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 btn-touch text-mobile-body font-semibold shadow-button"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReportIssue;