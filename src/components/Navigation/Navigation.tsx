import React, { useRef, useEffect, forwardRef, useState } from 'react';
import Media from 'react-media';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';
import { AnimatePresence } from 'framer-motion';
import {
	StyledBackdrop,
	StyledMobileMenu,
	StyledHamburgerContainer,
	StyledMobileNavigationContainer,
	StyledCloseButtonContainer,
	StyledMobileTabLink,
	StyledTabContainer,
	StyledTabLink,
	StyledSlider,
} from './NavigationStyles';
import { ContentSectionType } from '../../config/content';
import { device } from '../../config/display';
import {
	animateUpDownMenuVariants,
	animateLTRMenuVariants,
} from '../../config/framer-animations';

type NavigationPropsType = {
	currentTabIdx: number | null;
	appContent: ContentSectionType[];
	animateTrigger?: boolean;
};

const Navigation: React.ForwardRefRenderFunction<
	HTMLDivElement,
	NavigationPropsType
> = (
	{ currentTabIdx, appContent, animateTrigger = true }: NavigationPropsType,
	refTabsContainer
): JSX.Element => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [showMobileMenuIcon, setShowMobileMenuIcon] = useState(true);
	const refTabs = useRef<Array<HTMLAnchorElement | null>>([]);
	const refSlider = useRef<HTMLDivElement>(null);
	const refBackdrop = useRef<HTMLDivElement>(null);

	const handleSlider = (): void => {
		const tab = currentTabIdx !== null ? refTabs.current[currentTabIdx] : null;
		if (tab) {
			let width = 0;
			let left = 0;
			width = tab.clientWidth;
			left = tab.offsetLeft;
			if (refSlider.current) {
				refSlider.current.style.width = `${width.toString()}px`;
				refSlider.current.style.left = `${left.toString()}px`;
			}
		} else if (refSlider.current) {
			refSlider.current.style.width = `0px`;
			refSlider.current.style.left = `0px`;
		}
	};

	const handleResize = (): void => {
		handleSlider();
	};

	useEffect(() => {
		handleSlider();
	}, [currentTabIdx]);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		const target = e.currentTarget.getAttribute('href');
		const location = target && document.querySelector(target);
		if (location) {
			location.scrollIntoView();
		}
	};
	let prevScrollpos = window.pageYOffset;
	window.onscroll = () => {
		const currentScrollPos = window.pageYOffset;
		if (prevScrollpos > currentScrollPos) {
			setShowMobileMenuIcon(true);
		} else {
			setShowMobileMenuIcon(false);
		}

		prevScrollpos = currentScrollPos;
	};

	const clickToRemoveMenuHandler = (event: MouseEvent): void => {
		const eventTarget = event.target;
		if (eventTarget === refBackdrop.current) {
			setShowMobileMenu(false);
		}
	};
	useEffect(() => {
		if (showMobileMenu) {
			document.documentElement.addEventListener(
				'click',
				clickToRemoveMenuHandler
			);
		} else {
			document.documentElement.removeEventListener(
				'click',
				clickToRemoveMenuHandler
			);
		}
	}, [showMobileMenu]);

	return (
		<>
			<Media queries={{ mobile: device.mobileL }}>
				{(matches) =>
					matches.mobile ? (
						<>
							<AnimatePresence>
								{animateTrigger && showMobileMenuIcon && (
									<StyledMobileMenu aria-label="collapased-menu">
										<StyledHamburgerContainer
											onClick={() => setShowMobileMenu(true)}
											initial={animateUpDownMenuVariants.hidden}
											animate={animateUpDownMenuVariants.orginal}
											exit={animateUpDownMenuVariants.hidden}
										>
											<GiHamburgerMenu size={20} />
										</StyledHamburgerContainer>
									</StyledMobileMenu>
								)}
							</AnimatePresence>
							<AnimatePresence>
								{showMobileMenu && (
									<>
										<StyledMobileNavigationContainer
											aria-label="mobile-menu"
											variants={animateLTRMenuVariants}
											initial="left"
											animate="original"
											exit="left"
										>
											<StyledCloseButtonContainer
												onClick={() => setShowMobileMenu(false)}
												variants={{
													left: { x: 100, opacity: 0 },
													original: {
														x: 0,
														opacity: 1,
														transition: {
															delay: 1,
														},
													},
												}}
											>
												<IoCloseSharp size={20} />
											</StyledCloseButtonContainer>
											{appContent.map((tab, idx) => (
												<StyledMobileTabLink
													key={tab.id}
													href={`#${tab.id}`}
													onClick={() => setShowMobileMenu(false)}
													variants={{
														left: { x: -500 },
														original: (i) => ({
															x: 0,
															transition: {
																delay: i * 0.1 + 0.3,
															},
														}),
													}}
													custom={idx}
													// eslint-disable-next-line max-len
													className={currentTabIdx === idx ? 'active' : ''}
												>
													<h3>{tab.label}</h3>
												</StyledMobileTabLink>
											))}
										</StyledMobileNavigationContainer>
										<StyledBackdrop ref={refBackdrop} aria-label="backdrop" />
									</>
								)}
							</AnimatePresence>
						</>
					) : (
						<StyledTabContainer ref={refTabsContainer}>
							{animateTrigger &&
								appContent.map((tab, idx) => (
									<StyledTabLink
										key={tab.id}
										href={`#${tab.id}`}
										ref={(el) => {
											refTabs.current[idx] = el;
										}}
										onClick={handleClick}
										variants={{
											initial: { opacity: 0, y: 100 },
											animate: {
												y: 0,
												opacity: 1,
												transition: {
													delay: 0.5,
													type: 'spring',
													bounce: 0.5,
													duration: 1,
												},
											},
										}}
										initial="initial"
										animate={animateTrigger ? 'animate' : 'initial'}
									>
										{tab.label}
									</StyledTabLink>
								))}
							<StyledSlider ref={refSlider} />
						</StyledTabContainer>
					)
				}
			</Media>
		</>
	);
};

export default forwardRef(Navigation);
