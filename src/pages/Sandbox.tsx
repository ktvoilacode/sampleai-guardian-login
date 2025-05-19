
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";

const Sandbox = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [step, setStep] = useState(1);

  const validateEmail = (email: string) => {
    // List of disallowed domains (consumer email providers)
    const disallowedDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com", "protonmail.com", "mail.com"];
    
    const domain = email.split("@")[1];
    
    if (!email) {
      return "Email is required";
    }
    
    if (!email.includes("@") || !domain) {
      return "Please enter a valid email address";
    }
    
    if (disallowedDomains.includes(domain?.toLowerCase())) {
      return "Only corporate emails are allowed";
    }
    
    return "";
  };

  const handleEmailBlur = () => {
    const error = validateEmail(email);
    setEmailError(error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateEmail(email);
    setEmailError(error);
    
    if (error) {
      return;
    }

    // Check for test emails
    if (email === "sample@example.com" || email === "new@example.com") {
      toast({
        title: "Success",
        description: "Code sent successfully. You can enter the code to try out sandbox.",
        variant: "default",
      });
      setStep(2);
    } else {
      // For all other valid corporate emails
      toast({
        title: "Success",
        description: "Code sent successfully to your email. Please check your inbox.",
        variant: "default",
      });
      setStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Header />
      
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Try it for your content</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Email
                </label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                    placeholder="hello@truxt.ai"
                    className={`w-full ${emailError ? "border-red-500" : ""}`}
                  />
                  <Button 
                    type="button" 
                    className="bg-blue-400 hover:bg-blue-500 text-white"
                    onClick={() => {
                      const error = validateEmail(email);
                      if (!error) {
                        toast({
                          title: "Success",
                          description: "Code sent successfully. Please check your email.",
                          variant: "default",
                        });
                      } else {
                        setEmailError(error);
                      }
                    }}
                  >
                    Send Code
                  </Button>
                </div>
                {emailError && (
                  <Alert variant="destructive" className="mt-2 py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{emailError}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Link to your docs, help center, or website
                </label>
                <Input
                  id="website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://docs.example.com"
                  className="w-full"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-400 hover:bg-blue-500 text-white"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
          
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Two Step Setup</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${step === 1 ? "bg-blue-100" : "bg-gray-100"}`}>
                  <div className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Enter details</h3>
                  <p className="text-gray-500">Step 1</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${step === 2 ? "bg-blue-100" : "bg-gray-100"}`}>
                  <div className="h-8 w-8 flex items-center justify-center bg-gray-300 text-white rounded-full">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Get Instance instance ready</h3>
                  <p className="text-gray-500">Step 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sandbox;
