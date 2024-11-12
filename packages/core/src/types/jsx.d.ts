declare global {
  declare namespace JSX {
    interface IntrinsicElements {
      div: HTMLAttributes;
      button: ButtonHTMLAttributes;
      select: SelectHTMLAttributes;
      input: InputHTMLAttributes;
      span: HTMLAttributes;
      option: OptionHTMLAttributes;
      label: LabelHTMLAttributes;
      img: ImgHTMLAttributes;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Element {}
  }
}

export {};
