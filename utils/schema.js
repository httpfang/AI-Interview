import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("MockInterview", {
    id:serial('id').primaryKey(),
    jasonMockResp:text('jasonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:text('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    CreatedBy:varchar('createdBy').notNull(),
    MockId:varchar('MockId').notNull()
})