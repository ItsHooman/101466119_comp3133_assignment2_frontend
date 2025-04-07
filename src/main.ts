import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRouter } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // or provideHttpClient(withFetch()) if you want
    appRouter
  ]
});
