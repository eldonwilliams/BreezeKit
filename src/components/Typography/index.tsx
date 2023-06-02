import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

/**
 * Shared styles for the Typography component
 */
export const TypographyStyle = tv({
  base: 'ez-typography',
  variants: {
    color: {
      primary: 'text-gray-900 dark:text-slate-200',
      secondary: 'text-gray-400 dark:text-gray-600',
      link: 'text-blue-500 dark:text-blue-400',
    },
    font: {
      mono: 'font-mono',
      serif: 'font-serif',
      sans: 'font-sans',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      h1: 'text-2xl font-bold',
      h2: 'text-xl font-bold',
      content: 'text-md font-normal',
    },
    interactive: {
      true: 'cursor-pointer select-none',
    },
    italic: {
      true: 'italic',
    },
    highlighted: {
      true: 'bg-yellow-100 dark:bg-amber-600 dark:bg-opacity-50',
    },
  },
  compoundVariants: [
    {
      interactive: true,
      color: 'primary',
      class: 'hover:text-gray-800 dark:hover:text-slate-300',
    },
    {
      interactive: true,
      color: 'secondary',
      class: 'hover:text-gray-300 dark:hover:text-gray-700',
    },
    {
      // Links are usually interactive
      interactive: true,
      color: 'link',
      class: 'hover:text-blue-600 dark:hover:text-blue-300',
    },
  ],
  defaultVariants: {
    color: 'primary',
    font: 'sans',
    size: 'content',
    interactive: false,
    highlighted: false,
    italic: false,
  },
});

/**
 * The props for the Typography component
 */
export type TypographyProps = {

  /**
     * The content of the component.
     * Should only be string,
     * can be JSX.Element[], for spans from other typography elements.
     * You may also insert a tags for hyperlinks.
     *
     * @example
     * <Typography>
     *  <Typography>Some Text, and</Typography>
     *  <Typography>Some Other Text</Typography>
     * </Typography>
     */
  children?: JSX.Element[] | JSX.Element | string;

  /**
     * Is this element like a button?
     */
  interactive?: VariantProps<typeof TypographyStyle>['interactive'];

  /**
     * Applies a background highlight to the text
     */
  highlighted?: boolean;

  /**
     * Makes the text italics
     */
  italic?: boolean;

  /**
     * The size of the element
     */
  size?: VariantProps<typeof TypographyStyle>['size'];

  /**
     * The color of the element, from a predefined list
     */
  color?: VariantProps<typeof TypographyStyle>['color'];

  /**
     * The font of the element
     */
  font?: VariantProps<typeof TypographyStyle>['font'];

  /**
     * An alternate element to use instead of a p tag
     */
  element?: keyof JSX.IntrinsicElements;

  /**
     * Catch all for other elements, but won't get type checking and intellisense
     */
  [key: string]: unknown;
} & Omit<JSX.IntrinsicElements['p'], 'children'>;

export type TypographyElement = ReturnType<typeof Typography>;

/**
 * A element which contains text information
 */
export default function Typography(props: TypographyProps) {
  const {
    interactive, italic, highlighted, size, color, font, children, element = 'p', className, ...extraProps
  } = props;

  return (
    React.createElement(
      element,
      {
        className: TypographyStyle({
          interactive, italic, highlighted, size, color, font, className,
        }),
        ...extraProps,
      },
      // If children is an array, map over it and clone each element with a span element
      // Otherwise, just return the children
      // Because we need to use span to get the text to play nice in the parent element
      children instanceof Array
        ? children.map((child, i) => React.cloneElement(child, { ...child.props, element: 'span', key: child.key || i }))
        : children,
    )
  );
}
