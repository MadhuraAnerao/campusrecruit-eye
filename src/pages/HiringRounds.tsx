
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Edit, Mail, Plus, Trash, User } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

// Sample rounds data
const initialRounds = [
  {
    id: 1,
    name: 'Resume Screening',
    date: '2024-10-15',
    time: '09:00',
    mode: 'Online',
    status: 'completed',
    students: [
      { id: 1, name: 'Rahul Sharma', email: 'rahul.s@example.com', status: 'selected' },
      { id: 2, name: 'Priya Patel', email: 'priya.p@example.com', status: 'selected' },
      { id: 3, name: 'Amit Kumar', email: 'amit.k@example.com', status: 'rejected' },
      { id: 4, name: 'Sneha Gupta', email: 'sneha.g@example.com', status: 'selected' },
      { id: 5, name: 'Vikram Singh', email: 'vikram.s@example.com', status: 'selected' },
    ]
  },
  {
    id: 2,
    name: 'Aptitude Test',
    date: '2024-10-20',
    time: '10:00',
    mode: 'Online',
    status: 'upcoming',
    students: [
      { id: 1, name: 'Rahul Sharma', email: 'rahul.s@example.com', status: 'pending' },
      { id: 2, name: 'Priya Patel', email: 'priya.p@example.com', status: 'pending' },
      { id: 4, name: 'Sneha Gupta', email: 'sneha.g@example.com', status: 'pending' },
      { id: 5, name: 'Vikram Singh', email: 'vikram.s@example.com', status: 'pending' },
    ]
  },
  {
    id: 3,
    name: 'Technical Interview',
    date: '2024-10-25',
    time: '11:00',
    mode: 'Offline',
    status: 'upcoming',
    students: []
  },
  {
    id: 4,
    name: 'HR Interview',
    date: '2024-10-30',
    time: '14:00',
    mode: 'Offline',
    status: 'upcoming',
    students: []
  }
];

const HiringRounds = () => {
  const [rounds, setRounds] = useState(initialRounds);
  const [activeRound, setActiveRound] = useState("1");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRound, setCurrentRound] = useState({
    id: 0,
    name: '',
    date: '',
    time: '',
    mode: 'Online'
  });
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentRound({
      ...currentRound,
      [name]: value
    });
  };
  
  const handleModeChange = (value: string) => {
    setCurrentRound({
      ...currentRound,
      mode: value
    });
  };
  
  const handleSubmit = () => {
    if (editMode) {
      // Update existing round
      setRounds(rounds.map(round => 
        round.id === currentRound.id ? { ...round, ...currentRound } : round
      ));
      toast({
        title: "Round Updated",
        description: `${currentRound.name} has been updated successfully.`
      });
    } else {
      // Add new round
      const newRound = {
        ...currentRound,
        id: rounds.length + 1,
        status: 'upcoming',
        students: []
      };
      setRounds([...rounds, newRound]);
      toast({
        title: "Round Added",
        description: `${currentRound.name} has been added to the hiring process.`
      });
    }
    
    setDialogOpen(false);
    resetForm();
  };
  
  const resetForm = () => {
    setCurrentRound({
      id: 0,
      name: '',
      date: '',
      time: '',
      mode: 'Online'
    });
    setEditMode(false);
  };
  
  const handleEditRound = (round: any) => {
    setCurrentRound({
      id: round.id,
      name: round.name,
      date: round.date,
      time: round.time,
      mode: round.mode
    });
    setEditMode(true);
    setDialogOpen(true);
  };
  
  const handleSendResults = (roundId: number) => {
    toast({
      title: "Results Sent",
      description: `The results for ${rounds.find(r => r.id === roundId)?.name} have been sent to the TPO.`
    });
  };
  
  const handleStudentStatusChange = (roundId: number, studentId: number, newStatus: 'selected' | 'rejected' | 'pending') => {
    setRounds(rounds.map(round => {
      if (round.id === roundId) {
        return {
          ...round,
          students: round.students.map(student => 
            student.id === studentId ? { ...student, status: newStatus } : student
          )
        };
      }
      return round;
    }));
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Hiring Rounds</h1>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              resetForm();
              setDialogOpen(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Round
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editMode ? 'Edit Hiring Round' : 'Add New Hiring Round'}</DialogTitle>
              <DialogDescription>
                {editMode 
                  ? 'Update the details for this hiring round.' 
                  : 'Add a new round to the hiring process. You can schedule and manage candidates for this round.'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Round Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={currentRound.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Technical Interview"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={currentRound.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={currentRound.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mode">Mode</Label>
                <Select value={currentRound.mode} onValueChange={handleModeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setDialogOpen(false);
                resetForm();
              }}>Cancel</Button>
              <Button onClick={handleSubmit}>{editMode ? 'Update' : 'Add'} Round</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="1" value={activeRound} onValueChange={setActiveRound}>
        <TabsList className="w-full">
          {rounds.map(round => (
            <TabsTrigger key={round.id} value={String(round.id)} className="flex-grow">
              {round.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {rounds.map(round => (
          <TabsContent key={round.id} value={String(round.id)} className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{round.name}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-6 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{round.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{round.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-gray-500" />
                          <span>{round.mode}</span>
                        </div>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditRound(round)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="default" onClick={() => handleSendResults(round.id)}>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Results to TPO
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Students</h3>
                    {round.students.filter(s => s.status === 'selected').length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        {round.students.filter(s => s.status === 'selected').length} selected of {round.students.length} total
                      </div>
                    )}
                  </div>
                  
                  {round.students.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {round.students.map(student => (
                          <TableRow key={student.id}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>
                              <span className={
                                student.status === 'selected' 
                                  ? 'text-green-600 font-medium' 
                                  : student.status === 'rejected' 
                                    ? 'text-red-600 font-medium' 
                                    : 'text-amber-600 font-medium'
                              }>
                                {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              {student.status === 'pending' && (
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                    onClick={() => handleStudentStatusChange(round.id, student.id, 'selected')}
                                  >
                                    Select
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleStudentStatusChange(round.id, student.id, 'rejected')}
                                  >
                                    Reject
                                  </Button>
                                </div>
                              )}
                              {student.status !== 'pending' && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleStudentStatusChange(round.id, student.id, 'pending')}
                                >
                                  Reset
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      {round.status === 'upcoming' 
                        ? "Students will be added after previous rounds are completed." 
                        : "No students in this round yet."}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <div className="text-sm text-muted-foreground">
                  {round.status === 'completed' 
                    ? "This round has been completed." 
                    : round.status === 'upcoming' 
                      ? "This round is upcoming." 
                      : "This round is in progress."}
                </div>
                {round.status === 'upcoming' && Number(activeRound) > 1 && (
                  <Button variant="outline">
                    Add Selected Students from Previous Round
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default HiringRounds;
