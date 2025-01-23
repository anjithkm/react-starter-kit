import { Response } from 'express';

export const response = (res: Response) => {
  return {
    success: (data: any = null) => {
      return res.status(200).send({
        success: true,
        message: "Success",
        data: data,
        error: null,
      });
    },
    badRequest: (error: any = null) => {
      return res.status(400).send({
        success: false,
        message: "Bad Request",
        data: null,
        error: error,
      });
    },
    notFound: (error: any = null) => {
      return res.status(404).send({
        success: false,
        message: "Not Found",
        data: null,
        error: error,
      });
    },
    unauthorized: ( error: any = null , message?: String) => {
      return res.status(401).send({
        success: false,
        message: message || "Unauthorized",
        data: null,
        error: error,
      });
    },
    internalError: (error: any, message?:string) => {
      return res.status(500).send({
        success: false,
        message: message || "Internal Server Error",
        data: null,
        error: error,
      });
    },
  };
};

export default response;