import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.sonnenwecker',
  appName: 'Sonnenwecker',
  webDir: 'www',
  plugins: {
    LocalNotifications: {
      smallIcon: "alarm_outline",
      iconColor: '#488AFF',
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#202020',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      splashFullScreen: true,
      splashImmersive: true,
      useDialog: false,
    },
  },
};

export default config;
