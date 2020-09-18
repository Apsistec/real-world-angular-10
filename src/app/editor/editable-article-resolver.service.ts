import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Article, ArticlesService, UserService } from '../shared';


@Injectable()
export class EditableArticleResolver implements Resolve<Article> {
  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.articlesService.get(route.params['slug'])
           .pipe(map(
             article => {
               if (this.userService.getCurrentUser().username === article.author.username) {
                 return article;
               } else {
                 this.router.navigateByUrl('/');
               }

             }
           ))
           .pipe(catchError((err) => this.router.navigateByUrl('/')));

  }
}
