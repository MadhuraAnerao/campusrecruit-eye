
import React, { useState } from 'react';
import { JobCard } from '@/components/jobs/JobCard';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Sample job data
const sampleJobs = [
  {
    id: 1,
    title: 'FINANCIAL ANALYST',
    company: 'MORGAN STANLEY',
    location: 'NAGPUR, INDIA',
    postDate: '7/10/2024',
    description: 'ANALYZE FINANCIAL DATA, PREPARE REPORTS, AND ASSIST IN INVESTMENT DECISIONS.',
    eligibility: false,
    salary: '80000'
  },
  {
    id: 2,
    title: 'SOFTWARE ENGINEER',
    company: 'J.P. MORGAN & CHASE',
    location: 'MUMBAI, INDIA',
    postDate: '28/9/2024',
    description: 'DEVELOP AND MAINTAIN SOFTWARE SOLUTIONS FOR BANKING OPERATIONS.',
    eligibility: false,
    salary: '95000'
  },
  {
    id: 3,
    title: 'INVESTMENT ANALYST',
    company: 'NOMURA',
    location: 'GURGAON',
    postDate: '2/10/2024',
    description: 'SUPPORT SENIOR ANALYSTS IN EVALUATING INVESTMENT OPPORTUNITIES.',
    eligibility: false,
    salary: '90000'
  },
  {
    id: 4,
    title: 'MARKETING SPECIALIST',
    company: 'GENERAL MILLS',
    location: 'DELHI',
    postDate: '20/9/2024',
    description: 'DEVELOP AND IMPLEMENT MARKETING STRATEGIES FOR CONSUMER PRODUCTS.',
    eligibility: true,
    salary: '75000'
  },
  {
    id: 5,
    title: 'DATA ANALYTICS',
    company: 'ACCENTURE',
    location: 'MUMBAI, INDIA',
    postDate: '3/10/2024',
    description: 'ANALYZE BUSINESS DATA AND PROVIDE INSIGHTS FOR STRATEGIC DECISIONS.',
    eligibility: true,
    salary: '85000'
  },
  {
    id: 6,
    title: 'IT CONSULTANT',
    company: 'CAPGEMINI',
    location: 'BANGALORE, INDIA',
    postDate: '25/9/2024',
    description: 'PROVIDE IT CONSULTING SERVICES TO CLIENTS ACROSS VARIOUS INDUSTRIES.',
    eligibility: true,
    salary: '82000'
  }
];

const JobPostings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState(sampleJobs);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    eligibility: true,
    salary: ''
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };
  
  const handleSubmit = () => {
    const jobToAdd = {
      ...newJob,
      id: jobs.length + 1,
      postDate: new Date().toLocaleDateString('en-GB')
    };
    
    setJobs([jobToAdd, ...jobs]);
    setOpen(false);
    
    toast({
      title: "Job Posted Successfully",
      description: "Your job has been posted and notifications sent to TPO",
    });
    
    // Reset form
    setNewJob({
      title: '',
      company: '',
      location: '',
      description: '',
      eligibility: true,
      salary: ''
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Job Postings</h1>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Post New Job</DialogTitle>
              <DialogDescription>
                Create a new job posting. This will be visible to students and TPO.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={newJob.title} 
                    onChange={handleInputChange} 
                    placeholder="e.g. Software Engineer" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input 
                    id="company" 
                    name="company" 
                    value={newJob.company} 
                    onChange={handleInputChange} 
                    placeholder="e.g. Accenture" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    value={newJob.location} 
                    onChange={handleInputChange} 
                    placeholder="e.g. Mumbai, India" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary (₹)</Label>
                  <Input 
                    id="salary" 
                    name="salary" 
                    type="number" 
                    value={newJob.salary} 
                    onChange={handleInputChange} 
                    placeholder="e.g. 80000" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={newJob.description} 
                  onChange={handleInputChange} 
                  placeholder="Describe the job responsibilities and requirements..." 
                  className="h-24"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>Post Job</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search jobs by title, company, or location..." 
          className="pl-10"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map(job => (
          <JobCard 
            key={job.id}
            title={job.title} 
            company={job.company}
            location={job.location}
            postDate={job.postDate}
            description={job.description}
            eligibility={job.eligibility}
            salary={job.salary}
          />
        ))}
      </div>
      
      {filteredJobs.length === 0 && (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium text-gray-500">No jobs found</h3>
          <p className="text-sm text-gray-400">Try adjusting your search or post a new job</p>
        </div>
      )}
    </div>
  );
};

export default JobPostings;
