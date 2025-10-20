"use client";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  LogOut, 
  User, 
  Activity, 
  TrendingUp, 
  Clock, 
  Flame, 
  Target, 
  Calendar,
  Play,
  BookOpen,
  BarChart3,
  Zap
} from "lucide-react";
import { PageLoader } from "@/components/ui/spinner";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <PageLoader />;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Access Denied</h1>
          <p className="text-gray-600 mt-2">Please sign in to access this page.</p>
        </div>
      </div>
    );
  }

  // Mock data - will be replaced with real API calls
  const mockData = {
    todayWorkout: {
      title: "Upper Body Strength",
      duration: "45 min",
      difficulty: "Intermediate",
      exercises: 8,
      calories: 320,
      isCompleted: false
    },
    progress: {
      weeklyGoal: 5,
      completed: 3,
      caloriesBurned: 1250,
      caloriesGoal: 2000,
      workoutsCompleted: 12,
      streak: 5
    },
    recentActivity: [
      {
        id: 1,
        type: "workout",
        title: "Upper Body Strength",
        duration: "45 min",
        calories: 320,
        timestamp: "2 hours ago",
        icon: Activity,
        color: "primary"
      },
      {
        id: 2,
        type: "cardio",
        title: "Cardio Session",
        duration: "30 min",
        calories: 280,
        timestamp: "Yesterday",
        icon: TrendingUp,
        color: "secondary"
      },
      {
        id: 3,
        type: "flexibility",
        title: "Flexibility Training",
        duration: "20 min",
        calories: 120,
        timestamp: "2 days ago",
        icon: Target,
        color: "accent"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-2">Welcome back, {session.user?.name || session.user?.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Workout - Large Card */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Today's Workout</CardTitle>
                    <CardDescription>Your personalized AI-recommended session</CardDescription>
                  </div>
                  <Badge variant="secondary">
                    <Clock className="w-3 h-3 mr-1" />
                    {mockData.todayWorkout.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {!mockData.todayWorkout.isCompleted ? (
                  <div className="space-y-6">
                    <div className="rounded-lg border bg-card p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">{mockData.todayWorkout.title}</h3>
                        <Badge variant="outline">
                          {mockData.todayWorkout.difficulty}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{mockData.todayWorkout.exercises} exercises</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Flame className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{mockData.todayWorkout.calories} calories</span>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Start Workout
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Workout Complete!</h3>
                    <p className="text-muted-foreground mb-6">Great job on completing today's session</p>
                    <Button variant="outline">
                      View Summary
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Progress Summary - Side Card */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Progress Summary</CardTitle>
                <CardDescription>Your weekly achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Weekly Goal */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Weekly Goal</span>
                    <span className="text-sm font-bold">
                      {mockData.progress.completed}/{mockData.progress.weeklyGoal} days
                    </span>
                  </div>
                  <Progress value={(mockData.progress.completed / mockData.progress.weeklyGoal) * 100} />
                </div>

                {/* Calories */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Calories Burned</span>
                    <span className="text-sm font-bold">{mockData.progress.caloriesBurned}</span>
                  </div>
                  <Progress value={(mockData.progress.caloriesBurned / mockData.progress.caloriesGoal) * 100} />
                </div>

                {/* Workouts */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Total Workouts</span>
                    <span className="text-sm font-bold">{mockData.progress.workoutsCompleted}</span>
                  </div>
                  <Progress value={80} />
                </div>

                {/* Streak */}
                <div className="rounded-lg border bg-muted/50 p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Current Streak</span>
                  </div>
                  <div className="text-2xl font-bold">{mockData.progress.streak} days</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest workout sessions</CardDescription>
                </div>
                <Link href="/exercises">
                  <Button variant="outline" size="sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Exercise Library
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentActivity.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.duration} • {activity.calories} calories</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/exercises">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Exercise Library</h3>
                <p className="text-sm text-muted-foreground">Browse exercises and create custom workouts</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/progress">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Progress Tracking</h3>
                <p className="text-sm text-muted-foreground">View detailed analytics and insights</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/workouts">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Activity className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Workout Plans</h3>
                <p className="text-sm text-muted-foreground">Create and manage your workout routines</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}