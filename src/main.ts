import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpEventType, HttpHandler, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { appRouter } from './app/app.routing';
import { TokenInterceptor } from './app/token.interceptor';
import { ErrorInterceptor } from './app/error.interceptor';
import { provideToastr } from 'ngx-toastr';
import { LoadingInterceptor } from './app/loading.interceptor';


bootstrapApplication(AppComponent, {
  providers: [    
    provideToastr(),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([TokenInterceptor, ErrorInterceptor,LoadingInterceptor])
    ),
    appRouter
  ]
}).catch((err) => console.error(err));
