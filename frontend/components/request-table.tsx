import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, HelpCircle, XCircle } from "lucide-react";

type Status = "approved" | "under discussion" | "not answered";

interface Question {
  id: number;
  status: Status;
  name: string;
  question: string;
  date: string;
}

const statusIcons = {
  approved: <CheckCircle className="h-4 w-4 text-green-500" />,
  "under discussion": <HelpCircle className="h-4 w-4 text-yellow-500" />,
  "not answered": <XCircle className="h-4 w-4 text-red-500" />,
};

// JSON object containing data for the table
const mockData: Question[] = [
  {
    id: 1,
    status: "approved",
    name: "Abdullah Almansouri",
    question: "What is the impact of AI on modern education?",
    date: "2024-11-10",
  },
  {
    id: 2,
    status: "approved",
    name: "Abdullah Almansouri",
    question: "How does climate change affect agricultural production?",
    date: "2024-11-09",
  },
  {
    id: 3,
    status: "not answered",
    name: "Abdullah Almansouri",
    question: "What are the challenges of renewable energy adoption?",
    date: "2024-11-08",
  },
  {
    id: 4,
    status: "approved",
    name: "Abdullah Almansouri",
    question: "How can machine learning be used in healthcare?",
    date: "2024-11-07",
  },
  {
    id: 5,
    status: "not answered",
    name: "Abdullah Almansouri",
    question: "What are the benefits of meditation for mental health?",
    date: "2024-11-06",
  },
  {
    id: 6,
    status: "not answered",
    name: "Abdullah Almansouri",
    question: "How does blockchain technology ensure data security?",
    date: "2024-11-05",
  },
];

export default function RequestTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const paginatedData = mockData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  return (
    <div className="w-full space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Select</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((question) => (
            <TableRow key={question.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(question.id)}
                  onCheckedChange={() => handleRowSelect(question.id)}
                  aria-label={`Select ${question.name}`}
                />
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="flex items-center gap-2">
                  {statusIcons[question.status]}
                  {question.status}
                </Badge>
              </TableCell>
              <TableCell>{question.name}</TableCell>
              <TableCell>{question.question}</TableCell>
              <TableCell>{question.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center">
        <div>
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, mockData.length)} of{" "}
          {mockData.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
}
