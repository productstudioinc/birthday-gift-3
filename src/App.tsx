import { useState, useEffect } from "react";
import { QuestCard } from "./components/game/QuestCard";
import { ProgressBar } from "./components/game/ProgressBar";
import { Celebration } from "./components/game/Celebration";
import { Quest, GameState } from "./types/game";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
const quests: Quest[] = [
  {
    id: 1,
    title: "The Beginning",
    description: "What year did we first meet? (Hint: Think about high school!)",
    hint: "It was during freshman year...",
    answer: "2015",
    isCompleted: false
  },
  {
    id: 2,
    title: "Favorite Memory",
    description: "Where did we go for our first adventure together?",
    hint: "It involved ice cream...",
    answer: "park",
    isCompleted: false
  },
  // Add more quests as needed
  ];
function App() {
  const [gameState, setGameState] = useState<GameState>({
    playerName: "",
    currentQuest: 0,
    completedQuests: [],
    totalQuests: quests.length
  });
  const [showNameInput, setShowNameInput] = useState(true);
  useEffect(() => {
    const savedState = localStorage.getItem("birthdayQuest");
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setGameState(parsed);
      setShowNameInput(false);
    }
  }, []);
  useEffect(() => {
    if (gameState.playerName) {
      localStorage.setItem("birthdayQuest", JSON.stringify(gameState));
    }
  }, [gameState]);
  const handleStartGame = (name: string) => {
    setGameState(prev => ({ ...prev, playerName: name }));
    setShowNameInput(false);
  };
  const handleAnswer = (answer: string) => {
    const currentQuest = quests[gameState.currentQuest];
    if (answer === currentQuest.answer.toLowerCase()) {
      setGameState(prev => ({
        ...prev,
        currentQuest: prev.currentQuest + 1,
        completedQuests: [...prev.completedQuests, currentQuest.id]
      }));
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-pink-500 py-8 px-4">
      {showNameInput ? (
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-8">
            Welcome to the Birthday Quest!
          </h1>
          <Input
            placeholder="Enter your name..."
            className="mb-4"
            onChange={(e) => handleStartGame(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleStartGame(e.currentTarget.value)}
          />
        </div>
      ) : (
        <>