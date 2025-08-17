import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { PsychometricSection } from "@/components/assessment/PsychometricSection";
import { TechnicalSection } from "@/components/assessment/TechnicalSection";
import { WiscarSection } from "@/components/assessment/WiscarSection";

export interface AssessmentData {
  psychometric: {
    interest: number;
    conscientiousness: number;
    agreeableness: number;
    openness: number;
    motivation: number;
    persistence: number;
  };
  technical: {
    logicalReasoning: number;
    numericalAbility: number;
    domainKnowledge: number;
    totalScore: number;
  };
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitiveReadiness: number;
    abilityToLearn: number;
    realWorldAlignment: number;
  };
}

const Assessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    psychometric: {
      interest: 0,
      conscientiousness: 0,
      agreeableness: 0,
      openness: 0,
      motivation: 0,
      persistence: 0,
    },
    technical: {
      logicalReasoning: 0,
      numericalAbility: 0,
      domainKnowledge: 0,
      totalScore: 0,
    },
    wiscar: {
      will: 0,
      interest: 0,
      skill: 0,
      cognitiveReadiness: 0,
      abilityToLearn: 0,
      realWorldAlignment: 0,
    },
  });

  const sections = [
    { title: "Psychometric Assessment", component: PsychometricSection },
    { title: "Technical & Aptitude", component: TechnicalSection },
    { title: "WISCAR Analysis", component: WiscarSection },
  ];

  const progress = ((currentSection + 1) / sections.length) * 100;

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Navigate to results with assessment data
      localStorage.setItem('assessmentData', JSON.stringify(assessmentData));
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      navigate('/');
    }
  };

  const updateAssessmentData = (section: keyof AssessmentData, data: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const CurrentComponent = sections[currentSection].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">
              Waste Management Specialist Assessment
            </h1>
            <Badge variant="secondary" className="text-sm">
              {currentSection + 1} of {sections.length}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{sections[currentSection].title}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {currentSection + 1}
              </div>
              {sections[currentSection].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CurrentComponent
              data={assessmentData}
              onUpdate={(data) => updateAssessmentData(
                currentSection === 0 ? 'psychometric' : 
                currentSection === 1 ? 'technical' : 'wiscar', 
                data
              )}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8 max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentSection === 0 ? "Back to Home" : "Previous"}
          </Button>
          
          <Button
            onClick={handleNext}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            {currentSection === sections.length - 1 ? (
              <>
                <CheckCircle className="w-4 h-4" />
                View Results
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;