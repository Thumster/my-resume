/* eslint-disable max-len */
import React, { useState } from 'react';
import Media from 'react-media';
import {
	IoCaretBackOutline,
	IoCaretForwardOutline,
	IoCloseSharp,
} from 'react-icons/io5';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import {
	SectionsMenu,
	SectionContainer,
	SectionContent,
	SectionImageContainer,
	SectionImage,
	SectionName,
	ContentListContainer,
	ContentListItemContainer,
	SectionImageOutter,
	OuterSectionContent,
	MainContainer,
	ArrowNavigation,
	SSSectionContainer,
	SSSectionImageContainer,
	CloseButtonContainer,
} from './HorizontalAccordianStyles';
import { device } from '../../config/display';
import { animateAppearVariants } from '../../config/framer-animations';

type HAProps = {
	sections: HASectionType[];
};

export type HASectionType = {
	title: string;
	shortenedTitle: string;
	subtitle?: string;
	image: string;
	contentListItems: ContentListItemType[];
};

type ContentListItemType = {
	itemTitle?: string;
	itemDescription: string;
};

enum ScreenSize {
	SMALL,
	MEDIUM,
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number): number =>
	Math.abs(offset) * velocity;

const HorizontalAccordian = ({ sections }: HAProps): JSX.Element => {
	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const closeMenu = (): void => {
		setActiveIndex(null);
		setOpen(false);
	};

	const [direction, setDirection] = useState(0);

	const paginate = (newDirection: -1 | 1): void => {
		setDirection(newDirection);

		if (activeIndex !== null) {
			if (newDirection === -1)
				setActiveIndex((activeIndex - 1 + sections.length) % sections.length);
			if (newDirection === 1)
				setActiveIndex((activeIndex + 1) % sections.length);
		}
	};

	return (
		<Media
			queries={{ mediumScreen: device.laptopL, smallScreen: device.laptop }}
		>
			{(matches) => {
				const currentScreenSize: ScreenSize | null = matches.smallScreen
					? ScreenSize.SMALL
					: matches.mediumScreen
					? ScreenSize.MEDIUM
					: null;
				const Arrow = ({
					children,
					sticky,
					onClick,
				}: {
					children: React.ReactNode;
					sticky: 'left' | 'right';
					onClick: React.MouseEventHandler<HTMLDivElement>;
				}): JSX.Element => (
					<ArrowNavigation
						aria-label={`${sticky}-arrow`}
						sticky={sticky}
						animate={{ filter: 'brightness(70%)' }}
						whileHover={{ filter: 'brightness(100%)', scale: 1.1 }}
						transition={{
							duration: 0.5,
							type: 'easeIn',
						}}
						onClick={onClick}
					>
						{children}
					</ArrowNavigation>
				);
				return (
					<AnimateSharedLayout>
						<MainContainer aria-label="main-container">
							<SectionsMenu
								aria-label="sections-menu"
								noOfChildren={sections.length}
								smallScreen
							>
								{currentScreenSize === ScreenSize.SMALL &&
									activeIndex !== null && (
										<>
											<Arrow sticky="left" onClick={() => paginate(-1)}>
												<IoCaretBackOutline />
											</Arrow>

											<AnimatePresence custom={direction} initial={false}>
												<SSSectionContainer
													key={activeIndex}
													aria-label="section-container"
													custom={direction}
													variants={{
														// eslint-disable-next-line @typescript-eslint/no-shadow
														enter: (direction: number) => ({
															x: direction > 0 ? 1000 : -1000,
															opacity: 0,
														}),
														center: {
															zIndex: 99,
															x: 0,
															opacity: 1,
														},
														// eslint-disable-next-line @typescript-eslint/no-shadow
														exit: (direction: number) => ({
															x: direction < 0 ? 1000 : -1000,
															opacity: 0,
															transition: { duration: 0.1 },
														}),
													}}
													initial="enter"
													animate="center"
													exit="exit"
													transition={{
														x: { type: 'spring', stiffness: 300, damping: 30 },
														opacity: { duration: 0.2 },
													}}
													drag="x"
													dragConstraints={{ left: 0, right: 0 }}
													dragElastic={1}
													onDragEnd={(e, { offset, velocity }) => {
														const swipe = swipePower(offset.x, velocity.x);

														if (swipe < -swipeConfidenceThreshold) {
															paginate(1);
														} else if (swipe > swipeConfidenceThreshold) {
															paginate(-1);
														}
													}}
												>
													<SSSectionImageContainer
														aria-label="section-image-container"
														aspectRatio={0.75}
													>
														<SectionImageOutter aria-label="section-image-outter">
															<SectionImage
																src={sections[activeIndex].image}
																aria-label="section-image"
																variants={{
																	animate: {
																		height: '100%',
																		width: '100%',
																		opacity: 0.75,
																	},
																	hover: { opacity: 1 },
																}}
																animate="animate"
																initial="animate"
																whileHover="hover"
																transition={{
																	duration: 0.5,
																	type: 'easeIn',
																}}
															/>
														</SectionImageOutter>
													</SSSectionImageContainer>
												</SSSectionContainer>
											</AnimatePresence>
											<Arrow sticky="right" onClick={() => paginate(1)}>
												<IoCaretForwardOutline />
											</Arrow>
											<CloseButtonContainer
												onClick={() => closeMenu()}
												animate={{ filter: 'brightness(70%)' }}
												whileHover={{ filter: 'brightness(100%)', scale: 1.2 }}
												transition={{
													duration: 0.5,
													type: 'easeIn',
												}}
											>
												<IoCloseSharp size={20} />
											</CloseButtonContainer>
										</>
									)}
								{!(matches.smallScreen && open) &&
									sections.map((experience, i) => (
										<Section
											sectionInfo={experience}
											key={experience.title}
											handleClick={() => {
												if (activeIndex === i) {
													setActiveIndex(null);
													setOpen(false);
												} else {
													setActiveIndex(i);
													setOpen(true);
												}
											}}
											active={i === activeIndex}
											focused={open}
											shiftLeft={activeIndex != null && i < activeIndex}
											isLast={i >= Math.floor((sections.length + 1) / 2)}
											screenSize={currentScreenSize}
										/>
									))}
							</SectionsMenu>
							<AnimatePresence>
								{currentScreenSize === ScreenSize.SMALL &&
									activeIndex !== null && (
										<OuterSectionContent
											aria-label="section-content"
											active={open}
											variants={animateAppearVariants}
											initial="initial"
											exit="initial"
											animate={open ? 'animate' : 'initial'}
											transition={{
												duration: 0.5,
												type: 'easeIn',
											}}
										>
											<h2 className="title-main">
												{sections[activeIndex].title}
											</h2>
											{sections[activeIndex].subtitle && (
												<h3 className="title-sub">
													{sections[activeIndex].subtitle}
												</h3>
											)}
											<SectionContentList
												sectionContent={sections[activeIndex].contentListItems}
											/>
										</OuterSectionContent>
									)}
							</AnimatePresence>
						</MainContainer>
					</AnimateSharedLayout>
				);
			}}
		</Media>
	);
};

