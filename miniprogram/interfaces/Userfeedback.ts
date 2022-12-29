import { IAttachment } from "./common";

export interface IUserFeedbackCreate {
  feedbackTitle: string,
  feedbackDetail: string,
  attachmentId: string
}
export interface IUserFeedback {
  "id": string,
  "userId": string,
  "userType": string,
  "feedbackTitle": string,
  "feedbackDetail": string,
  "attachmentId": string,
  "isSolve": string,
  "attachment": IAttachment,
  "isDelete": string,
  "createTime": string,
}

