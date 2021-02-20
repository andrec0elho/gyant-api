import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class EmptyResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap((content: any) => {
        this.handleEmptyResponse(request, response, content);
        return next.handle();
      }),
    );
  }

  public handleEmptyResponse(request: Request, response: Response, content: any) {
    // Apply interceptor to all GET requests
    if (request.method === 'GET') {
      // Apply status code 204 if the content is null, undefined or []
      if (!content || content.length === 0) {
        response.status(204);
      }
    }
  }
}
