import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Zap, Heart, Wrench, Brain, TrendingUp, Target } from "lucide-react";

interface WiscarData {
  will: number;
  interest: number;
  skill: number;
  cognitiveReadiness: number;
  abilityToLearn: number;
  realWorldAlignment: number;
}

interface Props {
  data: any;
  onUpdate: (data: WiscarData) => void;
}

const likertScale = [
  { value: 1, label: "Never" },
  { value: 2, label: "Rarely" },
  { value: 3, label: "Sometimes" },
  { value: 4, label: "Often" },
  { value: 5, label: "Always" },
];

const wiscarCategories = [
  {
    key: "will",
    title: "Will - Inner Drive & Persistence",
    icon: Zap,
    color: "text-accent",
    questions: [
      "I persist through environmental challenges even when progress is slow",
      "I maintain motivation to work on waste reduction projects long-term",
      "I take initiative to improve waste management processes without being asked",
      "I stay committed to sustainability goals despite obstacles"
    ]
  },
  {
    key: "interest",
    title: "Interest - Genuine Curiosity & Engagement",
    icon: Heart,
    color: "text-primary",
    questions: [
      "I actively seek out information about new waste management technologies",
      "I find myself discussing environmental issues in my free time",
      "I am curious about the environmental impact of everyday decisions",
      "I enjoy learning about circular economy principles"
    ]
  },
  {
    key: "skill",
    title: "Skill - Current Technical & Soft Skills",
    icon: Wrench,
    color: "text-success",
    questions: [
      "I can analyze waste stream data and identify improvement opportunities",
      "I effectively communicate environmental concepts to different audiences",
      "I understand basic environmental regulations and compliance requirements",
      "I can organize and manage waste reduction projects"
    ]
  },
  {
    key: "cognitiveReadiness",
    title: "Cognitive Readiness - Problem-Solving Ability",
    icon: Brain,
    color: "text-warning",
    questions: [
      "I can quickly identify root causes of waste management problems",
      "I think systematically about complex environmental systems",
      "I can balance multiple factors when making waste management decisions",
      "I adapt my thinking when new environmental information becomes available"
    ]
  },
  {
    key: "abilityToLearn",
    title: "Ability to Learn - Adaptability & Growth",
    icon: TrendingUp,
    color: "text-blue-600",
    questions: [
      "I quickly grasp new environmental concepts and technologies",
      "I actively seek feedback to improve my environmental knowledge",
      "I learn from failed sustainability initiatives to improve future efforts",
      "I embrace changes in environmental regulations and standards"
    ]
  },
  {
    key: "realWorldAlignment",
    title: "Real-World Alignment - Job Compatibility",
    icon: Target,
    color: "text-purple-600",
    questions: [
      "I am comfortable working with waste materials and in industrial settings",
      "I can handle the administrative aspects of environmental compliance",
      "I work well with government agencies and regulatory bodies",
      "I am prepared for the physical and mental demands of waste management work"
    ]
  }
];

export const WiscarSection = ({ data, onUpdate }: Props) => {
  const [responses, setResponses] = useState<Record<string, number>>(data.wiscar || {});

  const handleResponseChange = (questionId: string, value: number) => {
    const newResponses = { ...responses, [questionId]: value };
    setResponses(newResponses);
    
    // Calculate averages for each WISCAR dimension
    const wiscarScores: WiscarData = {
      will: 0,
      interest: 0,
      skill: 0,
      cognitiveReadiness: 0,
      abilityToLearn: 0,
      realWorldAlignment: 0,
    };

    wiscarCategories.forEach(category => {
      const categoryResponses = category.questions.map((_, index) => 
        newResponses[`${category.key}_${index}`] || 0
      ).filter(score => score > 0);
      
      if (categoryResponses.length > 0) {
        wiscarScores[category.key as keyof WiscarData] = 
          categoryResponses.reduce((sum, score) => sum + score, 0) / categoryResponses.length * 20; // Convert to 0-100 scale
      }
    });

    onUpdate(wiscarScores);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-foreground">WISCAR Framework Analysis</h3>
        <p className="text-muted-foreground">
          Comprehensive evaluation of your readiness across six critical dimensions for waste management success.
        </p>
      </div>

      {wiscarCategories.map((category, categoryIndex) => {
        const Icon = category.icon;
        return (
          <Card key={category.key} className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${category.color}`}>
                <Icon className="w-5 h-5" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {category.questions.map((question, questionIndex) => {
                const questionId = `${category.key}_${questionIndex}`;
                return (
                  <div key={questionId} className="space-y-3">
                    <p className="font-medium text-foreground">{question}</p>
                    <RadioGroup
                      value={responses[questionId]?.toString() || ""}
                      onValueChange={(value) => handleResponseChange(questionId, parseInt(value))}
                      className="flex flex-wrap gap-4"
                    >
                      {likertScale.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value.toString()} id={`${questionId}_${option.value}`} />
                          <Label 
                            htmlFor={`${questionId}_${option.value}`} 
                            className="text-sm cursor-pointer"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {questionIndex < category.questions.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};