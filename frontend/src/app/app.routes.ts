import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile/profile.component';
import {authGuard} from './services/guard/auth.guard';
import {MainComponent} from './components/main/main.component';
import {StatsComponent} from './components/stats/stats.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: MainComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [authGuard]
  }
];
