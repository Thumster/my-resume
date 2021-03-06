import styled, { css } from 'styled-components';
import { device } from '../../config/display';

const SharedSectionStyle = css`
	display: flex;
	flex-direction: column;
	position: relative;
	background: ${(props) => props.theme.colours.secondary};
	color: ${(props) => props.theme.fontColours.main};
	text-align: center;
	padding: 0 2em;
`;

export const StyledMainSection = styled.section`
	${SharedSectionStyle}
	justify-content: center;
	align-items: center;
	height: calc(100vh - 4.5rem);

	@media ${device.mobileL} {
		min-height: 100vh;
	}
`;

export const StyledSubSection = styled.section`
	${SharedSectionStyle}
	justify-content: flex-start;
	min-height: calc(100vh - 7.5rem);
	padding-top: calc(4.5rem + 3rem);
	word-break: break-word;

	@media ${device.mobileL} {
		padding-top: 4rem;
	} ;
`;
