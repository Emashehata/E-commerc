import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    if(localStorage.getItem('user token'))
      {

          req = req.clone({
            setHeaders:{
              token:localStorage.getItem('user token')!
            }
          })

      }
  }
  return next(req);
};
