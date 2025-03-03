import { HttpInterceptorFn } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinnerService=inject(NgxSpinnerService);
  ngxSpinnerService.show();
  return next(req).pipe(finalize(
    ()=>{
      ngxSpinnerService.hide();
    }
  ))
};
