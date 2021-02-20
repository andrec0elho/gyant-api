import { EmptyResponseInterceptor } from './empty-response.interceptor';
import { of, Observable } from 'rxjs';
import { ExecutionContext } from '@nestjs/common';
import { mockResponse, mockRequest } from 'mock-req-res';

describe('EmptyResponseInterceptor', () => {
  let interceptor: EmptyResponseInterceptor;

  const executionContext: ExecutionContext = {
    getClass: jest.fn(),
    getHandler: jest.fn(),
    switchToHttp: jest.fn(() => ({
      getRequest: jest.fn().mockReturnValue(mockRequest({ originalUrl: '/', method: 'GET' })),
      getNext: jest.fn(),
      getResponse: jest.fn().mockReturnValue(mockResponse({ statusCode: 200 })),
    })),
    getArgs: jest.fn(),
    getArgByIndex: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
    getType: jest.fn(),
  };

  beforeEach(() => {
    interceptor = new EmptyResponseInterceptor();
  });

  it('should be defined', () => {
    expect(new EmptyResponseInterceptor()).toBeDefined();
  });

  describe('intercept', () => {
    it('should call handleEmptyResponse method and complete', () => {
      const mockValueFromEndpoint = [];
      const callHandler = {
        handle: jest.fn(() => of(mockValueFromEndpoint)),
      };

      const handleEmptyResponseSpy = jest.spyOn(interceptor, 'handleEmptyResponse').mockReturnValue();

      const responseInterceptor: Observable<any> = interceptor.intercept(executionContext, callHandler);

      responseInterceptor.subscribe({
        next: value => {
          expect(value).toEqual(mockValueFromEndpoint);
        },
        complete: () => {
          expect(handleEmptyResponseSpy).toHaveBeenCalledTimes(1);
        },
      });
    });
  });

  describe('handleEmptyResponse', () => {
    let res;
    let req;
    let responseSetStatusSpy;

    function setResponse(responseInfo = {}, requestInfo = {}) {
      res = mockResponse({ ...responseInfo });
      req = mockRequest({ ...requestInfo });
      responseSetStatusSpy = jest.spyOn(res, 'status');
    }

    it('should call response.status if the request method is GET and the response is undefined', () => {
      setResponse({ statusCode: 200 }, { method: 'GET', url: '/random' });
      interceptor.handleEmptyResponse(req, res, undefined);
      expect(responseSetStatusSpy).toHaveBeenCalledTimes(1);
      expect(responseSetStatusSpy).toHaveBeenCalledWith(204);
    });

    it(`shouldn't call response.status if the request method is POST and the response is undefined`, () => {
      setResponse(undefined, { method: 'POST', url: '/random' });
      interceptor.handleEmptyResponse(req, res, undefined);
      expect(responseSetStatusSpy).toHaveBeenCalledTimes(0);
    });

    it(`shouldn't call response.status if the request method is GET and the response is not undefined`, () => {
      const content = { message: 'Some Response' };
      setResponse({ statusCode: 200 }, { method: 'GET', url: '/random' });
      interceptor.handleEmptyResponse(req, res, content);
      expect(responseSetStatusSpy).toHaveBeenCalledTimes(0);
    });
  });
});
