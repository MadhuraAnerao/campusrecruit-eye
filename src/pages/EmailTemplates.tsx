
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
import { Button } from '@/components/ui/button';
import { Edit, Copy, Check, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const EmailTemplates = () => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState({
    jobPosting: false,
    roundCompletion: false,
    finalSelection: false
  });
  
  const [templates, setTemplates] = useState({
    jobPosting: {
      subject: "📢 New Job Post – [Job Title] by [Company Name]",
      body: `Dear TPO,

A new job has been posted on PlaceNext. Below are the details:

📢 **Job Title:** [Job Name]
🏢 **Company:** [Company Name]
📅 **Application Deadline:** [Date]
📍 **Location:** [Job Location]

🔗 **View Job Details & Applications:** [Portal Link]

Best Regards,
**[Company Name]**`
    },
    roundCompletion: {
      subject: "🚀 Shortlisted Students for [Job Title] – [Company Name]",
      body: `Dear TPO,

The following students have been **shortlisted for the next round** of the **[Job Title]** recruitment process.

📢 **Job Title:** [Job Name]
🏢 **Company:** [Company Name]
📅 **Next Round:** [Round Name] on [Date & Time]
📍 **Mode:** [Online/Offline]

🔗 **View Full List & Schedule:** [Portal Link]

Best Regards,
**[Company Name]**`
    },
    finalSelection: {
      subject: "🎉 Final Selected Students for [Job Title] – [Company Name]",
      body: `Dear TPO,

We're pleased to announce the **final list of selected students** for the **[Job Title]** position.

📢 **Job Title:** [Job Name]
🏢 **Company:** [Company Name]
👥 **Total Selected:** [Number of Students]
💰 **Package Offered:** [Package Details]

🔗 **Download Complete Report:** [Portal Link]

We thank you for your support throughout the recruitment process.

Best Regards,
**[Company Name]**`
    }
  });
  
  const handleEdit = (template: keyof typeof editMode) => {
    setEditMode({
      ...editMode,
      [template]: !editMode[template]
    });
  };
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The template has been copied to your clipboard."
    });
  };
  
  const handleTemplateChange = (template: keyof typeof templates, field: 'subject' | 'body', value: string) => {
    setTemplates({
      ...templates,
      [template]: {
        ...templates[template],
        [field]: value
      }
    });
  };
  
  const handleSendPreview = (template: keyof typeof templates) => {
    toast({
      title: "Preview Email Sent",
      description: "A preview of the email template has been sent to your account."
    });
  };
  
  const renderEditableTemplate = (template: keyof typeof templates) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${template}-subject`}>Email Subject</Label>
        <Input 
          id={`${template}-subject`}
          value={templates[template].subject}
          onChange={(e) => handleTemplateChange(template, 'subject', e.target.value)}
          placeholder="Enter email subject..."
          disabled={!editMode[template]}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${template}-body`}>Email Body</Label>
        <Textarea 
          id={`${template}-body`}
          value={templates[template].body}
          onChange={(e) => handleTemplateChange(template, 'body', e.target.value)}
          placeholder="Enter email body..."
          disabled={!editMode[template]}
          className="min-h-[300px] font-mono"
        />
      </div>
    </div>
  );
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Email Templates</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>TPO Notification Templates</CardTitle>
          <CardDescription>
            These email templates are used to keep the Training & Placement Officer (TPO) informed about the recruitment process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="jobPosting">
            <TabsList className="w-full">
              <TabsTrigger value="jobPosting" className="flex-grow">Job Posting</TabsTrigger>
              <TabsTrigger value="roundCompletion" className="flex-grow">Round Completion</TabsTrigger>
              <TabsTrigger value="finalSelection" className="flex-grow">Final Selection</TabsTrigger>
            </TabsList>
            
            <TabsContent value="jobPosting" className="pt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Job Posting Notification</CardTitle>
                      <CardDescription>Sent to TPO when a new job is posted</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleCopy(templates.jobPosting.body)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleEdit('jobPosting')}>
                        {editMode.jobPosting ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {renderEditableTemplate('jobPosting')}
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSendPreview('jobPosting')}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Preview
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="roundCompletion" className="pt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Round Completion Notification</CardTitle>
                      <CardDescription>Sent to TPO after each hiring round is completed</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleCopy(templates.roundCompletion.body)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleEdit('roundCompletion')}>
                        {editMode.roundCompletion ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {renderEditableTemplate('roundCompletion')}
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSendPreview('roundCompletion')}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Preview
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="finalSelection" className="pt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Final Selection Notification</CardTitle>
                      <CardDescription>Sent to TPO after the final selection is made</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleCopy(templates.finalSelection.body)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleEdit('finalSelection')}>
                        {editMode.finalSelection ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {renderEditableTemplate('finalSelection')}
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSendPreview('finalSelection')}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Preview
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailTemplates;
