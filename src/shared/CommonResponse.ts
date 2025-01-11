export class CommonResponse<T> {
    data: T;
    errors: any;
  
    constructor(data: T, errors: any = null) {
      this.data = data;
      this.errors = errors;
    }
  }