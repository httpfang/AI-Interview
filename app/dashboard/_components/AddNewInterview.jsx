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
  

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState()
    const [jobDesc, setJobDesc] = useState()
    const [jobExperience, setJobExpirience] = useState()
    const onSubmit = (e) => {
      e.preventDefault()
      console.log("onSubmit");
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
                  <Button type="submit">Start Interview</Button>
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
