"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LogIn, User, Activity, Target, Brain, Zap, TrendingUp, Shield, Star, ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PageLoader } from "@/components/ui/spinner";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">FitAI</h1>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Profile Button */}
              <div className="md:hidden">
                {session ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                        {session.user?.image ? (
                          <img
                            src={session.user.image}
                            alt="Profile"
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center space-x-2 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                          <Activity className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center space-x-2 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center space-x-2 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                          <Shield className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/api/auth/signout" className="flex items-center space-x-2 text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700">
                          <LogIn className="h-4 w-4" />
                          <span>Sign Out</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link href="/signin">
                      <Button variant="outline" size="sm">Sign In</Button>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm">Get Started</Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center space-x-2">
                      <div className="h-8 w-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                        <Activity className="h-5 w-5 text-white" />
                      </div>
                      <span>FitAI</span>
                    </SheetTitle>
                    <SheetDescription>
                      Navigate through our fitness platform
                    </SheetDescription>
                  </SheetHeader>
                  
                  {/* Mobile Navigation */}
                  <div className="mt-6 space-y-4">
                    <Link href="/" className="block py-2 text-sm font-medium text-gray-700 hover:text-primary">
                      Home
                    </Link>
                    
                    {/* Programs Dropdown */}
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-gray-900">Programs</div>
                      <div className="pl-4 space-y-2">
                        <Link href="/programs/strength" className="block py-2 text-sm text-gray-600 hover:text-primary">
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-primary" />
                            <span>Strength Training</span>
                          </div>
                        </Link>
                        <Link href="/programs/cardio" className="block py-2 text-sm text-gray-600 hover:text-primary">
                          <div className="flex items-center space-x-2">
                            <Zap className="h-4 w-4 text-secondary" />
                            <span>Cardio Programs</span>
                          </div>
                        </Link>
                        <Link href="/programs/flexibility" className="block py-2 text-sm text-gray-600 hover:text-primary">
                          <div className="flex items-center space-x-2">
                            <Activity className="h-4 w-4 text-accent" />
                            <span>Flexibility</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                    
                    {/* Coaching Dropdown */}
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-gray-900">Coaching</div>
                      <div className="pl-4 space-y-2">
                        <Link href="/coaching/ai-trainer" className="block py-2 text-sm text-gray-600 hover:text-primary">
                          <div className="flex items-center space-x-2">
                            <Brain className="h-4 w-4 text-primary" />
                            <span>AI Personal Trainer</span>
                          </div>
                        </Link>
                        <Link href="/coaching/nutrition" className="block py-2 text-sm text-gray-600 hover:text-primary">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-secondary" />
                            <span>Nutrition Coaching</span>
                          </div>
                        </Link>
                        <Link href="/coaching/progress" className="block py-2 text-sm text-gray-600 hover:text-primary">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4 text-accent" />
                            <span>Progress Tracking</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                    
                    <Link href="/membership" className="block py-2 text-sm font-medium text-gray-700 hover:text-primary">
                      Membership
                    </Link>
                    <Link href="/about" className="block py-2 text-sm font-medium text-gray-700 hover:text-primary">
                      About Us
                    </Link>
                  </div>
                  
                  {/* Mobile User Actions */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    {session ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          {session.user?.image ? (
                            <img
                              src={session.user.image}
                              alt="Profile"
                              className="h-8 w-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {session.user?.name || session.user?.email}
                            </div>
                            <div className="text-xs text-gray-500">Signed in</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Link href="/dashboard" className="block py-2 text-sm text-gray-600 hover:text-primary">
                            <div className="flex items-center space-x-2">
                              <Activity className="h-4 w-4" />
                              <span>Dashboard</span>
                            </div>
                          </Link>
                          <Link href="/profile" className="block py-2 text-sm text-gray-600 hover:text-primary">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4" />
                              <span>Profile</span>
                            </div>
                          </Link>
                          <Link href="/settings" className="block py-2 text-sm text-gray-600 hover:text-primary">
                            <div className="flex items-center space-x-2">
                              <Shield className="h-4 w-4" />
                              <span>Settings</span>
                            </div>
                          </Link>
                          <Link href="/api/auth/signout" className="block py-2 text-sm text-red-600 hover:text-red-700">
                            <div className="flex items-center space-x-2">
                              <LogIn className="h-4 w-4" />
                              <span>Sign Out</span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Link href="/signin">
                          <Button variant="outline" className="w-full">
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/signup">
                          <Button className="w-full">
                            Get Started
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/10 data-[state=open]:bg-primary/10">
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary data-[state=open]:bg-primary/10 data-[state=open]:text-primary data-[state=open]:hover:bg-primary/10 data-[state=open]:focus:bg-primary/10">
                      Programs
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[400px]">
                        <div className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/10 p-6 no-underline outline-none focus:shadow-md"
                              href="/programs/strength"
                            >
                              <Target className="h-6 w-6 text-primary" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                Strength Training
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Build muscle and increase strength with our AI-powered strength programs.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </div>
                        <div className="grid gap-3">
                          <NavigationMenuLink asChild>
                            <Link href="/programs/cardio" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                              <div className="text-sm font-medium leading-none">Cardio Programs</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                High-intensity cardio workouts for fat burning.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link href="/programs/flexibility" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                              <div className="text-sm font-medium leading-none">Flexibility</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Yoga and stretching routines for mobility.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary data-[state=open]:bg-primary/10 data-[state=open]:text-primary data-[state=open]:hover:bg-primary/10 data-[state=open]:focus:bg-primary/10">
                      Coaching
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[400px]">
                        <div className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-secondary/20 to-secondary/10 p-6 no-underline outline-none focus:shadow-md"
                              href="/coaching/ai-trainer"
                            >
                              <Brain className="h-6 w-6 text-secondary" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                AI Personal Trainer
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Get personalized coaching from our AI trainer.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </div>
                        <div className="grid gap-3">
                          <NavigationMenuLink asChild>
                            <Link href="/coaching/nutrition" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                              <div className="text-sm font-medium leading-none">Nutrition Coaching</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Personalized meal plans and nutrition advice.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link href="/coaching/progress" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                              <div className="text-sm font-medium leading-none">Progress Tracking</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Monitor your fitness journey with detailed analytics.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/membership" legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/10 data-[state=open]:bg-primary/10">
                        Membership
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/10 data-[state=open]:bg-primary/10">
                        About Us
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              </div>

              {/* Desktop Profile Button */}
              <div className="hidden md:block">
                {session ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                        {session.user?.image ? (
                          <img
                            src={session.user.image}
                            alt="Profile"
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center space-x-2 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                          <Activity className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center space-x-2 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center space-x-2 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                          <Shield className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/api/auth/signout" className="flex items-center space-x-2 text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700">
                          <LogIn className="h-4 w-4" />
                          <span>Sign Out</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link href="/signin">
                      <Button variant="outline">Sign In</Button>
                    </Link>
                    <Link href="/signup">
                      <Button>Get Started</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Side - Content */}
            <div className="space-y-10">
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  AI-Powered Fitness Platform
                </div>
                
                <h1 className="text-6xl lg:text-8xl font-black text-gray-900 leading-[0.9]">
                  The Future of
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
                    FITNESS
                  </span>
                  is Here
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Experience next-generation fitness with AI that learns, adapts, and evolves with you. 
                  Transform your body with personalized coaching that never sleeps.
                </p>
              </div>
              
              {!session && (
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link href="/signup">
                    <Button size="lg" className="group relative w-full sm:w-auto text-lg px-10 py-6 rounded-2xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-2xl shadow-primary/25 transition-all duration-300 hover:scale-105">
                      <span className="relative z-10">Start Your Journey</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    </Button>
                  </Link>
                  <Link href="/signin">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-10 py-6 rounded-2xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-primary">
                      Watch Demo
                    </Button>
                  </Link>
                </div>
              )}
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-sm text-gray-500">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">4.9★</div>
                  <div className="text-sm text-gray-500">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">95%</div>
                  <div className="text-sm text-gray-500">Success</div>
                </div>
              </div>
            </div>
            
            {/* Right Side - 3D Visual */}
            <div className="relative">
              <div className="relative">
                {/* Main Card */}
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-200"></div>
                      </div>
                      <div className="text-sm text-gray-500 font-mono">FitAI v2.0</div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 border border-primary/20">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-primary">AI Workout</span>
                          <span className="text-xs text-gray-500">45 min</span>
                        </div>
                        <div className="text-xl font-bold text-gray-900">Upper Body Strength</div>
                        <div className="text-sm text-gray-600">Adaptive • Real-time</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-4 border border-secondary/20">
                          <div className="text-sm text-secondary font-medium">Calories</div>
                          <div className="text-2xl font-bold text-gray-900">320</div>
                        </div>
                        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4 border border-accent/20">
                          <div className="text-sm text-accent font-medium">Progress</div>
                          <div className="text-2xl font-bold text-gray-900">+12%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-primary to-secondary rounded-2xl px-6 py-3 shadow-xl animate-bounce">
                  <div className="text-sm font-bold text-white">AI Active</div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-secondary to-accent rounded-2xl px-6 py-3 shadow-xl animate-bounce delay-500">
                  <div className="text-sm font-bold text-white">Learning</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-6 py-3 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-8">
              <Brain className="w-4 h-4 mr-2" />
              Advanced AI Technology
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">FitAI</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the cutting-edge of fitness technology with AI that understands your body, 
              learns from your progress, and evolves with your goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative bg-white p-10 rounded-3xl border border-gray-200 hover:border-primary/50 transition-all duration-500 group-hover:scale-105 shadow-lg hover:shadow-2xl">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Brain className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Neural AI Coaching</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Advanced machine learning algorithms analyze your performance patterns, 
                  adapt workout intensity in real-time, and provide personalized coaching 
                  that evolves with your fitness journey.
                </p>
                <div className="mt-8 flex items-center text-primary font-medium">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent rounded-3xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative bg-white p-10 rounded-3xl border border-gray-200 hover:border-secondary/50 transition-all duration-500 group-hover:scale-105 shadow-lg hover:shadow-2xl">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Predictive Analytics</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Real-time biometric analysis predicts your performance, 
                  prevents overtraining, and optimizes recovery periods 
                  for maximum results with minimal risk.
                </p>
                <div className="mt-8 flex items-center text-secondary font-medium">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-3xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative bg-white p-10 rounded-3xl border border-gray-200 hover:border-accent/50 transition-all duration-500 group-hover:scale-105 shadow-lg hover:shadow-2xl">
                <div className="w-20 h-20 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Zap className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Adaptive Intelligence</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Dynamic workout algorithms that adjust to your energy levels, 
                  available equipment, and time constraints while maintaining 
                  optimal training stimulus for continuous progress.
                </p>
                <div className="mt-8 flex items-center text-accent font-medium">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 border border-white/30 rounded-full text-white text-sm font-medium mb-8 backdrop-blur-sm">
              <Activity className="w-4 h-4 mr-2" />
              Global Impact
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-8">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Elite Athletes</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Join the revolution that's transforming how athletes, trainers, and fitness enthusiasts achieve their goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-white/20 rounded-3xl blur group-hover:blur-sm transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/30 hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                <div className="text-5xl lg:text-6xl font-black text-white mb-4 group-hover:scale-110 transition-transform">10K+</div>
                <div className="text-white/90 text-lg font-medium">Active Users</div>
                <div className="text-white/70 text-sm mt-2">Growing daily</div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-white/20 rounded-3xl blur group-hover:blur-sm transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/30 hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                <div className="text-5xl lg:text-6xl font-black text-white mb-4 group-hover:scale-110 transition-transform">50M+</div>
                <div className="text-white/90 text-lg font-medium">Workouts Tracked</div>
                <div className="text-white/70 text-sm mt-2">AI-optimized</div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-white/20 rounded-3xl blur group-hover:blur-sm transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/30 hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                <div className="text-5xl lg:text-6xl font-black text-white mb-4 group-hover:scale-110 transition-transform">95%</div>
                <div className="text-white/90 text-lg font-medium">Success Rate</div>
                <div className="text-white/70 text-sm mt-2">Proven results</div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-white/20 rounded-3xl blur group-hover:blur-sm transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/30 hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                <div className="text-5xl lg:text-6xl font-black text-white mb-4 group-hover:scale-110 transition-transform">4.9★</div>
                <div className="text-white/90 text-lg font-medium">User Rating</div>
                <div className="text-white/70 text-sm mt-2">Elite satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-6 py-3 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-8">
              <Star className="w-4 h-4 mr-2" />
              Elite Testimonials
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8">
              What <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Elite Athletes</span> Say
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Hear from world-class athletes and fitness professionals who've revolutionized their training with FitAI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white p-10 rounded-3xl border border-gray-200 hover:border-primary/50 transition-all duration-500 group-hover:scale-105 shadow-lg hover:shadow-2xl">
                <div className="flex items-center mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-8 italic text-xl leading-relaxed">
                  "FitAI's neural algorithms completely revolutionized my training. The AI adapts to my performance in real-time, 
                  something no human trainer could ever match."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">SJ</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-xl">Sarah Johnson</div>
                    <div className="text-gray-500">Olympic Athlete</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white p-10 rounded-3xl border border-gray-200 hover:border-secondary/50 transition-all duration-500 group-hover:scale-105 shadow-lg hover:shadow-2xl">
                <div className="flex items-center mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-8 italic text-xl leading-relaxed">
                  &ldquo;The predictive analytics are mind-blowing. FitAI prevents overtraining and optimizes my recovery 
                  better than any sports scientist I&apos;ve worked with.&rdquo;
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">MC</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-xl">Mike Chen</div>
                    <div className="text-gray-500">Professional Trainer</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-primary/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white p-10 rounded-3xl border border-gray-200 hover:border-accent/50 transition-all duration-500 group-hover:scale-105 shadow-lg hover:shadow-2xl">
                <div className="flex items-center mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-8 italic text-xl leading-relaxed">
                  &ldquo;As a busy executive, FitAI&apos;s adaptive intelligence is a game-changer. It adjusts to my schedule 
                  while maintaining optimal training stimulus. Pure genius.&rdquo;
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">ED</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-xl">Emma Davis</div>
                    <div className="text-gray-500">CEO & Athlete</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white rounded-3xl p-16 border border-gray-200 shadow-2xl">
              <div className="inline-flex items-center px-6 py-3 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-8">
                <Zap className="w-4 h-4 mr-2" />
                Join the Revolution
              </div>
              
              <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Transform</span> Your Fitness?
              </h2>
              
              <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                Experience the future of fitness with AI that learns, adapts, and evolves with you. 
                Join thousands of elite athletes who&apos;ve already revolutionized their training.
              </p>
              
              {!session && (
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/signup">
                    <Button size="lg" className="group relative w-full sm:w-auto text-xl px-12 py-6 rounded-2xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-2xl shadow-primary/25 transition-all duration-300 hover:scale-105">
                      <span className="relative z-10">Start Your Journey</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    </Button>
                  </Link>
                  <Link href="/signin">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-xl px-12 py-6 rounded-2xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-primary">
                      Watch Demo
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">FitAI</h3>
              </div>
              <p className="text-gray-400">
                The future of fitness tracking with AI-powered insights and personalized recommendations.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/status" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/cookies" className="hover:text-white">Cookies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FitAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
