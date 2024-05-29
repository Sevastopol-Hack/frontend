import { CSSProperties, FC, ImgHTMLAttributes, useRef } from 'react'

interface PicturePerspectiveProps
	extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'style' | 'className'> {
	style?: CSSProperties
	className?: string
}

const PicturePerspective: FC<PicturePerspectiveProps> = ({
	className,
	style,
	...rest
}) => {
	const constraint: number = 30
	const containerRef = useRef<HTMLDivElement>(null)
	const layerRef = useRef<HTMLDivElement>(null)

	const transforms = (
		x: number,
		y: number,
		element: HTMLElement | null
	): React.CSSProperties => {
		if (!element) {
			return {}
		}

		const box = element.getBoundingClientRect()
		const positionX = -(y - box.y - box.height / 2) / constraint
		const positionY = (x - box.x - box.width / 2) / constraint

		return {
			perspective: '100px',
			transform: `rotateX(${positionX}deg) rotateY(${positionY}deg)`,
		}
	}

	const transformElement = (el: HTMLElement | null, xyEl: number[]) => {
		if (!el) return

		const styles = transforms(...xyEl)
		Object.assign(el.style, styles)
	}

	const handleCursorAnimation = (e: MouseEvent<HTMLDivElement>) => {
		const xy = [e.clientX, e.clientY]
		const position = xy.concat([layerRef.current])

		window.requestAnimationFrame(() => {
			transformElement(layerRef.current, position)
		})
	}

	return (
		<div ref={containerRef} onMouseMove={handleCursorAnimation}>
			<div ref={layerRef}>
				<img className={`rounded-[50px] ${className}`} {...rest} />
			</div>
		</div>
	)
}

export default PicturePerspective
// <img className={`${className}`} {...rest} />
