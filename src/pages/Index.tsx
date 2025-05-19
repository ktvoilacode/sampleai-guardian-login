
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Mail, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Index component represents the main login page for the AI Platfrom application.
 * It includes form inputs for email and password, with validation for company email addresses.
 * The component handles user interactions such as showing/hiding password visibility,
 * validating input fields, and managing dialog states for login success and password reset.
 * 
 * State:
 * - email, password: Stores user input for login credentials.
 * - rememberMe: Boolean for "Remember me" checkbox state.
 * - error: String for displaying error messages.
 * - showPassword: Boolean to toggle password visibility.
 * - successDialogOpen: Boolean to manage login success dialog visibility.
 * - forgotPasswordDialogOpen: Boolean to manage forgot password dialog visibility.
 * - resetEmail, resetEmailSent, resetEmailError: State for handling password reset functionality.
 * - emailTouched, emailValid, passwordTouched, hasMinLength, passwordStrength, resetEmailTouched, resetEmailValid: Validation and UI feedback states.
 * 
 * Methods:
 * - validateEmail: Validates email format and checks for non-personal domains.
 * - handleEmailBlur, handlePasswordBlur, handleResetEmailBlur: Handlers for input blur events to update validation states.
 * - handleSubmit: Form submission handler for login.
 * - handleResetPassword: Form submission handler for password reset.
 * - togglePasswordVisibility: Toggles password input visibility.
 * - handleForgotPasswordClick, closeForgotPasswordDialog: Handlers for managing forgot password dialog state.
 */

/*******  69fdb01a-6e58-4a0c-8c35-8844c8c4ee76  *******/
const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetEmailError, setResetEmailError] = useState("");
  
  // New validation states
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [resetEmailTouched, setResetEmailTouched] = useState(false);
  const [resetEmailValid, setResetEmailValid] = useState(true);

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
  
  // Check password strength whenever it changes
  useEffect(() => {
    setHasMinLength(password.length >= 8);
    
    // Simple strength check for login (just based on length)
    setPasswordStrength(password.length >= 8 ? 100 : (password.length / 8) * 100);
  }, [password]);

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailValid(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  const handleResetEmailBlur = () => {
    setResetEmailTouched(true);
    setResetEmailValid(validateEmail(resetEmail));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError("Only company email addresses are allowed. Please use your work email.");
      return;
    }
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    
    setError("");
    setSuccessDialogOpen(true);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setResetEmailError("Please enter your email address");
      return;
    }
    
    if (!validateEmail(resetEmail)) {
      setResetEmailError("Only company email addresses are allowed. Please use your work email.");
      return;
    }
    
    setResetEmailError("");
    setResetEmailSent(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setForgotPasswordDialogOpen(true);
  };

  const closeForgotPasswordDialog = () => {
    setForgotPasswordDialogOpen(false);
    setResetEmail("");
    setResetEmailSent(false);
    setResetEmailError("");
    setResetEmailTouched(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Welcome to AI Platfrom</h1>
          <p className="text-xl text-white/80">Intelligent solutions for your business</p>
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 rounded-md p-2">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">AI Platfrom</span>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
            <p className="text-gray-600 mt-2">Please sign in to continue to AI Platfrom</p>
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-700">Password</Label>
                    <a href="#" onClick={handleForgotPasswordClick} className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                  </div>
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
                  
                  {/* Simple password strength indicator */}
                  {passwordTouched && password.length > 0 && (
                    <div className="mt-2">
                      <Progress 
                        value={passwordStrength} 
                        className="h-1" 
                      />
                      {!hasMinLength && (
                        <p className="text-xs text-red-500 mt-1">Password must be at least 8 characters</p>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)} 
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Sign In</Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Sign up
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
            <DialogTitle>Login Successful!</DialogTitle>
            <DialogDescription>
              You have successfully logged in to your AI Platfrom account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setSuccessDialogOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotPasswordDialogOpen} onOpenChange={setForgotPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{resetEmailSent ? "Password Reset Email Sent" : "Forgot Password"}</DialogTitle>
            <DialogDescription>
              {resetEmailSent 
                ? "We've sent a password reset link to your email address. Please check your inbox." 
                : "Enter your email address and we'll send you a link to reset your password."}
            </DialogDescription>
          </DialogHeader>
          
          {!resetEmailSent ? (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                {resetEmailError && (
                  <Alert variant="destructive" className="mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{resetEmailError}</AlertDescription>
                  </Alert>
                )}
                
                <Label htmlFor="resetEmail" className="text-gray-700">Email Address</Label>
                <Input 
                  id="resetEmail" 
                  type="email" 
                  placeholder="name@company.com" 
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  onBlur={handleResetEmailBlur}
                  required
                  className={`border-gray-300 ${resetEmailTouched && !resetEmailValid ? 'border-2 border-red-500' : ''}`}
                />
                {resetEmailTouched && !resetEmailValid && (
                  <div className="text-red-500 text-sm flex items-center gap-1 mt-1">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Only company email addresses are allowed</span>
                  </div>
                )}
              </div>
              
              <DialogFooter className="flex gap-2 justify-end">
                <Button variant="outline" type="button" onClick={closeForgotPasswordDialog}>
                  Cancel
                </Button>
                <Button type="submit">
                  Send Reset Link
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="flex justify-end mt-4">
              <Button onClick={closeForgotPasswordDialog}>
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
