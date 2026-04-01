import type { ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { buttonClassName, type ButtonVariant } from './buttonStyles'

export type { ButtonVariant }

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

export function Button({ className, variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClassName(variant, className)} {...props} />
}

type ButtonLinkProps = LinkProps & {
  variant?: ButtonVariant
}

export function ButtonLink({ className, variant = 'primary', ...props }: ButtonLinkProps) {
  return <Link className={buttonClassName(variant, className)} {...props} />
}
