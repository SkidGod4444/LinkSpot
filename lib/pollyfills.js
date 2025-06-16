import { Platform } from 'react-native';
import structuredClone from '@ungap/structured-clone';

if (Platform.OS !== 'web') {
  const setupPolyfills = async () => {
    try {
      const { polyfillGlobal } = await import(
        'react-native/Libraries/Utilities/PolyfillFunctions'
      );

      const { TextEncoderStream, TextDecoderStream } = await import(
        '@stardazed/streams-text-encoding'
      );

      if (!('structuredClone' in global)) {
        polyfillGlobal('structuredClone', () => structuredClone);
      }

      polyfillGlobal('TextEncoderStream', () => TextEncoderStream);
      polyfillGlobal('TextDecoderStream', () => TextDecoderStream);
    } catch (error) {
      console.error('Failed to setup polyfills:', error);
    }
  };

  setupPolyfills().catch(error => {
    console.error('Error in setupPolyfills:', error);
  });
}

export {};