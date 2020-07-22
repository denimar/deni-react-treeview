import React from 'react';
import classnames from 'classnames';
import './example.scss';

export interface ExampleProps {
  active?: boolean | undefined;
  disabled?: boolean | undefined;
  children?: any;
  className?: string;
}

export class Example extends React.PureComponent<ExampleProps> {
  public render() {
    const { active, disabled, className, children, ...rest } = this.props;

    const classes = classnames(
      'Example',
      active && `Example--active`,
      disabled && `Example--disabled`,
      className
    );

    return (
      <button {...rest} className={classes}>
        {children}
      </button>
    );
  }
}
