import { initButtonSchemas } from './button';
import { initCheckboxSchemas } from './checkbox';
import { initImageSchemas } from './image';
import { initListSchemas } from './list';
import { initRadioSchemas } from './radio';
import { initSelectSchemas } from './select';

export * from './button';
export * from './select';
export * from './checkbox';
export * from './radio';
export * from './image';
export * from './list';

export const initSchemasMap = {
  Button: initButtonSchemas,
  Select: initSelectSchemas,
  Checkbox: initCheckboxSchemas,
  Radio: initRadioSchemas,
  Image: initImageSchemas,
  List: initListSchemas,
};

// export const ComponentMap = {
//   Button: {
//     init: initButtonSchemas,
//   },
//   Select: initSelectSchemas,
//   Checkbox: initCheckboxSchemas,
//   Radio: initRadioSchemas,
//   Image: initImageSchemas,
//   List: initListSchemas,
// };
