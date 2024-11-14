type RenderToString = (
  schemas: import('@brick/core').Schemas,
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
