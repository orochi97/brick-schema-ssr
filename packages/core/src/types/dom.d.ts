// import * as CSS from 'csstype';

// type Properties = import('csstype').Properties;

// type PropertiesHyphen = import('csstype').PropertiesHyphen;

// interface CSSProperties extends Properties<string | number>, PropertiesHyphen<string | number> {
//   /**
//    * The index signature was removed to enable closed typing for style
//    * using CSSType. You're able to use type assertion or module augmentation
//    * to add properties or an index signature of your own.
//    *
//    * For examples and more information, visit:
//    * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
//    */
//   [v: `--${string}`]: string | number | undefined;
// }

// type StyleValue = false | null | undefined | string | CSSProperties | Array<StyleValue>;

type StyleValue = import('csstype').Properties;

type HTMLAttributeReferrerPolicy =
  | ''
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

type Booleanish = boolean | 'true' | 'false';
type Numberish = number | string;

type EventHandlers<E> = {
  [K in keyof E]?: E[K] extends (...args: any) => any ? E[K] : (payload: E[K]) => void;
};

interface Events {
  onCopy: ClipboardEvent;
  onCut: ClipboardEvent;
  onPaste: ClipboardEvent;
  onCompositionend: CompositionEvent;
  onCompositionstart: CompositionEvent;
  onCompositionupdate: CompositionEvent;
  onDrag: DragEvent;
  onDragend: DragEvent;
  onDragenter: DragEvent;
  onDragexit: DragEvent;
  onDragleave: DragEvent;
  onDragover: DragEvent;
  onDragstart: DragEvent;
  onDrop: DragEvent;
  onFocus: FocusEvent;
  onFocusin: FocusEvent;
  onFocusout: FocusEvent;
  onBlur: FocusEvent;
  onChange: Event;
  onBeforeinput: Event;
  onInput: Event;
  onReset: Event;
  onSubmit: Event;
  onInvalid: Event;
  onLoad: Event;
  onError: Event;
  onKeydown: KeyboardEvent;
  onKeypress: KeyboardEvent;
  onKeyup: KeyboardEvent;
  onAuxclick: MouseEvent;
  onClick: MouseEvent;
  onContextmenu: MouseEvent;
  onDblclick: MouseEvent;
  onMousedown: MouseEvent;
  onMouseenter: MouseEvent;
  onMouseleave: MouseEvent;
  onMousemove: MouseEvent;
  onMouseout: MouseEvent;
  onMouseover: MouseEvent;
  onMouseup: MouseEvent;
  onAbort: Event;
  onCanplay: Event;
  onCanplaythrough: Event;
  onDurationchange: Event;
  onEmptied: Event;
  onEncrypted: Event;
  onEnded: Event;
  onLoadeddata: Event;
  onLoadedmetadata: Event;
  onLoadstart: Event;
  onPause: Event;
  onPlay: Event;
  onPlaying: Event;
  onProgress: Event;
  onRatechange: Event;
  onSeeked: Event;
  onSeeking: Event;
  onStalled: Event;
  onSuspend: Event;
  onTimeupdate: Event;
  onVolumechange: Event;
  onWaiting: Event;
  onSelect: Event;
  onScroll: Event;
  onScrollend: Event;
  onTouchcancel: TouchEvent;
  onTouchend: TouchEvent;
  onTouchmove: TouchEvent;
  onTouchstart: TouchEvent;
  onPointerdown: PointerEvent;
  onPointermove: PointerEvent;
  onPointerup: PointerEvent;
  onPointercancel: PointerEvent;
  onPointerenter: PointerEvent;
  onPointerleave: PointerEvent;
  onPointerover: PointerEvent;
  onPointerout: PointerEvent;
  onWheel: WheelEvent;
  onAnimationstart: AnimationEvent;
  onAnimationend: AnimationEvent;
  onAnimationiteration: AnimationEvent;
  onTransitionend: TransitionEvent;
  onTransitionstart: TransitionEvent;
}

