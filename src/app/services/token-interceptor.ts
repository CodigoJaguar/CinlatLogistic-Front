import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenInterceptor {
  
// }

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('tokenJWT');

  const newReq = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
  return next(newReq);
}
