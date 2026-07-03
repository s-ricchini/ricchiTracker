import { TokenPayload } from "../types/allTypes.js";

declare global {
  namespace Express {
    interface Request {
      session?: TokenPayload; // La hacés opcional con '?'
    }
  }
}