interface AriaAttributes {
  /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
  'aria-activedescendant'?: string;
  /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
  'aria-atomic'?: Booleanish;
  /**
   * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
   * presented if they are made.
   */
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
  /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
  'aria-busy'?: Booleanish;
  /**
   * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
   * @see aria-pressed @see aria-selected.
   */
  'aria-checked'?: Booleanish | 'mixed';
  /**
   * Defines the total number of columns in a table, grid, or treegrid.
   * @see aria-colindex.
   */
  'aria-colcount'?: Numberish;
  /**
   * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
   * @see aria-colcount @see aria-colspan.
   */
  'aria-colindex'?: Numberish;
  /**
   * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-colindex @see aria-rowspan.
   */
  'aria-colspan'?: Numberish;
  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current element.
   * @see aria-owns.
   */
  'aria-controls'?: string;
  /** Indicates the element that represents the current item within a container or set of related elements. */
  'aria-current'?: Booleanish | 'page' | 'step' | 'location' | 'date' | 'time';
  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  'aria-describedby'?: string;
  /**
   * Identifies the element that provides a detailed, extended description for the object.
   * @see aria-describedby.
   */
  'aria-details'?: string;
  /**
   * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
   * @see aria-hidden @see aria-readonly.
   */
  'aria-disabled'?: Booleanish;
  /**
   * Indicates what functions can be performed when a dragged object is released on the drop target.
   * @deprecated in ARIA 1.1
   */
  'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup';
  /**
   * Identifies the element that provides an error message for the object.
   * @see aria-invalid @see aria-describedby.
   */
  'aria-errormessage'?: string;
  /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
  'aria-expanded'?: Booleanish;
  /**
   * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
   * allows assistive technology to override the general default of reading in document source order.
   */
  'aria-flowto'?: string;
  /**
   * Indicates an element's "grabbed" state in a drag-and-drop operation.
   * @deprecated in ARIA 1.1
   */
  'aria-grabbed'?: Booleanish;
  /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
  'aria-haspopup'?: Booleanish | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  /**
   * Indicates whether the element is exposed to an accessibility API.
   * @see aria-disabled.
   */
  'aria-hidden'?: Booleanish;
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   * @see aria-errormessage.
   */
  'aria-invalid'?: Booleanish | 'grammar' | 'spelling';
  /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
  'aria-keyshortcuts'?: string;
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  'aria-label'?: string;
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  'aria-labelledby'?: string;
  /** Defines the hierarchical level of an element within a structure. */
  'aria-level'?: Numberish;
  /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
  'aria-live'?: 'off' | 'assertive' | 'polite';
  /** Indicates whether an element is modal when displayed. */
  'aria-modal'?: Booleanish;
  /** Indicates whether a text box accepts multiple lines of input or only a single line. */
  'aria-multiline'?: Booleanish;
  /** Indicates that the user may select more than one item from the current selectable descendants. */
  'aria-multiselectable'?: Booleanish;
  /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
  'aria-orientation'?: 'horizontal' | 'vertical';
  /**
   * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
   * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
   * @see aria-controls.
   */
  'aria-owns'?: string;
  /**
   * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
   * A hint could be a sample value or a brief description of the expected format.
   */
  'aria-placeholder'?: string;
  /**
   * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-setsize.
   */
  'aria-posinset'?: Numberish;
  /**
   * Indicates the current "pressed" state of toggle buttons.
   * @see aria-checked @see aria-selected.
   */
  'aria-pressed'?: Booleanish | 'mixed';
  /**
   * Indicates that the element is not editable, but is otherwise operable.
   * @see aria-disabled.
   */
  'aria-readonly'?: Booleanish;
  /**
   * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
   * @see aria-atomic.
   */
  'aria-relevant'?:
    | 'additions'
    | 'additions removals'
    | 'additions text'
    | 'all'
    | 'removals'
    | 'removals additions'
    | 'removals text'
    | 'text'
    | 'text additions'
    | 'text removals';
  /** Indicates that user input is required on the element before a form may be submitted. */
  'aria-required'?: Booleanish;
  /** Defines a human-readable, author-localized description for the role of an element. */
  'aria-roledescription'?: string;
  /**
   * Defines the total number of rows in a table, grid, or treegrid.
   * @see aria-rowindex.
   */
  'aria-rowcount'?: Numberish;
  /**
   * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
   * @see aria-rowcount @see aria-rowspan.
   */
  'aria-rowindex'?: Numberish;
  /**
   * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-rowindex @see aria-colspan.
   */
  'aria-rowspan'?: Numberish;
  /**
   * Indicates the current "selected" state of various widgets.
   * @see aria-checked @see aria-pressed.
   */
  'aria-selected'?: Booleanish;
  /**
   * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-posinset.
   */
  'aria-setsize'?: Numberish;
  /** Indicates if items in a table or grid are sorted in ascending or descending order. */
  'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
  /** Defines the maximum allowed value for a range widget. */
  'aria-valuemax'?: Numberish;
  /** Defines the minimum allowed value for a range widget. */
  'aria-valuemin'?: Numberish;
  /**
   * Defines the current value for a range widget.
   * @see aria-valuetext.
   */
  'aria-valuenow'?: Numberish;
  /** Defines the human readable text alternative of aria-valuenow for a range widget. */
  'aria-valuetext'?: string;
}

