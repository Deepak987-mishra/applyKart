export const baseURL = "https://applykart.azurewebsites.net/api/";

// https://applykart.azurewebsites.net/api/JobPoster/PostJob
//https://applykart.azurewebsites.net/api/JobPoster/CompanyDetails?user_profile_id=285
//https://applykart.azurewebsites.net/api/JobPoster/JobDetails

export const serviceUrl = {
  user: baseURL + "User/",
  job: baseURL + "JobPoster/",
  otp: baseURL + "GenerateOtp",
  verifyOtp: baseURL + "VerifyUserOtp",
  seekerList: baseURL + "JobSeekers",
  candidateDetail: baseURL,
  uploadDocument: baseURL + "JobPoster",
  company: baseURL + "JobPoster/",
  edit: baseURL + "JobPoster/",
};
export const apiRoutes = {
  //Authentication
  accessToken: serviceUrl.user + "access-token",
  seekerList: serviceUrl.seekerList,
  register: serviceUrl.user + "Sign-up",
  login: serviceUrl.user + "Login",
  jobPost: serviceUrl.job + "PostJob",
  editJob: serviceUrl.edit + "JobDetail",
  otp: serviceUrl.otp,
  verifyOtp: serviceUrl.verifyOtp,
  resetPassword: serviceUrl.user + "ResetPassword",
  changePassword: serviceUrl.user + "ChangePassword",
  verifyForgotPasswordOtp: serviceUrl.user + "VerifyForgetPasswordOTP",
  candidateDetail: serviceUrl.candidateDetail,
  jobSeeker: baseURL + "JobSeeker/",
  getSkillList: serviceUrl.jobSeeker + "skills",
  user: baseURL + "User/",
  job: baseURL + "JobPoster/",
  uploadDocuments: serviceUrl.uploadDocument,
  companyDetails: serviceUrl.company + "CompanyDetails",
};
