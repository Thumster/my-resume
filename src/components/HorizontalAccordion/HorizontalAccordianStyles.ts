import styled, { css } from 'styled-components';
import { device } from '../../config/display';

export const StyledBackdrop = styled.div`
	z-index: 2;
	position: fixed;
	top: 0;
	width: 100vw;
	height: 100vh;
	backdrop-filter: blur(2px);
`;

export const SectionsMenu = styled.div`
	display: flex;
	justify-content: center;
	padding: 3rem 10rem;
	height: 100%;
	align-items: stretch;
	box-sizing: border-box;
	@media ${device.laptopL} {
		padding: 3rem 5rem;
	}
`;

export const SectionName = styled.div`
	white-space: nowrap;
	transition: all 0.5s ease;
	padding-top: 5px;
	margin-top: 1rem;
	border-top: 1px solid #666;
	color: #666;
	h6 {
		font-size: 16px;
		color: inherit;
		text-transform: capitalize;
		text-align: start;
		margin-top: 0;
	}
`;

export const SectionContainer = styled.div<{
	active: boolean;
	shiftLeft: boolean;
	focused: boolean;
}>`
	flex: 0 0 20vw;
	height: 30vw;
	display: flex;
	flex-direction: column;
	margin-right: 5px;
	transition: transform 500ms ease;
	z-index: 1;

	transform: ${({ focused, active, shiftLeft }) =>
		focused && !active
			? `translate3d(${shiftLeft ? '-' : ''}100%, 0, 0)`
			: 'translate3d(0, 0, 0)'};

	&:hover {
		${SectionName} {
			${({ theme }) =>
				css`
					border-color: ${theme.fontColours.main};
					color: ${theme.fontColours.main};
				`}
		}
	}

	${({ focused }) =>
		focused &&
		css`
			${SectionName} {
				opacity: 0;
			}

			${SectionImage} {
				opacity: 0.25;
			}
		`}

	${({ active }) =>
		active &&
		css`
			z-index: 99;
		`}
`;

export const ContentListContainer = styled.div`
	ul {
		list-style: none;
		padding: 0;
	}
`;

export const ContentListItemContainer = styled.div`
	display: block;
	padding-bottom: 2rem;
	line-height: 1.5;
	.title-line-item {
		margin: 0;
		margin-bottom: 0.5rem;
	}
`;

export const SectionImageContainer = styled.div<{ active: boolean }>`
	flex: 1;
	display: flex;
	align-items: center;
	overflow: hidden;
	justify-content: flex-start;
	${({ active }) =>
		active &&
		css`
			@media ${device.tablet} {
				min-width: 30vw;
			}
		`}
`;

export const SectionImage = styled.img<{ active: boolean }>`
	flex: 1;
	height: 150%;
	width: 150%;
	opacity: 0.7;
	transition: opacity 500ms ease, height 500ms ease, width 500ms ease;
	&&:hover {
		opacity: 1;
		cursor: pointer;
	}
	${({ active }) =>
		active &&
		css`
			height: 100%;
			width: 100%;
			&& {
				opacity: 0.75;
			}
		`}
`;

export const SectionContent = styled.div<{ active: boolean; isLast: boolean }>`
	flex: 1;
	position: absolute;
	width: 100%;
	min-width: 20vw;
	.title-main,
	.title-sub {
		margin: 0 0 1rem 0;
		padding: 0;
		word-break: keep-all;
	}
	.title-main {
		filter: brightness(100%);
		text-transform: uppercase;
		font-weight: bold;
	}
	.title-sub {
		filter: brightness(80%);
		margin-bottom: 2rem;
	}

	${({ active }) =>
		active
			? css`
					z-index: 99;
					visibility: visible;
					${ContentListContainer} {
						opacity: 1;
					}
			  `
			: css`
					z-index: -1;
					visibility: hidden;
					${ContentListContainer} {
						opacity: 0;
					}
			  `}

	${({ isLast }) =>
		isLast
			? css`
					direction: rtl;
					left: 0;
					text-align: right;
					transform: translateX(-100%);
					padding: 0 1.5rem 0 0;
					${ContentListContainer} {
						text-align: right;
					}
			  `
			: css`
					right: 0;
					text-align: left;
					transform: translateX(100%);
					padding: 0 0 0 1.5rem;
					${ContentListContainer} {
						text-align: left;
					}
			  `}
	@media ${device.laptopL} {
		min-width: 40vw;
	}
`;