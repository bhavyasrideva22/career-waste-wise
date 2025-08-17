import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface PsychometricData {
  interest: number;
  conscientiousness: number;
  agreeableness: number;
  openness: number;
  motivation: number;
  persistence: number;
}

interface Props {
  data: any;
  onUpdate: (data: PsychometricData) => void;
}

const likertScale = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

const questions = [
  {
    category: "Environmental Interest",
    key: "interest",
    questions: [
      "I am passionate about solving environmental waste challenges",
      "I find recycling and waste reduction personally fulfilling",
      "I stay updated on environmental regulations and policies",
    ]
  },
  {
    category: "Conscientiousness",
    key: "conscientiousness",
    questions: [
      "I pay close attention to detail in my work",
      "I prefer clearly defined procedures over ambiguous situations", 
      "I complete tasks thoroughly even when no one is checking",
    ]
  },
  {
    category: "Teamwork & Communication",
    key: "agreeableness",
    questions: [
      "I work well with diverse teams and stakeholders",
      "I can explain complex environmental concepts to non-experts",
      "I enjoy collaborating on sustainability initiatives",
    ]
  },
  {
    category: "Openness to Learning",
    key: "openness",
    questions: [
      "I embrace new waste management technologies and methods",
      "I enjoy learning about innovative environmental solutions",
      "I adapt quickly to changing regulations and standards",
    ]
  },
  {
    category: "Motivation",
    key: "motivation",
    questions: [
      "Making a positive environmental impact motivates me more than salary",
      "I would work in waste management even if it's not glamorous",
      "I see waste reduction as crucial for future generations",
    ]
  },
  {
    category: "Persistence & Grit",
    key: "persistence", 
    questions: [
      "I persist through challenges to complete long-term projects",
      "I maintain focus on environmental goals despite setbacks",
      "I continue learning even when topics are difficult",
    ]
  }
];

export const PsychometricSection = ({ data, onUpdate }: Props) => {
  const [responses, setResponses] = useState<Record<string, number>>(data.psychometric || {});

  const handleResponseChange = (questionId: string, value: number) => {
    const newResponses = { ...responses, [questionId]: value };
    setResponses(newResponses);
    
    // Calculate averages for each category
    const categoryScores: PsychometricData = {
      interest: 0,
      conscientiousness: 0,
      agreeableness: 0,
      openness: 0,
      motivation: 0,
      persistence: 0,
    };

    questions.forEach(category => {
      const categoryResponses = category.questions.map((_, index) => 
        newResponses[`${category.key}_${index}`] || 0
      ).filter(score => score > 0);
      
      if (categoryResponses.length > 0) {
        categoryScores[category.key as keyof PsychometricData] = 
          categoryResponses.reduce((sum, score) => sum + score, 0) / categoryResponses.length;
      }
    });

    onUpdate(categoryScores);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-foreground">Psychological Assessment</h3>
        <p className="text-muted-foreground">
          This section evaluates your personality traits, interests, and motivation for waste management careers.
        </p>
      </div>

      {questions.map((category, categoryIndex) => (
        <Card key={category.key} className="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="text-lg text-primary">{category.category}</CardTitle>
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
      ))}
    </div>
  );
};