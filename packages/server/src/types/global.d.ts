type RenderToString = (
  schemas: import('@brick/core').Schemas,
  langResource: import('i18next').Resource,
  lng: string,
) => ReturnType<import('@brick/core').BaseSdk['renderToString']>;

declare module '@/lib/react' {
  export const renderToString: RenderToString;
}

declare module '@/lib/vue' {
  export const renderToString: RenderToString;
}

declare module '@/lib/solid' {
  export const renderToString: RenderToString;
}
