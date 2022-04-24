export default interface IServiceResponse<T> {
  success: boolean;
  data?: T;
  errorMessage?: Array<String>;
}
