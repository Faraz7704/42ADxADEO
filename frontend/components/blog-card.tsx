import React from "react";
import Image, { StaticImageData } from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigUpDash, ArrowBigDownDash, MessageSquareIcon, BookmarkIcon, Link2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import DefaultLogo from "@/public/departments/Default.png";


type BlogCardProps = {
  id: number;
  question: string;
  answer?: string;
  departments: string[];
  logo?: StaticImageData | string;
  date: string;
  status: "not answered" | "approved" | "under discussion";
  upvotes: number;
  comments: number;
};

const BlogCard: React.FC<BlogCardProps> = ({
  question,
  departments,
  logo = DefaultLogo, 
  date,
  status,
  upvotes,
  comments,
}) => {
  const getStatusColor = (status: string) => {
    if (status === "approved") return "bg-green-500";
    if (status === "under discussion") return "bg-yellow-500";
    if (status === "not answered") return "bg-red-500";
    return "bg-gray-300";
  };

  return (
    <Card className="flex flex-col h-full relative transition-all duration-300 transform hover:shadow-lg">
      {/* Status Indicator Circle */}
      <div
        className={cn(
          "absolute top-2 right-2 w-3 h-3 rounded-full",
          getStatusColor(status)
        )}
      ></div>

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

      <CardContent className="flex-grow flex items-end justify-center">
        <div className="flex justify-center items-center w-full h-32 bg-white border border-gray-200 rounded-md p-4">
          {logo ? (
            <Image
              src={logo}
              alt={departments.join(", ")}
              height={80}
              style={{ objectFit: "contain" }}
            />
          ) : (
            <div className="text-gray-500">No logo available</div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center p-4 border-t rounded-b-md bg-white mt-auto">
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
  );
};

export default BlogCard;
