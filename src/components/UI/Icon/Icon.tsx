import { CSSProperties, FC, ImgHTMLAttributes } from 'react'

interface IconProps
	extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'style' | 'className'> {
	style?: CSSProperties
	className?: string
}

const Icon: FC<IconProps> = ({ className, style, ...rest }) => {
	return <img className={`${className}`} {...rest} />
}

export default Icon
