import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Recycle, 
  Leaf, 
  Target, 
  Users, 
  Clock, 
  CheckCircle,
  ArrowRight,
  BarChart3
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const successTraits = [
    { icon: Target, text: "Strong problem-solving and organizational skills" },
    { icon: Leaf, text: "Passion for sustainability and environmental health" },
    { icon: CheckCircle, text: "Detail-oriented and process-driven mindset" },
    { icon: BarChart3, text: "Analytical thinking and regulatory knowledge" },
    { icon: Users, text: "Teamwork and communication skills" },
  ];

  const typicalCareers = [
    "Waste Management Specialist",
    "Recycling Coordinator", 
    "Environmental Compliance Officer",
    "Sustainability Consultant",
    "Hazardous Waste Manager"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Recycle className="w-12 h-12 text-primary" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Should I Become a Waste Management Specialist?
              </h1>
            </div>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              AI-Powered Career & Learning Readiness Assessment
            </p>
            
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Discover your psychological and technical readiness for a career in waste management, 
              focusing on waste reduction, recycling, sustainable disposal, and environmental compliance.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Badge variant="secondary" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                20-30 minutes
              </Badge>
              <Badge variant="outline">Comprehensive Analysis</Badge>
              <Badge variant="outline">Personalized Results</Badge>
            </div>

            <Button 
              size="lg" 
              onClick={() => navigate('/assessment')}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* What is Waste Management */}
        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-primary">What is Waste Management?</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg text-foreground/80 leading-relaxed">
              Waste Management Specialists plan and implement systems for proper collection, transportation, 
              processing, and disposal of waste materials while minimizing environmental impact.
            </p>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Typical Careers */}
          <Card className="border-l-4 border-l-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-accent">
                <Target className="w-6 h-6" />
                Typical Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {typicalCareers.map((career, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="font-medium">{career}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Success Traits */}
          <Card className="border-l-4 border-l-success">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <Users className="w-6 h-6" />
                Success Traits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {successTraits.map((trait, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <trait.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{trait.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assessment Overview */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/30">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Comprehensive Assessment Framework</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Psychometric Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Evaluate your personality, interests, and motivation alignment with waste management careers.
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <BarChart3 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Technical Readiness</h3>
                <p className="text-sm text-muted-foreground">
                  Assess your current knowledge and aptitude in environmental science and waste management.
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-lg font-semibold">WISCAR Framework</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive evaluation across Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Ready to Discover Your Potential?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take our comprehensive assessment to receive personalized insights about your readiness 
            for a career in waste management and environmental sustainability.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/assessment')}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl"
          >
            Begin Your Assessment Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
