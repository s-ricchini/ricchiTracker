import * as z from 'zod';


export const itemsSideBarSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  type: z.enum(['file', 'folder']),
  color: z.string(),
  parent_id: z.uuid().nullable(),
  position: z.number().positive().default(100)
})

