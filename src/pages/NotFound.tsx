import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-4">
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Home className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-mobile-title text-accent">Page Not Found</h1>
          <p className="text-mobile-body text-secondary">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="w-full btn-touch"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </Button>
          
          <Button
            onClick={() => window.location.href = "/dashboard"}
            className="w-full btn-touch text-mobile-body font-semibold shadow-button"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