const Section = ({
	sectionInfo,
	handleClick,
	active,
	focused,
	shiftLeft,
	isLast,
	screenSize,
}: {
	sectionInfo: HASectionType;
	handleClick: () => void;
	active: boolean;
	focused: boolean;
	shiftLeft: boolean;
	isLast: boolean;
	screenSize: ScreenSize | null;
}): JSX.Element => {
	const { image, title, shortenedTitle, subtitle, contentListItems } =
		sectionInfo;

	const imageAnimationsProps = {
		variants: {
			animateInactive: {
				width: '200%',
				height: '200%',
				opacity: 0.7,
			},
			animateInactiveFocused: {
				width: '200%',
				height: '200%',
				opacity: 0.25,
			},
			animateActive: {
				height: '100%',
				width: '100%',
				opacity: 0.75,
			},
			hover: {
				opacity: 1,
			},
		},
		animate: active
			? 'animateActive'
			: focused
			? 'animateInactiveFocused'
			: 'animateInactive',
		initial: 'animateInactive',
	};

	const sectionAnimationProps = {
		variants: {
			initial: {
				x: 0,
			},
			animateLeft: {
				x: '-100%',
			},
			animateRight: {
				x: '100%',
			},
		},
		animate:
			!focused || active
				? 'initial'
				: shiftLeft
				? 'animateLeft'
				: 'animateRight',
		transition: {
			duration: 0.5,
			type: 'easeIn',
		},
	};

	return (
		<SectionContainer
			aria-label="section-container"
			active={active}
			shiftLeft={shiftLeft}
			focused={focused}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...sectionAnimationProps}
		>
			<AnimatePresence>
				{active && (
					<SectionContent
						aria-label="section-content"
						active={active}
						isLast={isLast}
						variants={{
							animate: {
								opacity: 1,
							},
							initialLeft: {
								opacity: 0,
								x: '-100%',
							},
							initialRight: {
								opacity: 0,
								x: '100%',
							},
						}}
						initial={isLast ? 'initialLeft' : 'initialRight'}
						exit="initial"
						animate={active ? 'animate' : 'initial'}
						transition={{
							duration: 0.5,
							type: 'easeIn',
							delay: 0.2,
						}}
					>
						<h2 className="title-main">{title}</h2>
						{subtitle && <h3 className="title-sub">{subtitle}</h3>}
						<SectionContentList sectionContent={contentListItems} />
					</SectionContent>
				)}
			</AnimatePresence>
			<SectionImageContainer
				aria-label="section-image-container"
				aspectRatio={0.75}
			>
				<SectionImageOutter aria-label="section-image-outter">
					<SectionImage
						src={image}
						aria-label="section-image"
						// eslint-disable-next-line react/jsx-props-no-spreading
						{...imageAnimationsProps}
						whileHover="hover"
						onTap={handleClick}
						transition={{
							duration: 0.5,
							type: 'easeIn',
						}}
					/>
				</SectionImageOutter>
			</SectionImageContainer>
			<SectionName
				aria-label="section-name"
				variants={{
					animate: {
						opacity: 1,
					},
					initial: {
						opacity: 0,
					},
				}}
				initial="initial"
				animate={active || focused ? 'initial' : 'animate'}
				transition={{
					duration: 0.5,
					type: 'easeIn',
				}}
			>
				<h6>
					{screenSize === ScreenSize.MEDIUM || screenSize === ScreenSize.SMALL
						? shortenedTitle
						: title}
				</h6>
			</SectionName>
		</SectionContainer>
	);
};

const SectionContentList = ({
	sectionContent,
}: {
	sectionContent: ContentListItemType[];
}): JSX.Element => (
	<ContentListContainer className="project-list">
		<ul className="menu">
			{sectionContent.map((content, i) => (
				<SectionListItem
					id={i.toString()}
					key={content.itemDescription}
					title={content.itemTitle}
					description={content.itemDescription}
				/>
			))}
		</ul>
	</ContentListContainer>
);

const SectionListItem = ({
	id,
	title,
	description,
}: {
	id: string;
	title?: string;
	description: string;
}): JSX.Element => (
	<li key={`list-item-${id}`}>
		<ContentListItemContainer aria-label="content-list-item-container">
			{title && <h3 className="title-line-item">{title}</h3>}
			{description}
		</ContentListItemContainer>
	</li>
);

export default HorizontalAccordian;
