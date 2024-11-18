import React, { useState } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { XIcon } from "lucide-react";
import avatar from "@/public/avatar.jpeg";
import placeholder from "@/public/avatar_placeholder.png";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type BlogCardProps = {
  id: number;
  question: string;
  answer?: string;
  aiSummary?: string;
  departments: string[];
  logo?: string | StaticImageData;
  date: string;
  status: "not answered" | "approved" | "under discussion";
  upvotes: number;
  comments: number;
};

const BlogCard: React.FC<BlogCardProps> = ({
  question,
  aiSummary,
  departments = [],
  logo,
  date,
  status,
  upvotes,
  comments,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const [personalExpertise, setPersonalExpertise] = useState("");
  const [history, setHistory] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [commentsList, setCommentsList] = useState<
    {
      avatar: string;
      name: string;
      date: string;
      expertise: string;
      history: string;
    }[]
  >([
    {
      avatar: placeholder.src,
      name: "Aisha Alharthi",
      date: new Date().toISOString().split("T")[0],
      expertise:
        "I believe AI will bring a lot of positive changes to education.",
      history: "10 years of experience in the education sector.",
    },
  ]);

  const getStatusColor = (status: string) => {
    if (status === "approved") return "bg-green-500";
    if (status === "under discussion") return "bg-yellow-500";
    if (status === "not answered") return "bg-red-500";
    return "bg-gray-300";
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSummaryExpandClick = () => {
    setIsSummaryExpanded(!isSummaryExpanded);
  };

  const handleSubmitComment = () => {
    const newComment = {
      avatar: typeof logo === "string" ? logo : avatar.src,
      name: "Abdullah Almansouri", // You may replace this with the logged-in user's name.
      date: new Date().toISOString().split("T")[0],
      expertise: personalExpertise,
      history,
    };

    setCommentsList((prev) => [...prev, newComment]);

    // Clear the form after submission
    setPersonalExpertise("");
    setHistory("");
    setFiles([]);
    setIsExpanded(false);
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

        <CardContent className="flex-grow flex  justify-center">
          <div className=" p-4 border border-gray-300 rounded-md w-full bg-white">
                <h3 className="text-md font-semibold text-gray-800">
                  Description:
                </h3>
                <p className="text-sm text-gray-700">
                  {aiSummary && aiSummary.length > 100 ? (
                    <>
                      {isSummaryExpanded
                        ? aiSummary
                        : `${aiSummary.substring(0, 150)}...`}
                    </>
                  ) : (
                    aiSummary || "No Description available."
                  )}
                </p>
              </div>
            
        </CardContent>

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
        <div className="relative">
          <div className="flex max-w-full sm:max-w-lg md:max-w-5xl min-h-[400px] sm:min-h-[500px] p-6 sm:p-8 bg-white rounded shadow-xl justify-center relative">
            <div className="w-[60%] me-8 max-h-[70vh] space-y-4  overflow-y-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 p-2 text-gray-600 hover:text-gray-800 z-50"
                aria-label="Close"
              >
                <XIcon className="h-6 w-6" />
              </button>

              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                {question}
              </h2>

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

              <p className="text-xs sm:text-sm text-gray-500">{date}</p>

              <div className="text-xs sm:text-sm text-gray-500">
                Status: {status}
              </div>

              <div className=" p-4 border border-gray-300 rounded-md w-full bg-white">
                <h3 className="text-md font-semibold text-gray-800">
                  Description:
                </h3>
                <p className="text-sm text-gray-700">
                  {aiSummary && aiSummary.length > 100 ? (
                    <>
                      {isSummaryExpanded
                        ? aiSummary
                        : `${aiSummary.substring(0, 150)}...`}
                        <Button
                        onClick={handleSummaryExpandClick}
                        variant="outline"
                        className=" m-2"
                      >
                        {isSummaryExpanded ? "Show less" : "Show more"}
                      </Button>
                    </>
                  ) : (
                    aiSummary || "No Description available."
                  )}
                </p>
              </div>

              <div className="mt-4 p-4 border rounded-md border-gray-300 bg-white">
                <h4 className="text-md font-semibold text-gray-800">
                  Attached Documents:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {files.length > 0 ? (
                    files.map((file, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-white rounded-full shadow-sm"
                      >
                        {file.name}
                      </span>
                    ))
                  ) : (
                    <>
                      <Button variant="outline">Example_File_1.pdf</Button>
                      <Button variant="outline">Example_File_2.docx</Button>
                      <Button variant="outline">Example_Image.png</Button>
                    </>
                  )}
                </div>
              </div>

              <CardFooter className="flex justify-between items-center p-4 border rounded-md bg-white mt-4">
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
              </CardFooter>
                  <div className="border-t my-4"></div>
              <div className="mt-4 p-4 border border-gray-300 rounded-md bg-white">
                <h3 className="text-md font-semibold text-gray-800">
                  AI Summary:
                </h3>
                <p className="text-sm text-gray-700">
                  {aiSummary && aiSummary.length > 200 ? (
                    <>
                      {isSummaryExpanded
                        ? aiSummary
                        : `${aiSummary.substring(0, 200)}...`}
                      <Button
                        onClick={handleSummaryExpandClick}
                        variant="outline"
                        className=" m-2"
                      >
                        {isSummaryExpanded ? "Show less" : "Show more"}
                      </Button>
                    </>
                  ) : (
                    aiSummary || "No AI summary available."
                  )}
                </p>
              </div>
              <div className="mt-4 p-4 border rounded-md border-gray-300 bg-white">
                <h4 className="text-md font-semibold text-gray-800">
                  Relevant Documents:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {files.length > 0 ? (
                    files.map((file, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-white rounded-full shadow-sm"
                      >
                        {file.name}
                      </span>
                    ))
                  ) : (
                    <>
                      <Button variant="outline">Example_File_1.pdf</Button>
                      <Button variant="outline">Example_File_2.docx</Button>
                      <Button variant="outline">Example_Image.png</Button>
                    </>
                  )}
                </div>
              </div>
            </div>
            

            {/* Comment Section */}
            <div className="w-[40%] max-h-[70vh] p-4 border-l overflow-y-auto">
              <div className="">
                <Button
                  variant="outline"
                  onClick={handleExpandClick}
                  className="flex items-center w-full justify-between p-4"
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src={logo || `${placeholder.src}?height=40&width=40`}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span>Share your thoughts</span>
                  </div>
                </Button>
              </div>

              {isExpanded && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="personalExpertise">
                      Personal Expertise Opinion
                    </Label>
                    <Textarea
                      id="personalExpertise"
                      value={personalExpertise}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setPersonalExpertise(e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="history">History</Label>
                    <Textarea
                      id="history"
                      value={history}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setHistory(e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="file">Upload Files</Label>
                    <Input
                      id="file"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsExpanded(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSubmitComment}>Submit</Button>
                  </div>
                </div>
              )}

              {/* Display Existing Comments */}
              <div className="mt-6 space-y-4">
                {commentsList.map((comment, index) => (
                  <div
                    key={index}
                    className="flex space-x-4 p-4 border rounded-md"
                  >
                    <Image
                      src={comment.avatar}
                      alt={`${comment.name}'s Avatar`}
                      width={40}
                      height={40}
                      className="rounded-full w-[40px] h-[40px] object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{comment.name}</span>
                        <span className="text-xs text-gray-500">
                          {comment.date}
                        </span>
                      </div>
                      <p className="text-sm mt-2">
                        <strong>Expertise Opinion:</strong> {comment.expertise}
                      </p>
                      <p className="text-sm mt-1">
                        <strong>History:</strong> {comment.history}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BlogCard;
