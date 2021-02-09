declare namespace Express {
  // To overrite Request and add user param
  export interface Request {
    user: {
      id: string;
    };
  }
}
