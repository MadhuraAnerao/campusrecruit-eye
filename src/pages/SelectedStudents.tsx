
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, Mail, FileSpreadsheet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Sample selected students data
const sampleStudents = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul.s@example.com', department: 'Computer Science', cgpa: 8.7, package: '12 LPA', position: 'Software Engineer' },
  { id: 2, name: 'Priya Patel', email: 'priya.p@example.com', department: 'Information Technology', cgpa: 9.2, package: '14 LPA', position: 'Frontend Developer' },
  { id: 3, name: 'Sneha Gupta', email: 'sneha.g@example.com', department: 'Computer Science', cgpa: 8.9, package: '13 LPA', position: 'Backend Developer' },
  { id: 4, name: 'Vikram Singh', email: 'vikram.s@example.com', department: 'Electronics', cgpa: 8.5, package: '10 LPA', position: 'Hardware Engineer' },
  { id: 5, name: 'Ananya Desai', email: 'ananya.d@example.com', department: 'Information Technology', cgpa: 9.0, package: '15 LPA', position: 'Full Stack Developer' },
  { id: 6, name: 'Arjun Mehta', email: 'arjun.m@example.com', department: 'Computer Science', cgpa: 8.8, package: '13.5 LPA', position: 'DevOps Engineer' },
  { id: 7, name: 'Neha Reddy', email: 'neha.r@example.com', department: 'Electronics', cgpa: 8.6, package: '11 LPA', position: 'System Engineer' },
  { id: 8, name: 'Karan Malhotra', email: 'karan.m@example.com', department: 'Mechanical', cgpa: 8.3, package: '9 LPA', position: 'Design Engineer' },
];

const SelectedStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState(sampleStudents);
  const { toast } = useToast();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.position.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDownload = () => {
    toast({
      title: "Report Downloaded",
      description: "The selected students report has been downloaded as an Excel file."
    });
  };
  
  const handleSendToTPO = () => {
    toast({
      title: "Report Sent to TPO",
      description: "The final selected students list has been sent to the TPO."
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Final Selected Students</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download Excel
          </Button>
          <Button onClick={handleSendToTPO}>
            <Mail className="h-4 w-4 mr-2" />
            Send to TPO
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Selected</CardDescription>
            <CardTitle className="text-3xl">{students.length}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Package</CardDescription>
            <CardTitle className="text-3xl">₹12.25 LPA</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Highest Package</CardDescription>
            <CardTitle className="text-3xl">₹15 LPA</CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search by name, email, department, or position..." 
          className="pl-10"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileSpreadsheet className="h-5 w-5 mr-2" />
            Selected Students Report
          </CardTitle>
          <CardDescription>
            Final list of students who have been selected after all hiring rounds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>CGPA</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Position</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.cgpa}</TableCell>
                  <TableCell className="font-semibold">₹{student.package}</TableCell>
                  <TableCell>{student.position}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium text-gray-500">No students found</h3>
              <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectedStudents;
