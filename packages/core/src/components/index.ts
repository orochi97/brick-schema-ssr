import { initButtonSchemas } from './button';
import { initRadioSchemas } from './radio';
import { initCheckboxSchemas } from './checkbox';
import { initSelectSchemas } from './select';
import { initImageSchemas } from './image';

export * from './button';
export * from './select';
export * from './checkbox';
export * from './radio';
export * from './image';

export const initSchemasMap = {
  Button: initButtonSchemas,
  Select: initSelectSchemas,
  Checkbox: initCheckboxSchemas,
  Radio: initRadioSchemas,
  Image: initImageSchemas,
};
