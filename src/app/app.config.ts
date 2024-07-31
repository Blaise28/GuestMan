import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
('./store/auth/auth.state');
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideStore } from '@ngxs/store';
import { AuthState } from './store/auth/auth.state';
import * as Services from './Core/services';
import * as Guards from './Core/guards';
import { routes } from './app.routes';
import { PictureState } from './store/dashboard/states/pictures/picture.state';
import { tokenInterceptor } from './Core/Interceptors/token.interceptor';
import { RoomState } from './store/dashboard/states/rooms/room.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore(
      [AuthState, PictureState, RoomState],
      // withNgxsStoragePlugin({
      //   keys: ['auth.token.access'],
      // }),
      withNgxsLoggerPlugin(),
    ),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    Services.ApiService,
    Services.AuthService,
    Services.PictureService,
    Services.RoomService,
    Guards.AuthGuard,
  ],
};
