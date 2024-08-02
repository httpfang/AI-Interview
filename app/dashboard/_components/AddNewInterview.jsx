'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAiModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
  

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState()
    const [jobDesc, setJobDesc] = useState()
    const [jobExperience, setJobExpirience] = useState()
    const [jasonResponse, setJasonResponse] = useState([])
    const[loading, setLoading] = useState(false)
    const {user} = useUser()
    const onSubmit = async(e) => {
      setLoading(true);
      e.preventDefault();
      console.log("onSubmit");
      const InputPrompt =
        "Job Position: " +
        jobPosition +
        ", Job Description: " +
        jobDesc +
        ", Years of Experience: " +
        jobExperience +
        ", Depends on this information please give me " +
        process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
        " Interview question with Answered in Json Format, Give Question and Answered as field in JSON";
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResponse = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      console.log(JSON.parse(MockJsonResponse));
      setJasonResponse(MockJsonResponse);
      if (MockJsonResponse) {
        const response = await db
          .insert(MockInterview)
          .values({
            MockId: uuidv4(),
            jasonMockResp: MockJsonResponse,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            CreatedBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("dd-mm-yyyy"),
          })
          .returning({ MockId: MockInterview.MockId });
        console.log("inserted id:", response);
      }
      else {
        console.log('error in response')
      }
      setLoading(false);
    }
  return (
    <div>
      <div
        className="p-10border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tells Us More About Your Interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add details about your job position/role, job description
                    and years of experience
                  </h2>
                  <div className="mt-4 my-3">
                    <lebel>Job role/Job Position</lebel>
                    <Input
                      className="mt-3"
                      placeholder="Eg: frontend developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <lebel>Job description/ Tech stack (in short)</lebel>
                    <Textarea
                      className="mt-3"
                      placeholder="Eg: React, next, angular"
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className=" my-3">
                    <lebel>Years of experience</lebel>
                    <Input className="mt-3" placeholder="Eg.5" type="number" required onChange={(e) => setJobExpirience(e.target.value)}/>
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    className="border-none"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                   { loading?
                   <>
                    <LoaderCircle className='animate-spin'/>'Gnerating from AI'</>: 'Start interview'}</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview
