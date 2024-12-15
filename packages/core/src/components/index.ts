import { type ComponentMap } from '../types';
import { Button, initButtonSchemas } from './button';
import { Checkbox, initCheckboxSchemas } from './checkbox';
import { Image, initImageSchemas } from './image';
import { initListSchemas, List } from './list';
import { initRadioSchemas, Radio } from './radio';
import { initSelectSchemas, Select } from './select';
import { initTextSchemas, Text } from './text';
import { initViewSchemas, View } from './view';

export * from './button';
export * from './select';
export * from './checkbox';
export * from './radio';
export * from './image';
export * from './list';
export * from './text';
export * from './view';

export const componentMap: ComponentMap = {
  Button: {
    init: initButtonSchemas,
    render: Button,
  },
  Select: {
    init: initSelectSchemas,
    render: Select,
  },
  Checkbox: {
    init: initCheckboxSchemas,
    render: Checkbox,
  },
  Radio: {
    init: initRadioSchemas,
    render: Radio,
  },
  Image: {
    init: initImageSchemas,
    render: Image,
  },
  List: {
    init: initListSchemas,
    render: List,
  },
  Text: {
    init: initTextSchemas,
    render: Text,
  },
  View: {
    init: initViewSchemas,
    render: View,
  },
};
