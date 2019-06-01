import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import Select from 'react-select';

import TouchableContent from '../../components/touchable-content';

import { PADDING_L, PADDING_M, PADDING_XL, PADDING_XS } from '../../../constants/styles/styles';
import { GREEN, traslucentColor, WHITE } from '../../../constants/styles/styles-colors';
import { FONT_S, TEXT_BLACK, TEXT_WHITE } from '../../../constants/styles/styles-fonts';

import { ISheet } from '../../../models';
import { DropdownOutput, IDropdownOptions, IOption, MultiOutput } from './form.models';

const sheet: ISheet = {
  field: {
    display: 'inline-block',
  },
  fieldDisabled: {},
  label: {},
  wrapper: {},
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  options: IDropdownOptions;
  onChange: (value: DropdownOutput | MultiOutput) => void;
  onFocus?: (event: React.ChangeEvent<HTMLInputElement> | any) => void;
}

const unstyledDropdown = ({ classes, className, options, onChange, onFocus }: IOwnProps) => {
  const onChangeProxy = (values?: null | IOption | readonly IOption[]) => {
    onChange(values || undefined);
  };

  return (
    <label
      htmlFor={options.id}
      data-type={options.type}
      className={classnames(classes.wrapper, options.className, className)}
    >
      <span className={classes.label}>
        <TouchableContent options={options} />
      </span>

      <Select
        className={classnames(classes.field, { [classes.fieldDisabled]: options.isDisabled })}
        defaultValue={
          options.options
            ? options.options.filter(option => {
                if (options.defaultValue) {
                  return options.defaultValue.findIndex(o => o === option.value) >= 0;
                }

                return false;
              })
            : null
        }
        menuPlacement={options.menuPlacement || 'auto'}
        isDisabled={options.isDisabled}
        isMulti={options.isMulti}
        onChange={onChangeProxy}
        onFocus={onFocus}
        options={options.options}
        placeholder={options.placeholder || 'Selecciona...'}
        styles={{
          control: (styles: React.CSSProperties, { menuIsOpen }) => ({
            ...styles,
            ':hover': {
              borderColor: 'transparent',
            },
            alignItems: 'center',
            backgroundColor: menuIsOpen ? WHITE : 'transparent',
            borderColor: 'transparent',
            borderRadius: 0,
            borderWidth: 0,
            boxShadow: 'none',
            color: menuIsOpen ? TEXT_BLACK : TEXT_WHITE,
            display: 'flex',
            padding: PADDING_M,
            textTransform: 'uppercase',
          }),
          dropdownIndicator: () => ({
            color: 'inherit',
            display: 'inline-block',
            lineHeight: 0.8,
            padding: PADDING_M,
          }),
          indicatorsContainer: (styles: React.CSSProperties) => ({
            ...styles,
            display: 'inline-block',
            overflow: 'initial',
            width: 'auto',
          }),
          input: () => ({
            display: 'inline-block',
            position: 'relative',
            verticalAlign: 'top',
          }),
          menu: (styles: React.CSSProperties) => ({
            ...styles,
            borderRadius: 0,
            margin: 0,
            padding: PADDING_XS,
          }),
          option: (styles: React.CSSProperties, { isSelected }) => ({
            ...styles,
            ':hover': {
              backgroundColor: traslucentColor(GREEN, 0.3),
            },
            backgroundColor: isSelected ? GREEN : 'transparent',
            color: TEXT_BLACK,
            fontSize: FONT_S,
            fontWeight: 700,
            padding: `${PADDING_L}px ${PADDING_XL}px`,
            textAlign: 'center',
            textTransform: 'uppercase',
          }),
          placeholder: (styles: React.CSSProperties) => ({
            ...styles,
            maxWidth: `calc(100% - ${PADDING_XL}px)`,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }),
          singleValue: () => ({
            color: 'inherit',
            display: 'inline-block',
            fontSize: FONT_S,
            fontWeight: 700,
            maxWidth: 'none',
            overflow: 'initial',
            paddingLeft: PADDING_XL,
            position: 'relative',
            textOverflow: 'initial',
            whiteSpace: 'initial',
          }),
          valueContainer: () => ({
            display: 'inline-block',
            overflow: 'initial',
            position: 'relative',
            verticalAlign: 'top',
            width: 'auto',
          }),
          ...options.colourStyles,
        }}
      />

      {options.error && <span className={classes.error}>{options.error}</span>}
    </label>
  );
};

const Dropdown = injectSheet(sheet)(unstyledDropdown);

export default Dropdown;
