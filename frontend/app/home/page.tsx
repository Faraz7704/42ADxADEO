"use client";

import { useRouter } from "next/navigation";
import { StaticImageData } from "next/image";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/Logo_black.png";
import BlogCard from "@/components/blog-card";
import "./page.css";

type CardData = {
  id: number;
  question: string;
  answer?: string;
  aiSummary?: string;
  requestDescription?: string;
  departments: string[];
  logo?: StaticImageData | string;
  date: string;
  status: "not answered" | "approved" | "under discussion";
  upvotes: number;
  comments: number;
};


export default function HomePage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [cards, setCards] = useState<CardData[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardData[]>([]);

  useEffect(() => {
    const data: CardData[] = [
      {
        id: 1,
        question: "What are the renewable energy plans for residential buildings?",
        departments: ["Operations", "Research and Development"],
        date: "2024-11-15",
        status: "approved",
        upvotes: 12,
        comments: 5,
        aiSummary:
          "The Operations and Research and Development departments are collaborating on renewable energy plans for residential buildings. These plans prioritize solar panels and energy-efficient upgrades.",
        requestDescription:
          "The initiative aims to reduce energy consumption by encouraging the installation of solar panels, promoting energy-efficient appliances, and offering financial incentives such as subsidies and tax credits for residential energy upgrades.",
      },
      {
        id: 2,
        question: "What is the process to obtain a medical license as a doctor?",
        departments: ["Human Resources"],
        date: "2024-11-14",
        status: "under discussion",
        upvotes: 8,
        comments: 3,
        aiSummary:
          "The Human Resources department oversees medical licensing, involving applications, exams, and background checks.",
        requestDescription:
          "Applicants must submit an application, complete required medical examinations, provide verified educational credentials, and undergo a comprehensive background check. Additional steps may include professional interviews and local registration with health authorities.",
      },
      {
        id: 3,
        question: "What are the upcoming heritage festivals in Abu Dhabi?",
        departments: ["Marketing"],
        date: "2024-11-13",
        status: "approved",
        upvotes: 15,
        comments: 7,
        aiSummary:
          "Upcoming heritage festivals celebrate Emirati culture with traditional events, such as camel racing and the Date Festival.",
        requestDescription:
          "Heritage festivals in Abu Dhabi will feature traditional Emirati dances, camel racing, the Date Festival, and local artisan markets. Visitors can experience cultural exhibitions, live music performances, and food-tasting events that showcase the rich heritage of the UAE.",
      },
      {
        id: 4,
        question: "What support programs are available for families with disabled members?",
        departments: ["Customer Service", "Human Resources"],
        date: "2024-11-12",
        status: "not answered",
        upvotes: 3,
        comments: 1,
        aiSummary:
          "Support programs for families with disabled members focus on accessibility, financial aid, and caregiver resources.",
        requestDescription:
          "Available programs include financial assistance for medical treatments, caregiver support initiatives, access to specialized education, and therapy services. There are also community programs designed to enhance social inclusion and promote accessibility in public spaces.",
      },
      {
        id: 5,
        question: "How can I report fire hazards in my apartment building?",
        departments: ["Operations"],
        date: "2024-11-11",
        status: "approved",
        upvotes: 20,
        comments: 10,
        aiSummary:
          "Fire hazards can be reported via a hotline or online system managed by the Operations department.",
        requestDescription:
          "Residents are encouraged to report fire hazards using the designated hotline or online portal. Reporting ensures prompt action, including inspections and safety audits, which aim to mitigate risks and maintain fire safety standards in residential buildings.",
      },
      {
        id: 6,
        question: "What legal documents are needed to start a business in Abu Dhabi?",
        departments: ["Legal", "Product Management"],
        date: "2024-11-10",
        status: "under discussion",
        upvotes: 5,
        comments: 2,
        aiSummary:
          "Starting a business requires trade licenses, business plans, and proof of identity.",
        requestDescription:
          "Essential documents for starting a business include a trade license, a detailed business plan, personal identification, and proof of financial stability. Applicants may also need tenancy agreements and approvals from relevant authorities based on the business type.",
      },
      {
        id: 7,
        question: "What are the steps to register a new commercial license?",
        departments: ["Legal"],
        date: "2024-11-09",
        status: "approved",
        upvotes: 18,
        comments: 6,
        aiSummary:
          "The Legal department manages commercial license registration, including submitting required documents.",
        requestDescription:
          "To register a commercial license, applicants must complete an online application, submit identification documents, provide a business plan, and pay the necessary fees. Approvals from the respective regulatory bodies are mandatory to finalize the process.",
      },
      {
        id: 8,
        question: "Which transportation services are available to connect Abu Dhabi suburbs?",
        departments: ["Operations"],
        date: "2024-11-08",
        status: "approved",
        upvotes: 14,
        comments: 8,
        aiSummary:
          "Transportation services include buses and taxis, with future metro expansion planned.",
        requestDescription:
          "Currently, Abu Dhabi offers reliable bus and taxi services connecting suburban areas. Future plans include a metro system to enhance connectivity and reduce commute times, making suburban travel more efficient and sustainable.",
      },
      {
        id: 9,
        question: "Are there any grants for schools to implement AI in education?",
        departments: ["Research and Development", "Finance"],
        date: "2024-11-07",
        status: "not answered",
        upvotes: 10,
        comments: 4,
        aiSummary:
          "Grants for AI in education focus on curriculum development and teacher training.",
        requestDescription:
          "Grant programs aim to support schools in integrating AI into their curriculum. These grants provide funding for teacher training, development of AI-based learning modules, and the acquisition of smart classroom technologies to enhance student learning experiences.",
      },
      {
        id: 10,
        question: "What green initiatives are being implemented in government offices?",
        departments: ["Operations", "Research and Development"],
        date: "2024-11-06",
        status: "under discussion",
        upvotes: 7,
        comments: 3,
        aiSummary:
          "Green initiatives include solar panels, paperless workflows, and energy-efficient upgrades.",
        requestDescription:
          "Government offices are actively implementing sustainability measures, such as installing solar panels, adopting paperless operations, and retrofitting buildings with energy-efficient equipment. These efforts aim to reduce carbon emissions and promote environmental responsibility across departments.",
      },
    ];
    
    
    
    setCards(data);
    setFilteredCards(data);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "under discussion":
        return "bg-yellow-500";
      case "not answered":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  const handleSearch = () => {
    if (searchQuery) {
      const filtered = cards.filter((card) =>
        card.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCards(filtered);
      router.push(`/home?search=${encodeURIComponent(searchQuery)}`);
    } else {
      setFilteredCards(cards);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      <Image src={Logo} height={100} alt="Unikamel" />

      <div className="relative w-full max-w-md input-div">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-bordered pr-10"
        />
        <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
          <Sparkles className="spark-icon w-5 h-5" />
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {filteredCards.map((card) => (
          <BlogCard key={card.id} {...card} />
        ))}
        {filteredCards.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No results found
          </p>
        )}
      </div>
    </div>
  );
}
