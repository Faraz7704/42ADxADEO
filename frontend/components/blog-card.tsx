import React, { useState } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { XIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowBigUpDash,
  ArrowBigDownDash,
  MessageSquareIcon,
  BookmarkIcon,
  Link2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Modal from "./modal";

export type BlogCardProps = {
  id: number;
  question: string;
  answer?: string;
  departments: string[];
  logo?: string | StaticImageData; // Update here to accept both string and StaticImageData
  date: string;
  status: "not answered" | "approved" | "under discussion";
  upvotes: number;
  comments: number;
};
const BlogCard: React.FC<BlogCardProps> = ({
  question,
  answer,
  departments = [],
  logo,
  date,
  status,
  upvotes,
  comments,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    if (status === "approved") return "bg-green-500";
    if (status === "under discussion") return "bg-yellow-500";
    if (status === "not answered") return "bg-red-500";
    return "bg-gray-300";
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Card
        className="flex flex-col h-full relative transition-all duration-300 transform hover:shadow-lg cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Status Indicator */}
        <div
          className={cn(
            "absolute top-2 right-2 w-3 h-3 rounded-full",
            getStatusColor(status)
          )}
        ></div>

        {/* Card Header */}
        <CardHeader className="space-y-4">
          <CardTitle>{question || "No question provided"}</CardTitle>
          <CardDescription>
            <div className="flex flex-col space-y-2">
              <div className="flex flex-wrap gap-1">
                {departments.map((dept, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-1 text-xs border border-gray-300 rounded-md bg-white shadow-sm"
                  >
                    {dept}
                  </div>
                ))}
              </div>
              <span>{date || "No date available"}</span>
            </div>
          </CardDescription>
        </CardHeader>

        {/* Card Content */}
        <CardContent className="flex-grow flex items-end justify-center">
          <div className="flex justify-center items-center w-full h-32 bg-white border border-gray-200 rounded-md p-4">
            <Image
              src={logo || "/placeholder.svg?height=80&width=80"}
              alt={departments.join(", ") || "Department logo"}
              width={80}
              height={80}
              style={{ objectFit: "contain" }}
            />
          </div>
        </CardContent>

        {/* Card Footer */}
        <CardFooter className="flex justify-between items-center p-4 border-t rounded-b-md bg-white mt-auto">
          {/* Interaction Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <ArrowBigUpDash className="h-5 w-5 text-green-500" />
              <span>{upvotes}</span>
            </Button>
            <Button variant="outline" size="icon">
              <ArrowBigDownDash className="h-5 w-5 text-red-500" />
            </Button>
            <Button variant="outline">
              <MessageSquareIcon className="h-5 w-5" />
              <span>{comments}</span>
            </Button>
          </div>
          {/* Save and Link Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <BookmarkIcon className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Link2Icon className="h-5 w-5" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="relative max-w-full sm:max-w-lg md:max-w-3xl min-h-[400px] sm:min-h-[500px] space-y-6 p-6 sm:p-8 bg-white rounded shadow-xl max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800"
            aria-label="Close"
          >
            <XIcon className="h-6 w-6" />
          </button>

          {/* Question Title */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            {question}
          </h2>

          {/* Departments List */}
          <div className="flex flex-wrap gap-3">
            {departments.map((dept, idx) => (
              <span
                key={idx}
                className="px-4 py-2 text-xs sm:text-sm font-medium border border-gray-300 rounded-md bg-white shadow-sm"
              >
                {dept}
              </span>
            ))}
          </div>

          {/* Date */}
          <p className="text-xs sm:text-sm text-gray-500">{date}</p>

          {/* Logo/Image Section */}
          <div className="flex justify-center items-center w-full h-32 sm:h-40 bg-white border border-gray-200 rounded-md p-4 sm:p-6">
            <Image
              src={logo || "/placeholder.svg?height=100&width=100"}
              alt={departments.join(", ") || "Department logo"}
              width={100}
              height={100}
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Answer Section */}
          <p className="text-sm sm:text-lg text-gray-700">
            {answer || "No answer provided yet."}
          </p>

          {/* Status */}
          <div className="text-xs sm:text-sm text-gray-500">
            Status: {status}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <ArrowBigUpDash className="h-5 w-5 text-green-500" />
                <span>{upvotes}</span>
              </Button>
              <Button variant="outline" size="icon">
                <ArrowBigDownDash className="h-5 w-5 text-red-500" />
              </Button>
              <Button variant="outline">
                <MessageSquareIcon className="h-5 w-5" />
                <span>{comments}</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <BookmarkIcon className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Link2Icon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            aliquid temporibus obcaecati. Eaque libero tempore quas, nobis natus
            dolore vel, a quisquam dolores sit quam quis aliquam doloribus quo
            quasi explicabo. Quis veniam repudiandae unde aliquid excepturi.
            Inventore animi laborum nesciunt repellendus molestias placeat Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Itaque unde ipsum
            minus maiores praesentium, impedit veniam in voluptates illum
            officia quod ex aliquam architecto quos magnam accusamus, dolore
            quaerat dignissimos temporibus delectus? Amet sunt pariatur,
            mollitia illum vel sed autem laboriosam eveniet vitae porro et
            error! Fugit modi iusto quia aspernatur nam laborum? Magnam mollitia
            facere rerum, totam ad itaque id alias cumque facilis, architecto
            porro non voluptate optio eius nobis debitis pariatur explicabo
            recusandae dignissimos! Adipisci sunt asperiores doloribus
            similique, quibusdam obcaecati iste nulla natus vitae hic voluptatem
            et saepe voluptatum tempore, quis, illo est explicabo. Ut, sunt
            dolore. quasi.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default BlogCard;
