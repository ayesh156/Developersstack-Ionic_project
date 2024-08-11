interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  }
  
  interface Environment {
    production: boolean;
    firebaseConfig: FirebaseConfig;
  }
  
  declare const environment: Environment;
  