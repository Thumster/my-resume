import { useState, useEffect } from 'react';
import Media from 'react-media';
import { useInView } from 'react-intersection-observer';
import { AnimatePresence } from 'framer-motion';
import {
	SectionsMenu,
	SectionContainer,
	SectionContent,
	SectionImageContainer,
	SectionImage,
	SectionName,
	ContentListContainer,
	ContentListItemContainer,
	StyledBackdrop,
	SectionImageOutter,
	OuterSectionContent,
	MainContainer,
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

const HorizontalAccordian = ({ sections }: HAProps): JSX.Element => {
	const [ref, inView] = useInView();
	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const closeMenu = (): void => {
		setActiveIndex(null);
		setOpen(false);
	};

	useEffect(() => {
		if (!inView) {
			closeMenu();
		}
	}, [inView]);

	return (
		<Media queries={{ bigScreen: device.laptopL, smallScreen: device.tablet }}>
			{(matches) => (
				<MainContainer aria-label="main-container" ref={ref}>
					<SectionsMenu
						aria-label="sections-menu"
						noOfChildren={sections.length}
					>
						{activeIndex !== null && <StyledBackdrop onClick={closeMenu} />}
						{sections.map((experience, i) => (
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
							/>
						))}
					</SectionsMenu>
					<AnimatePresence>
						{matches.smallScreen && activeIndex !== null && (
							<OuterSectionContent
								aria-label="section-content"
								active={open}
								variants={animateAppearVariants}
								initial="initial"
								exit="initial"
								animate={open ? 'animate' : 'initial'}
							>
								<h2 className="title-main">{sections[activeIndex].title}</h2>
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
			)}
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
}: {
	sectionInfo: HASectionType;
	handleClick: () => void;
	active: boolean;
	focused: boolean;
	shiftLeft: boolean;
	isLast: boolean;
}): JSX.Element => {
	const { image, title, shortenedTitle, subtitle, contentListItems } =
		sectionInfo;
	console.log(title, active);
	return (
		<Media queries={{ bigScreen: device.laptopL, smallScreen: device.tablet }}>
			{(matches) => (
				<SectionContainer
					aria-label="section-container"
					active={active}
					shiftLeft={shiftLeft}
					focused={focused}
					variants={{
						initial: {
							x: 0,
						},
						animateLeft: {
							x: '-100%',
						},
						animateRight: {
							x: '100%',
						},
					}}
					animate={
						!focused || active
							? 'initial'
							: shiftLeft
							? 'animateLeft'
							: 'animateRight'
					}
					transition={{
						duration: 0.5,
						type: 'easeIn',
					}}
				>
					<AnimatePresence>
						{!matches.smallScreen && active && (
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
						onClick={() => handleClick()}
					>
						<SectionImageOutter aria-label="section-image-outter">
							<SectionImage
								src={image}
								aria-label="section-image"
								variants={{
									animateInactive: {
										width: '200%',
										height: '200%',
										opacity: '0.7',
									},
									animateInactiveFocused: {
										width: '200%',
										height: '200%',
										opacity: '0.25',
									},
									animateActive: {
										height: '100%',
										width: '100%',
										opacity: '0.75',
									},
									hover: {
										opacity: '1.0',
									},
								}}
								animate={
									active
										? 'animateActive'
										: focused
										? 'animateInactiveFocused'
										: 'animateInactive'
								}
								whileHover="hover"
								transition={{
									duration: 0.5,
									type: 'easeIn',
								}}
							/>
						</SectionImageOutter>
					</SectionImageContainer>
					<SectionName
						aria-label="section-name"
						variants={animateAppearVariants}
						initial="initial"
						animate={active ? 'initial' : 'animate'}
						transition={{
							duration: 0.5,
							type: 'easeIn',
						}}
					>
						<h6>{matches.bigScreen ? shortenedTitle : title}</h6>
					</SectionName>
				</SectionContainer>
			)}
		</Media>
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
