import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const phoneNumber = location.state?.phoneNumber || "";

  useEffect(() => {
    if (!phoneNumber) {
      navigate("/");
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [phoneNumber, navigate]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Incomplete OTP",
        description: "Please enter all 6 digits",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (otp === "123456") { // Demo OTP
        toast({
          title: "Welcome!",
          description: "Phone number verified successfully",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please check the code and try again",
          variant: "destructive"
        });
        setOtp("");
      }
    }, 1500);
  };

  const handleResendOTP = () => {
    if (timer > 0) return;
    
    setTimer(60);
    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-mobile-title text-accent">Verify Phone</h1>
        </div>

        {/* Verification Card */}
        <Card className="card-mobile">
          <CardContent className="pt-6 space-y-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-mobile-subtitle text-accent">
                  Enter verification code
                </h2>
                <p className="text-mobile-body text-secondary">
                  We've sent a 6-digit code to
                </p>
                <p className="text-mobile-body font-medium text-accent">
                  +91 {phoneNumber.slice(-10).replace(/(\d{5})(\d{5})/, '$1 $2')}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 6}
                className="w-full btn-touch text-mobile-body font-semibold shadow-button transition-smooth"
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </Button>
            </div>

            <div className="text-center space-y-2">
              <p className="text-mobile-caption">
                Didn't receive the code?
              </p>
              <Button
                variant="ghost"
                onClick={handleResendOTP}
                disabled={timer > 0}
                className="text-primary font-medium"
              >
                {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-mobile-caption">
          For demo purposes, use OTP: <span className="font-mono font-medium">123456</span>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;