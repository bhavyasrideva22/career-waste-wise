import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Download, 
  RotateCcw,
  Recycle,
  Leaf,
  Target,
  TrendingUp,
  BookOpen,
  Briefcase
} from "lucide-react";
import { AssessmentData } from "./Assessment";

const Results = () => {
  const navigate = useNavigate();
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [overallScore, setOverallScore] = useState(0);
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem('assessmentData');
    if (savedData) {
      const data = JSON.parse(savedData) as AssessmentData;
      setAssessmentData(data);
      calculateOverallScore(data);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const calculateOverallScore = (data: AssessmentData) => {
    // Calculate weighted average of all scores
    const psychometricAvg = Object.values(data.psychometric).reduce((sum, val) => sum + val, 0) / Object.values(data.psychometric).length * 20; // Convert to 0-100
    const technicalScore = data.technical.totalScore || 0;
    const wiscarAvg = Object.values(data.wiscar).reduce((sum, val) => sum + val, 0) / Object.values(data.wiscar).length;
    
    const overall = (psychometricAvg * 0.3 + technicalScore * 0.4 + wiscarAvg * 0.3);
    setOverallScore(overall);
    
    if (overall >= 70) {
      setRecommendation("YES - You are well-suited for a career in waste management!");
    } else if (overall >= 40) {
      setRecommendation("MAYBE - You have potential with some development needed.");
    } else {
      setRecommendation("NO - Consider foundational learning before specializing.");
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <CheckCircle className="w-5 h-5 text-success" />;
    if (score >= 40) return <AlertCircle className="w-5 h-5 text-warning" />;
    return <XCircle className="w-5 h-5 text-destructive" />;
  };

  const careerRoles = [
    {
      title: "Waste Management Specialist",
      description: "Oversee waste collection and processing systems",
      skills: ["Waste segregation", "Regulations", "Data analysis"],
      match: assessmentData ? Math.round((assessmentData.technical.totalScore + assessmentData.wiscar.skill) / 2) : 0
    },
    {
      title: "Recycling Coordinator", 
      description: "Manage recycling programs and community outreach",
      skills: ["Public engagement", "Logistics", "Program management"],
      match: assessmentData ? Math.round((assessmentData.psychometric.agreeableness * 20 + assessmentData.wiscar.realWorldAlignment) / 2) : 0
    },
    {
      title: "Environmental Compliance Officer",
      description: "Ensure adherence to environmental laws",
      skills: ["Law knowledge", "Inspection", "Reporting"],
      match: assessmentData ? Math.round((assessmentData.psychometric.conscientiousness * 20 + assessmentData.technical.domainKnowledge) / 2) : 0
    },
    {
      title: "Sustainability Consultant",
      description: "Advise companies on waste reduction & green policies", 
      skills: ["Consulting", "Policy", "Data analysis"],
      match: assessmentData ? Math.round((assessmentData.wiscar.cognitiveReadiness + assessmentData.psychometric.openness * 20) / 2) : 0
    }
  ];

  if (!assessmentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Assessment Results</h1>
            <p className="text-muted-foreground">Your comprehensive waste management career assessment</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Overall Recommendation */}
        <Card className="border-2 border-primary shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              {getScoreIcon(overallScore)}
              <CardTitle className="text-2xl">Overall Assessment</CardTitle>
            </div>
            <div className="space-y-2">
              <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                {Math.round(overallScore)}%
              </div>
              <Badge variant={overallScore >= 70 ? "default" : overallScore >= 40 ? "secondary" : "destructive"} className="text-lg px-4 py-2">
                {recommendation}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={overallScore} className="h-4 mb-4" />
            <div className="text-center text-muted-foreground">
              {overallScore >= 70 ? 
                "You demonstrate strong alignment with waste management careers. Start targeted learning immediately!" :
                overallScore >= 40 ? 
                "You have potential but should focus on developing key skills and knowledge areas." :
                "Consider foundational studies in environmental science before specializing in waste management."
              }
            </div>
          </CardContent>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Psychometric Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                Psychometric Fit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(assessmentData.psychometric).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="capitalize text-sm">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-medium">{Math.round(value * 20)}%</span>
                  </div>
                  <Progress value={value * 20} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Technical Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Technical Readiness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(assessmentData.technical).map(([key, value]) => {
                if (key === 'totalScore') return null;
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="capitalize text-sm">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-medium">{Math.round(value)}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                );
              })}
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total Score</span>
                <span className={getScoreColor(assessmentData.technical.totalScore)}>
                  {Math.round(assessmentData.technical.totalScore)}%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                WISCAR Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(assessmentData.wiscar).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="capitalize text-sm">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-medium">{Math.round(value)}%</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Career Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Recommended Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {careerRoles.map((role) => (
                <Card key={role.title} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{role.title}</CardTitle>
                      <Badge variant={role.match >= 70 ? "default" : role.match >= 40 ? "secondary" : "outline"}>
                        {role.match}% Match
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Required Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {role.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              Recommended Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-success">Beginner Level</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Environmental science fundamentals</li>
                  <li>• Waste hierarchy concepts</li>
                  <li>• Basic recycling principles</li>
                  <li>• Sustainability introduction</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-warning">Intermediate Level</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Regulatory frameworks (EPA, RCRA)</li>
                  <li>• Waste processing technologies</li>
                  <li>• Environmental impact assessment</li>
                  <li>• Hazardous waste management</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Job-Ready Level</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Project management</li>
                  <li>• Data analytics & reporting</li>
                  <li>• Certified Waste Manager (CWM)</li>
                  <li>• Industry certifications</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={() => navigate('/')} variant="outline" className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Take Assessment Again
          </Button>
          <Button onClick={() => window.print()} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;