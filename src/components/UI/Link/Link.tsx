import { AnchorHTMLAttributes, CSSProperties, FC, ReactNode } from 'react'

interface LinkProps
	extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'style' | 'className'> {
	style?: CSSProperties
	className?: string
	children?: ReactNode
}

const Link: FC<LinkProps> = ({ className, style, children, ...rest }) => {
	return (
		<a style={style} className={`link link-hover ${className}`} {...rest}>
			{children}
		</a>
	)
}

export default Link
