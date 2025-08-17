import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Brain, BookOpen } from "lucide-react";

interface TechnicalData {
  logicalReasoning: number;
  numericalAbility: number;
  domainKnowledge: number;
  totalScore: number;
}

interface Props {
  data: any;
  onUpdate: (data: TechnicalData) => void;
}

const logicalQuestions = [
  {
    question: "If Facility A processes 500 tons of waste daily and sends 30% to recycling, 20% to composting, and the rest to landfill, how many tons go to landfill?",
    options: ["150 tons", "250 tons", "300 tons", "350 tons"],
    correct: 1
  },
  {
    question: "What is the most appropriate disposal method for lithium batteries?",
    options: ["Regular landfill", "Incineration", "Specialized recycling facility", "Composting"],
    correct: 2
  },
  {
    question: "Which waste hierarchy principle should be prioritized first?",
    options: ["Recycle", "Reduce", "Reuse", "Recover"],
    correct: 1
  }
];

const numericalQuestions = [
  {
    question: "A city generates 1,200 tons of waste per day. If the recycling rate increases from 25% to 40%, how many additional tons are diverted from landfill daily?",
    answer: 180,
    tolerance: 5
  },
  {
    question: "If hazardous waste disposal costs $800 per ton and regular waste costs $120 per ton, what's the cost difference for 50 tons of hazardous waste?",
    answer: 34000,
    tolerance: 1000
  }
];

const domainQuestions = [
  {
    question: "Which EPA regulation primarily governs hazardous waste management?",
    options: ["Clean Air Act", "Resource Conservation and Recovery Act (RCRA)", "Clean Water Act", "Safe Drinking Water Act"],
    correct: 1
  },
  {
    question: "What does the term 'cradle-to-grave' mean in waste management?",
    options: ["Product lifecycle assessment", "Waste tracking from generation to disposal", "Recycling process", "Composting timeline"],
    correct: 1
  },
  {
    question: "Which material has the highest recycling rate in the US?",
    options: ["Plastic bottles", "Aluminum cans", "Paper products", "Glass bottles"],
    correct: 1
  }
];

export const TechnicalSection = ({ data, onUpdate }: Props) => {
  const [logicalAnswers, setLogicalAnswers] = useState<Record<number, number>>({});
  const [numericalAnswers, setNumericalAnswers] = useState<Record<number, number>>({});
  const [domainAnswers, setDomainAnswers] = useState<Record<number, number>>({});

  const calculateScores = () => {
    // Logical reasoning score
    const logicalScore = logicalQuestions.reduce((score, question, index) => {
      return logicalAnswers[index] === question.correct ? score + 1 : score;
    }, 0) / logicalQuestions.length * 100;

    // Numerical ability score  
    const numericalScore = numericalQuestions.reduce((score, question, index) => {
      const answer = numericalAnswers[index];
      return (answer && Math.abs(answer - question.answer) <= question.tolerance) ? score + 1 : score;
    }, 0) / numericalQuestions.length * 100;

    // Domain knowledge score
    const domainScore = domainQuestions.reduce((score, question, index) => {
      return domainAnswers[index] === question.correct ? score + 1 : score;
    }, 0) / domainQuestions.length * 100;

    const totalScore = (logicalScore + numericalScore + domainScore) / 3;

    const technicalData: TechnicalData = {
      logicalReasoning: logicalScore,
      numericalAbility: numericalScore,
      domainKnowledge: domainScore,
      totalScore
    };

    onUpdate(technicalData);
  };

  const handleLogicalAnswer = (questionIndex: number, answerIndex: number) => {
    setLogicalAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
  };

  const handleNumericalAnswer = (questionIndex: number, value: number) => {
    setNumericalAnswers(prev => ({ ...prev, [questionIndex]: value }));
  };

  const handleDomainAnswer = (questionIndex: number, answerIndex: number) => {
    setDomainAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-foreground">Technical & Aptitude Assessment</h3>
        <p className="text-muted-foreground">
          Test your logical reasoning, numerical skills, and domain knowledge in waste management.
        </p>
        <Button onClick={calculateScores} className="mt-4">
          Calculate Scores
        </Button>
      </div>

      {/* Logical Reasoning */}
      <Card className="border-l-4 border-l-accent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <Brain className="w-5 h-5" />
            Logical Reasoning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {logicalQuestions.map((q, index) => (
            <div key={index} className="space-y-3">
              <p className="font-medium">{q.question}</p>
              <RadioGroup
                value={logicalAnswers[index]?.toString() || ""}
                onValueChange={(value) => handleLogicalAnswer(index, parseInt(value))}
              >
                {q.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <RadioGroupItem value={optionIndex.toString()} id={`logical_${index}_${optionIndex}`} />
                    <Label htmlFor={`logical_${index}_${optionIndex}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Numerical Ability */}
      <Card className="border-l-4 border-l-warning">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning">
            <Calculator className="w-5 h-5" />
            Numerical Ability
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {numericalQuestions.map((q, index) => (
            <div key={index} className="space-y-3">
              <p className="font-medium">{q.question}</p>
              <Input
                type="number"
                placeholder="Enter your answer"
                onChange={(e) => handleNumericalAnswer(index, parseFloat(e.target.value))}
                className="max-w-xs"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Domain Knowledge */}
      <Card className="border-l-4 border-l-success">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success">
            <BookOpen className="w-5 h-5" />
            Domain Knowledge
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {domainQuestions.map((q, index) => (
            <div key={index} className="space-y-3">
              <p className="font-medium">{q.question}</p>
              <RadioGroup
                value={domainAnswers[index]?.toString() || ""}
                onValueChange={(value) => handleDomainAnswer(index, parseInt(value))}
              >
                {q.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <RadioGroupItem value={optionIndex.toString()} id={`domain_${index}_${optionIndex}`} />
                    <Label htmlFor={`domain_${index}_${optionIndex}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};