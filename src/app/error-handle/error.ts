export class Error {
    static returnErrorMessage(exception: any): string{
        let errorMessage = "";
        if(exception.error.errors !== undefined){
          for (const [key, value] of Object.entries(exception.error.errors)) {
            errorMessage = errorMessage + value + " ";
          }
        }
        else{
            errorMessage = exception.error.message;
        }
        return errorMessage;
    }
  }