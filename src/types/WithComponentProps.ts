import { ComponentPropsWithoutRef, ElementType } from 'react'

export type WithComponentProps<TProps, TElement extends ElementType> = TProps &
  Omit<ComponentPropsWithoutRef<TElement>, keyof TProps>
