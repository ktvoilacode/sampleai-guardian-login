
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Mail, Eye, EyeOff, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  
  // New validation states
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  
  // Password strength indicators
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateEmail = (email: string) => {
    if (!email) return false;
    
    // Check if email contains @ symbol
    if (!email.includes("@")) return false;
    
    // Get domain part after @
    const domain = email.split("@")[1];
    
    // Check if domain is a common personal email provider
    const personalDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com", "icloud.com"];
    return !personalDomains.includes(domain);
  };

  // Check password strength whenever password changes
  useEffect(() => {
    setHasUpperCase(/[A-Z]/.test(password));
    setHasNumber(/\d/.test(password));
    setHasMinLength(password.length >= 8);
    
    // Calculate strength percentage (0-100)
    const strengthChecks = [/[A-Z]/.test(password), /\d/.test(password), password.length >= 8];
    const passedChecks = strengthChecks.filter(Boolean).length;
    setPasswordStrength((passedChecks / strengthChecks.length) * 100);
    
    // Check if passwords match whenever password changes
    if (confirmPasswordTouched) {
      setPasswordsMatch(password === confirmPassword);
    }
  }, [password, confirmPassword, confirmPasswordTouched]);

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailValid(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordTouched(true);
    setPasswordsMatch(password === confirmPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset any previous errors
    setError("");

    // Validate full name
    if (fullName.trim().length < 3) {
      setError("Full name must be at least 3 characters");
      return;
    }
    
    // Validate email
    if (!validateEmail(email)) {
      setError("Only company email addresses are allowed. Please use your work email.");
      return;
    }
    
    // Validate password
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    
    // Check if password contains at least one number and one letter
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      setError("Password must contain at least one number and one letter");
      return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    // Check if terms are accepted
    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }
    
    // If all validations pass, show success dialog
    setSuccessDialogOpen(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Welcome to TruxtedAI</h1>
          <p className="text-xl text-white/80">Intelligent solutions for your business</p>
        </div>
      </div>
      
      {/* Right side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 rounded-md p-2">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">TruxtedAI</span>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
            <p className="text-gray-600 mt-2">Join TruxtedAI to access intelligent business solutions</p>
          </div>
          
          <Card className="border shadow-md bg-white">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-700">Full Name</Label>
                  <Input 
                    id="fullName" 
                    type="text" 
                    placeholder="John Doe" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="border-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                    required
                    className={`border-gray-300 ${emailTouched && !emailValid ? 'border-2 border-red-500' : ''}`}
                  />
                  {emailTouched && !emailValid && (
                    <div className="text-red-500 text-sm flex items-center gap-1 mt-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Only company email addresses are allowed</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">Only company email addresses are allowed</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={handlePasswordBlur}
                      required
                      className="border-gray-300 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  
                  {/* Password strength indicators */}
                  {passwordTouched && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-md border">
                      <div className="mb-2">
                        <Progress value={passwordStrength} className="h-2" />
                      </div>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${hasUpperCase ? 'bg-green-500' : 'bg-red-500'}`}>
                            {hasUpperCase && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span>At least one uppercase letter</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${hasNumber ? 'bg-green-500' : 'bg-red-500'}`}>
                            {hasNumber && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span>At least one number</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${hasMinLength ? 'bg-green-500' : 'bg-red-500'}`}>
                            {hasMinLength && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span>At least 8 characters</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                  <div className="relative">
                    <Input 
                      id="confirmPassword" 
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={handleConfirmPasswordBlur}
                      required
                      className={`border-gray-300 pr-10 ${confirmPasswordTouched && !passwordsMatch ? 'border-2 border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {confirmPasswordTouched && !passwordsMatch && (
                    <div className="text-red-500 text-sm flex items-center gap-1 mt-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Passwords do not match</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)} 
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
                  </label>
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Sign Up</Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/" className="text-blue-600 hover:underline">
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registration Successful!</DialogTitle>
            <DialogDescription>
              Thank you for registering with TruxtedAI. Your account has been created successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setSuccessDialogOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUp;
