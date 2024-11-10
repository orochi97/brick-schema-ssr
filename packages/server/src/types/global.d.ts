type RenderToString = (schemas: any) => { domText: string }

declare module '@/lib/react' {
  export const renderToString: RenderToString;
}

declare module '@/lib/vue' {
  export const renderToString: RenderToString;
}

declare module '@/lib/solid' {
  export const renderToString: RenderToString;
}
