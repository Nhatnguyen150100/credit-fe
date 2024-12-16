declare const window: Window &
  typeof globalThis & {
    recaptchaVerifier: any;
  };

interface Window {
  recaptchaVerifier: any;
  confirmationResult: any;
}
