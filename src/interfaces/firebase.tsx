export interface User {
    uid: string;
    displayName?: string | null;
    email?: string | null;
    emailVerified?: boolean;
    photoURL?: string | null;
    isAnonymous?: boolean;
    providerData: (UserInfo | null)[];
    refreshToken?: string;
  }
  export interface UserInfo {
    displayName?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    photoURL?: string | null;
    providerId: string;
    uid: string;
  }