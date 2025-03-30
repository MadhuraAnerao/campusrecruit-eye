
import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  postDate: string;
  description: string;
  eligibility: boolean;
  salary: string;
  className?: string;
}

export function JobCard({
  title,
  company,
  location,
  postDate,
  description,
  eligibility,
  salary,
  className
}: JobCardProps) {
  return (
    <div className={cn("job-card", className)}>
      <h3 className="job-title">{title}</h3>
      <p className="company-name">{company}</p>
      
      <div className="flex justify-between mb-3">
        <div className="job-location">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>
        <div className="job-date">
          <Clock className="h-3 w-3" />
          <span>POSTED: {postDate}</span>
        </div>
      </div>
      
      <p className="job-description">{description}</p>
      
      <div className="flex justify-between items-center">
        <div className={`job-eligibility ${eligibility ? 'text-green-600' : 'text-red-500'}`}>
          ELIGIBILITY: {eligibility ? 'YES' : 'NO'}
        </div>
        <div className="job-salary">₹{salary}</div>
      </div>
    </div>
  );
}
