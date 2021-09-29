import { CSLAGuard } from './middleware/roles/csla/csla.guard';
import { CDGSPGuard } from './middleware/roles/cdgsp/cdgsp.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './middleware/auth.guard';
import { DCGuard } from './middleware/roles/dc/dc.guard';
import { DAJCGuard } from './middleware/roles/dajc/dajc.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/dashboard-page/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard, CDGSPGuard, DCGuard, CSLAGuard, DAJCGuard] },
  { path: 'proprietaire', loadChildren: () => import('./pages/proprietaire-page/proprietaire.module').then(m => m.ProprietaireModule), canActivate: [AuthGuard, CDGSPGuard, DCGuard, CSLAGuard, DAJCGuard] },
  { path: 'lieux', loadChildren: () => import('./pages/lieux-page/lieux.module').then(m => m.LieuxModule), canActivate: [AuthGuard, CDGSPGuard, DCGuard, CSLAGuard, DAJCGuard] },
  { path: 'notification', loadChildren: () => import('./pages/notification/main-notifications.module').then(m => m.MainNotificationsModule), canActivate: [AuthGuard, CDGSPGuard, DCGuard, CSLAGuard, DAJCGuard] },
  { path: 'contrat', loadChildren: () => import('./pages/contrat-page/contrat.module').then(m => m.ContratModule), canActivate: [AuthGuard, CDGSPGuard, DCGuard, CSLAGuard, DAJCGuard] },
  { path: 'admin', loadChildren: () => import('./pages/admin-panel/admin-panel.module').then(m => m.AdminPanelModule), canActivate: [AuthGuard, CDGSPGuard, DCGuard, CSLAGuard, DAJCGuard] },
  { path: 'foncier', loadChildren: () => import('./pages/foncier-page/foncier-page.module').then(m => m.FoncierPageModule), canActivate: [AuthGuard, CDGSPGuard, DCGuard, CSLAGuard, DAJCGuard] },
  { path: 'login', loadChildren: () => import('./pages/login-page/login.module').then(m => m.LoginModule) },
  { path: 'access-denied', loadChildren: () => import('./shared/access-denied/access-denied.module').then(m => m.AccessDeniedModule) },
  { path: '**', loadChildren: () => import('./pages/notfound-page/notfound-page.module').then(m => m.NotfoundPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
