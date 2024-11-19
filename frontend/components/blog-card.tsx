import React, { useState } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { XIcon, Calendar, PenIcon } from "lucide-react";
import avatar from "@/public/avatar.jpeg";
import placeholder from "@/public/avatar_placeholder.png";
import "./style.css";

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
  requestDescription?: string;
  departments: string[];
  logo?: string | StaticImageData;
  date: string;
  status: "not answered" | "approved" | "under discussion";
  statusColor: string;
  upvotes: number;
  comments: number;
};


const BlogCard: React.FC<BlogCardProps> = ({
  question,
  aiSummary,
  requestDescription,
  departments = [],
  logo,
  date,
  status,
  statusColor,
  upvotes,
  comments,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const [personalExpertise, setPersonalExpertise] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [commentsList, setCommentsList] = useState<
    {
      avatar: string;
      name: string;
      date: string;
      expertise: string;
      department: string;
    }[]
  >([
    {
      avatar: placeholder.src,
      name: "Aisha Alharthi",
      date: new Date().toISOString().split("T")[0],
      expertise:
        "I believe AI will bring a lot of positive changes to education.",
      department: "Finance",
    },
  ]);

  const getStatusColor = (status: string) => {
    if (status === "approved") return "bg-green-500";
    if (status === "under discussion") return "bg-yellow-500";
    if (status === "not answered") return "bg-red-500";
    return "bg-gray-300";
  };
  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-500";
      case "under discussion":
        return "text-yellow-500";
      case "not answered":
        return "text-red-500";
      default:
        return "text-gray-300";
    }
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
      name: "Abdullah Almansouri",
      date: new Date().toISOString().split("T")[0],
      expertise: personalExpertise,
      department: departments[0],
    };

    setCommentsList((prev) => [...prev, newComment]);
    setPersonalExpertise("");
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
            "absolute top-2 right-2 w-3 h-3 rounded-full modal-right-header",
            getStatusColor(status)
          )}
        ></div>

        {/* Card Header */}
        <CardHeader className="space-y-4 min-h-[190px] flex flex-col">
          <CardTitle className="leading-5">
            {question || "No question provided"}
          </CardTitle>
          <CardDescription className="flex flex-col h-[100%] mt-auto align-bottom justify-between">
            <div className="flex flex-col align-middle justify-between space-y-2 h-[100%]">
              <div className="flex flex-wrap gap-2 ">
                {departments.map((dept, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-1 text-xs border border-gray-300 rounded-md bg-white shadow-sm inline h-auto"
                  >
                    {dept}
                  </div>
                ))}
              </div>
              <span>{date || "No date available"}</span>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow flex justify-center">
          <div className="p-4 border border-gray-300 rounded-md w-full bg-white">
            <h3 className="text-md font-semibold text-gray-800">Description:</h3>
            <p className="text-sm text-gray-700 desc-text">
            {requestDescription && requestDescription.length > 100 ? (
                  <>
                    {isSummaryExpanded
                      ? requestDescription
                      : `${requestDescription.substring(0, 250)}`}
                    {requestDescription.length > 250 && (
                      <Button
                        onClick={handleSummaryExpandClick}
                        variant="outline"
                        className="my-2 text-xs p-3"
                      >
                        {isSummaryExpanded ? "Show less" : "Show more"}
                      </Button>
                    )}
                  </>
                ) : (
                  requestDescription || "No Description available."
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
        {/* <div className="relative"> */}
        <div className="flex max-w-full sm:max-w-lg md:max-w-5xl min-h-[400px] sm:min-h-[500px] bg-white rounded-sm shadow-xl justify-center border-gray-300 border-[3px] relative">
          <div className="scrollbar-container w-[60%] me-5 p-4  max-h-[70vh] space-y-4  overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-800 z-50"
              aria-label="Close"
            >
              <XIcon className="h-6 w-6" />
            </button>

            <h2 className="modal-title text-1xl sm:text-2xl font-bold leading-4 text-gray-900">
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

            <div className="flex align-middle">
              <Calendar className="w-5 h-5 me-1 text-blue-500" />
              <p className="text-xs sm:text-sm text-blue-500 m-0 font-bold leading-0">
                {date}
              </p>
            </div>

            <div className="text-xs sm:text-sm font-bold">
              Status: <span className={`font-medium uppercase ${getStatusTextColor(status)}`}>{status}</span>
            </div>

            <div className=" p-4 border border-gray-300 rounded-md w-full bg-white">
              <h3 className="text-md font-semibold mb-1 text-gray-800">
                Description:
              </h3>
              <p className="text-sm text-gray-700 flex flex-col items-start ">
                {requestDescription && requestDescription.length > 100 ? (
                  <>
                    {isSummaryExpanded
                      ? requestDescription
                      : `${requestDescription.substring(0, 250)}`}
                    {requestDescription.length > 250 && (
                      <Button
                        onClick={handleSummaryExpandClick}
                        variant="outline"
                        className="my-2 text-xs p-3"
                      >
                        {isSummaryExpanded ? "Show less" : "Show more"}
                      </Button>
                    )}
                  </>
                ) : (
                  requestDescription || "No Description available."
                )}
              </p>
            </div>

            <div className="mt-4 p-4 border rounded-md border-gray-300 bg-white">
              <h4 className="text-md font-semibold mb-1 text-gray-800">
                Attached Documents:
              </h4>
              <div className="flex flex-wrap gap-2 justify-between">
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
              <h3 className="text-md font-semibold mb-1 text-gray-800">
                AI Summary:
              </h3>
              <p className="text-sm text-gray-700 flex flex-col items-start">
                {aiSummary && aiSummary.length > 200 ? (
                  <>
                    {isSummaryExpanded
                      ? aiSummary
                      : `${aiSummary.substring(0, 200)}...`}
                    <Button
                      onClick={handleSummaryExpandClick}
                      variant="outline"
                      className="my-2 text-xs p-3"
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
              <h4 className="text-md font-semibold mb-1 text-gray-800">
                Relevant Documents:
              </h4>
              <div className="flex flex-wrap gap-2 justify-between">
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
          <div className="scrollbar-container w-[40%] max-h-[70vh] p-4 py-16 border-l overflow-y-auto">
            <div className="">
              <Button
                variant="outline"
                onClick={handleExpandClick}
                className="flex items-center w-full justify-between p-4"
              >
                <div className="flex items-center space-x-3">
                  <PenIcon/>
                  <span className="text-gray-500">Share your thoughts</span>
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
                    <div className="flex items-center justify-between space-x-2">
                      <span className="font-bold text-blue-400">
                        {comment.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-sm mt-1">
                      <strong>Expertise Opinion:</strong> {comment.expertise}
                    </p>
                    <p className="text-sm mt-1">
          <strong>Department:</strong> {comment.department}
        </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div>
        <div>{children}</div>
      </div>
    </div> */}
        {/* </div> */}
      </Modal>
    </>
  );
};

export default BlogCard;