interface HTMLAttributes extends AriaAttributes, EventHandlers<Events> {
  innerHTML?: string;
  class?: any;
  style?: StyleValue;
  accesskey?: string;
  contenteditable?: Booleanish | 'inherit' | 'plaintext-only';
  contextmenu?: string;
  dir?: string;
  draggable?: Booleanish;
  hidden?: Booleanish | '' | 'hidden' | 'until-found';
  id?: string;
  inert?: Booleanish;
  lang?: string;
  placeholder?: string;
  spellcheck?: Booleanish;
  tabindex?: Numberish;
  title?: string;
  translate?: 'yes' | 'no';
  radiogroup?: string;
  role?: string;
  about?: string;
  datatype?: string;
  inlist?: any;
  prefix?: string;
  property?: string;
  resource?: string;
  typeof?: string;
  vocab?: string;
  autocapitalize?: string;
  autocorrect?: string;
  autosave?: string;
  color?: string;
  itemprop?: string;
  itemscope?: Booleanish;
  itemtype?: string;
  itemid?: string;
  itemref?: string;
  results?: Numberish;
  security?: string;
  unselectable?: 'on' | 'off';
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  /**
   * Specify that a standard HTML element should behave like a defined custom built-in element
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
   */
  is?: string;
  key?: Numberish;
}

interface ButtonHTMLAttributes extends HTMLAttributes {
  autofocus?: Booleanish;
  disabled?: Booleanish;
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: Booleanish;
  formtarget?: string;
  name?: string;
  type?: 'submit' | 'reset' | 'button';
  value?: string | ReadonlyArray<string> | number;
}

interface SelectHTMLAttributes extends HTMLAttributes {
  autocomplete?: string;
  autofocus?: Booleanish;
  disabled?: Booleanish;
  form?: string;
  multiple?: Booleanish;
  name?: string;
  required?: Booleanish;
  size?: Numberish;
  value?: any;
}

interface InputHTMLAttributes extends HTMLAttributes {
  accept?: string;
  alt?: string;
  autocomplete?: string;
  autofocus?: Booleanish;
  capture?: boolean | 'user' | 'environment';
  checked?: Booleanish | any[] | Set<any>;
  crossorigin?: string;
  disabled?: Booleanish;
  enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: Booleanish;
  formtarget?: string;
  height?: Numberish;
  indeterminate?: boolean;
  list?: string;
  max?: Numberish;
  maxlength?: Numberish;
  min?: Numberish;
  minlength?: Numberish;
  multiple?: Booleanish;
  name?: string;
  pattern?: string;
  placeholder?: string;
  readonly?: Booleanish;
  required?: Booleanish;
  size?: Numberish;
  src?: string;
  step?: Numberish;
  type?: InputTypeHTMLAttribute;
  value?: any;
  width?: Numberish;
}

interface OptionHTMLAttributes extends HTMLAttributes {
  disabled?: Booleanish;
  label?: string;
  selected?: Booleanish;
  value?: any;
}

interface LabelHTMLAttributes extends HTMLAttributes {
  for?: string;
  form?: string;
}

interface ImgHTMLAttributes extends HTMLAttributes {
  alt?: string;
  crossorigin?: 'anonymous' | 'use-credentials' | '';
  decoding?: 'async' | 'auto' | 'sync';
  height?: Numberish;
  loading?: 'eager' | 'lazy';
  referrerpolicy?: HTMLAttributeReferrerPolicy;
  sizes?: string;
  src?: string;
  srcset?: string;
  usemap?: string;
  width?: Numberish;
}
