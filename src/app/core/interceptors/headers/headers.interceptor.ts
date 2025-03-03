import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if(localStorage.getItem('user token'))
    {
      
        req = req.clone({
          setHeaders:{
            token:localStorage.getItem('user token')!
          }
        })

    }
  return next(req);
};
