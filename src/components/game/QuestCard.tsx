import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Quest } from "@/types/game";
interface QuestCardProps {
  quest: Quest;