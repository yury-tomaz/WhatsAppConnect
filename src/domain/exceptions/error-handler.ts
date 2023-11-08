import { Response } from "express";
import { AppError, HttpCode } from "./app-error";
import * as process from "process";

class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }

  private handleTrustedError(error: AppError, response: Response): void {
    response.status(error.statusCode).json({ message: error.message });
  }

  private handleCriticalError(error: Error | AppError, response?: Response): void {
    if (response) {
      response
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }

    process.exit(1);
  }

  public handleError(error: Error | AppError, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as AppError, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }
}

export const errorHandler = new ErrorHandler();