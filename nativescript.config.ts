import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.pythonanywhere.elizay05',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;