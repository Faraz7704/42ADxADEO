"use client";

import { useRouter } from "next/navigation";
import { StaticImageData } from "next/image";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/Logo_black.png";
import BlogCard from "@/components/blog-card";
import { departmentLogos } from "@/utils/departmentLogos";

type CardData = {
  id: number;
  question: string;
  answer?: string;
  departments: string[];
  logo?: StaticImageData | string; // Allow both string and StaticImageData
  date: string;
  status: "not answered" | "approved" | "under discussion";
  upvotes: number;
  comments: number;
};

export default function HomePage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(""); // Local state for manual input
  const [cards, setCards] = useState<CardData[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardData[]>([]);

  useEffect(() => {
    // Mock card data
    const data: CardData[] = [
      {
        id: 1,
        question:
          "What are the renewable energy plans for residential buildings?",
        departments: [
          "Department of Energy",
          "Department of Municipalities and Transport",
        ],
        logo: departmentLogos["Department of Energy"],
        date: "2024-11-15",
        status: "approved",
        upvotes: 12,
        comments: 5,
      },
      {
        id: 2,
        question:
          "What is the process to obtain a medical license as a doctor?",
        departments: ["Department of Health"],
        logo: departmentLogos["Department of Health"],
        date: "2024-11-14",
        status: "under discussion",
        upvotes: 8,
        comments: 3,
      },
      {
        id: 3,
        question: "What are the upcoming heritage festivals in Abu Dhabi?",
        departments: ["Department of Culture and Tourism"],
        logo: departmentLogos["Department of Culture and Tourism"],
        date: "2024-11-13",
        status: "approved",
        upvotes: 15,
        comments: 7,
      },
      {
        id: 4,
        question:
          "What support programs are available for families with disabled members?",
        departments: [
          "Department of Community Development",
          "Department of Health",
        ],
        logo: departmentLogos["Department of Community Development"],
        date: "2024-11-12",
        status: "not answered",
        upvotes: 3,
        comments: 1,
      },
      {
        id: 5,
        question: "How can I report fire hazards in my apartment building?",
        departments: ["Abu Dhabi Civil Defence Authority"],
        logo: departmentLogos["Abu Dhabi Civil Defence Authority"],
        date: "2024-11-11",
        status: "approved",
        upvotes: 20,
        comments: 10,
      },
      {
        id: 6,
        question:
          "What legal documents are needed to start a business in Abu Dhabi?",
        departments: [
          "Abu Dhabi Judicial Department",
          "Department of Economic Development",
        ],
        logo: departmentLogos["Abu Dhabi Judicial Department"],
        date: "2024-11-10",
        status: "under discussion",
        upvotes: 5,
        comments: 2,
      },
      {
        id: 7,
        question: "What are the steps to register a new commercial license?",
        departments: ["Department of Economic Development"],
        logo: departmentLogos["Department of Economic Development"],
        date: "2024-11-09",
        status: "approved",
        upvotes: 18,
        comments: 6,
      },
      {
        id: 8,
        question:
          "Which transportation services are available to connect Abu Dhabi suburbs?",
        departments: ["Department of Municipalities and Transport"],
        logo: departmentLogos["Department of Municipalities and Transport"],
        date: "2024-11-08",
        status: "approved",
        upvotes: 14,
        comments: 8,
      },
      {
        id: 9,
        question:
          "Are there any grants for schools to implement AI in education?",
        departments: [
          "Department of Education and Knowledge",
          "Department of Economic Development",
        ],
        logo: departmentLogos["Department of Education and Knowledge"],
        date: "2024-11-07",
        status: "not answered",
        upvotes: 10,
        comments: 4,
      },
      {
        id: 10,
        question:
          "What green initiatives are being implemented in government offices?",
        departments: [
          "Department of Government Enablement",
          "Department of Energy",
        ],
        logo: departmentLogos["Department of Government Enablement"],
        date: "2024-11-06",
        status: "under discussion",
        upvotes: 7,
        comments: 3,
      },
    ];
    setCards(data);
    setFilteredCards(data); // Initialize with all cards
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      const filtered = cards.filter((card) =>
        card.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCards(filtered);
      // Optionally, update the query parameter in the URL
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

      <div className="relative w-full max-w-md">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Manual input
          onKeyDown={handleKeyDown} // Trigger search on Enter
          className="pr-10"
        />
        <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
          <Search className="w-5 h-5" />
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {filteredCards.map((card) => (
          <BlogCard key={card.id} {...card} />
        ))}
        {filteredCards.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
}