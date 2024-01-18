import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private apiBaseUrl: string;

  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.baseUrl;
  }

  logErrorWithDetails(message: string, error: any) {
    this.sendLog(environment.logLevels.error, message, error);
  }

  logInfo(message: string) {
    this.sendLog(environment.logLevels.info, message,null);
  }

  logWarn(message: string) {
    this.sendLog(environment.logLevels.warn, message,null);
  }

  logError(message: string) {
    this.sendLog(environment.logLevels.error, message,null);
  }

  private sendLog(logLevel: string, message: string, error: any) {
    const apiUrl = `${this.apiBaseUrl}${environment.apiUrls.log}`;
    
    const logData = {
      logLevel: logLevel,
      logMessage: message,
      error: error ? JSON.stringify(error) : null
    };
  
    this.http.post(apiUrl, logData).subscribe(
      () => {
        console.log(environment.messages.loggerSuccessMessage);
      },
      (error: any) => {
        console.error(environment.messages.loggerFailureMessage, error);
      }
    );
  }
}
