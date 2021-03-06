import { ComponentProps } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { device } from '../../config/display';

export const MainContainer = styled(motion.div)`
	display: flex;
	flex-wrap: wrap;
	padding: 3rem 20rem;
	@media ${device.laptopL} {
		padding: 3rem 10rem;
	}
	@media ${device.laptop} {
		padding: 3rem 1rem;
	}
`;

export const SectionName = styled(motion.div)`
	white-space: nowrap;
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

export const SSSectionContainer = styled(motion.div)`
	flex: 0 0 20%;
	position: relative;
	display: flex;
	z-index: 99;
`;

export const SectionContainer = styled(motion.div)<{
	active: boolean;
	shiftLeft: boolean;
	focused: boolean;
}>`
	position: relative;
	display: flex;
	flex-direction: column;
	margin-right: 5px;
	z-index: 3;

	&:hover {
		${SectionName} {
			${({ theme }) =>
				css`
					transition: border-color 500ms ease, color 500ms ease;
					border-color: ${theme.fontColours.main};
					color: ${theme.fontColours.main};
				`}
		}
	}

	${({ active }) =>
		active &&
		css`
			z-index: 99;
		`}
`;

export const CloseButtonContainer = styled(motion.div)`
	position: absolute;
	cursor: pointer;
	pointer-events: all;
	z-index: 99;
	user-select: none;
	top: -4rem;
	right: 5px;
	padding: 1rem;
`;

export const ArrowNavigation = styled(motion.div)<{ sticky: 'left' | 'right' }>`
	position: absolute;
	cursor: pointer;
	pointer-events: all;
	z-index: 99;
	font-weight: bold;
	font-size: 2rem;
	display: flex;
	align-items: center;
	user-select: none;
	box-sizing: border-box;
	top: 50%;
	${({ sticky }) =>
		sticky === 'left'
			? css`
					left: 0;
					padding-right: 4rem;
			  `
			: css`
					right: 0;
					padding-left: 4rem;
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

export const SectionImageContainer = styled.div<{ aspectRatio: number }>`
	flex: 1;
	position: relative;
	padding-top: ${({ aspectRatio }) => `calc(100% / ${aspectRatio})`};
`;

export const SectionImageOutter = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	align-items: center;
	overflow: hidden;
	justify-content: flex-start;
`;

export const SectionImage = styled(motion.img)`
	/* cursor: pointer; */
	/* pointer-events: auto; */
	user-select: none;
`;

export const SSSectionImageContainer = styled(SectionImageContainer)`
	${SectionImageOutter} {
		${SectionImage} {
			pointer-events: none;
		}
	}
`;

export const SectionsMenu = styled(motion.div)<{
	noOfChildren: number;
	smallScreen?: boolean;
}>`
	flex-basis: 100%;
	display: flex;
	justify-content: center;
	box-sizing: border-box;
	align-items: stretch;
	position: relative;
	${SectionContainer} {
		flex: ${({ noOfChildren }) => `0 0 calc(100% / ${noOfChildren})`};
	}
	${({ smallScreen }) =>
		smallScreen &&
		css`
			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 3;
			}
		`}
`;

const SharedSectionContent = styled(motion.div)<{ active: boolean }>`
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
	z-index: 99;
	pointer-events: none;
`;

export const OuterSectionContent = styled(SharedSectionContent)`
	flex: 0 0 100%;
	margin-top: 2rem;
	pointer-events: all;
	${ContentListContainer} {
		text-align: justify;
	}
`;

export const SectionContent = styled(SharedSectionContent)<
	ComponentProps<typeof SharedSectionContent> & { isLast: boolean }
>`
	flex: 1;
	position: absolute;
	width: 100%;
	min-width: 30vw;

	${({ isLast }) =>
		isLast
			? css`
					direction: rtl;
					left: 0;
					text-align: right;
					padding: 0 1.5rem 0 0;
					${ContentListContainer} {
						text-align: right;
					}
			  `
			: css`
					right: 0;
					text-align: left;
					padding: 0 0 0 1.5rem;
					${ContentListContainer} {
						text-align: left;
					}
			  `}
	@media ${device.laptopL} {
		min-width: 40vw;
	}
`;
