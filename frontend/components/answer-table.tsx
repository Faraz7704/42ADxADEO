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
  summary: string;
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
    summary: "How will AI impact education in the coming decade?",
    date: "2024-11-18",
  },
  {
    id: 2,
    status: "under discussion",
    name: "Aisha Alharthi",
    summary: "What are the main environmental challenges facing agriculture?",
    date: "2024-11-17",
  },
  {
    id: 3,
    status: "approved",
    name: "Omar Alrasheed",
    summary: "How can renewable energy be made more affordable?",
    date: "2024-11-16",
  },
  {
    id: 4,
    status: "approved",
    name: "Fatima Alnuaimi",
    summary: "What are the uses of machine learning in healthcare?",
    date: "2024-11-15",
  },
  {
    id: 5,
    status: "under discussion",
    name: "Yusuf Alhamadi",
    summary: "How does meditation contribute to mental health?",
    date: "2024-11-14",
  },
  {
    id: 6,
    status: "approved",
    name: "Layla Alshamsi",
    summary: "How can blockchain enhance data security in the digital age?",
    date: "2024-11-13",
  },
  {
    id: 7,
    status: "approved",
    name: "Hassan Alshehhi",
    summary: "What are the major economic benefits of adopting renewable energy?",
    date: "2024-11-12",
  },
  {
    id: 8,
    status: "approved",
    name: "Mariam Almazrouei",
    summary: "How can we promote sustainable urban development?",
    date: "2024-11-11",
  },
  {
    id: 9,
    status: "approved",
    name: "Ahmed Alghafli",
    summary: "What are the key features of quantum computing?",
    date: "2024-11-10",
  },
  {
    id: 10,
    status: "approved",
    name: "Zainab Alhaddad",
    summary: "How can diet influence overall mental well-being?",
    date: "2024-11-09",
  },
];

export default function AnswerTable() {
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
            <TableHead>Request title</TableHead>
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
              <TableCell>{question.summary}</TableCell>
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
