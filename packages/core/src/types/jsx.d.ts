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
    interface Element {}
  }
}

export {};
