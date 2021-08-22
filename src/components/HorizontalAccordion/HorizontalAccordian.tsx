import { useState, useEffect } from 'react';
import Media from 'react-media';
import { useInView } from 'react-intersection-observer';
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
					<SectionsMenu aria-label="sections-menu">
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
					{matches.smallScreen && activeIndex !== null && (
						<OuterSectionContent aria-label="section-content" active={open}>
							<h2 className="title-main">{sections[activeIndex].title}</h2>
							{sections[activeIndex].subtitle && (
								<h3 className="title-sub">{sections[activeIndex].subtitle}</h3>
							)}
							<SectionContentList
								sectionContent={sections[activeIndex].contentListItems}
							/>
						</OuterSectionContent>
					)}
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
	return (
		<Media queries={{ bigScreen: device.laptopL, smallScreen: device.tablet }}>
			{(matches) => (
				<SectionContainer
					aria-label="section-container"
					active={active}
					shiftLeft={shiftLeft}
					focused={focused}
				>
					{!matches.smallScreen && (
						<SectionContent
							aria-label="section-content"
							active={active}
							isLast={isLast}
						>
							<h2 className="title-main">{title}</h2>
							{subtitle && <h3 className="title-sub">{subtitle}</h3>}
							<SectionContentList sectionContent={contentListItems} />
						</SectionContent>
					)}
					<SectionImageContainer
						aria-label="section-image-container"
						onClick={() => handleClick()}
						active={active}
					>
						<SectionImageOutter aria-label="section-image-outter">
							<SectionImage
								src={image}
								aria-label="section-image"
								active={active}
							/>
						</SectionImageOutter>
					</SectionImageContainer>
					<SectionName aria-label="section-name">
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
