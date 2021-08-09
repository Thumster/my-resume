import { useEffect, useState, useRef, createRef } from 'react';
import { ThemeProvider } from 'styled-components';
import MainSectionContent from './section_contents/0_Main/MainSectionContent';
import { StyledMainSection, StyledSubSection } from './AppStyles';
import { defaultTheme } from '../../styles/themes';
import { appContent } from '../../config/content';
import Navigation from '../../components/Navigation/Navigation';

const App = (): JSX.Element => {
	const [currentTabIdx, setCurrentTabIdx] = useState<number | null>(null);

	const refMain = useRef<HTMLDivElement>(null);
	const refSections = useRef<Array<HTMLElement | null>>([]);
	const refNavigationContainer = createRef<HTMLDivElement>();

	const checkNavigationToSticky = (): boolean => {
		const offset =
			(refMain.current?.offsetTop || 0) +
			(refMain.current?.clientHeight || 0) -
			(refNavigationContainer.current?.clientHeight || 0);
		if (window.pageYOffset <= offset) {
			setCurrentTabIdx(null);
			return true;
		}
		return false;
	};

	const checkCurrentTabSelector = (): void => {
		const insideView = (el: HTMLElement | null): number => {
			const offsetTop =
				(el?.offsetTop || 0) -
				(refNavigationContainer.current?.clientHeight || 0);
			const offsetBottom = offsetTop + (el?.clientHeight || 0);
			const windowOffsetTop = window.pageYOffset;
			const windowOffsetBottom = window.pageYOffset + window.innerHeight;
			if (windowOffsetTop >= offsetTop && windowOffsetTop <= offsetBottom) {
				return (
					(Math.min(offsetBottom, windowOffsetBottom) - windowOffsetTop) /
					window.innerHeight
				);
			}

			if (
				windowOffsetBottom >= offsetTop &&
				windowOffsetBottom <= offsetBottom
			) {
				return (
					(windowOffsetBottom - Math.max(offsetTop, windowOffsetTop)) /
					window.innerHeight
				);
			}

			if (windowOffsetTop <= offsetTop && windowOffsetBottom >= offsetBottom) {
				return (offsetBottom - offsetTop) / window.innerHeight;
			}
			return 0;
		};
		const reduced = refSections.current
			.map((el, idx) => {
				const elementInsideView = insideView(el);
				return {
					elementInsideView,
					idx,
				};
			})
			.reduce((o1, o2) => {
				if (o1.elementInsideView > o2.elementInsideView) {
					return o1;
				}
				return o2;
			});
		if (reduced.elementInsideView > 0) {
			setCurrentTabIdx(reduced.idx);
		}
	};

	const handleScrollAndResize = (): void => {
		const stickyNav = checkNavigationToSticky();
		if (!stickyNav) {
			checkCurrentTabSelector();
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScrollAndResize);
		window.addEventListener('resize', handleScrollAndResize);
		return () => {
			window.removeEventListener('scroll', handleScrollAndResize);
			window.removeEventListener('resize', handleScrollAndResize);
		};
	});

	return (
		<ThemeProvider theme={defaultTheme}>
			<StyledMainSection ref={refMain}>
				<MainSectionContent />
				<Navigation
					ref={refNavigationContainer}
					appContent={appContent}
					currentTabIdx={currentTabIdx}
				/>
			</StyledMainSection>

			<main>
				{appContent.map((tab, idx) => {
					const SectionComponent = tab.component;
					return (
						<StyledSubSection
							key={tab.id}
							ref={(el) => {
								refSections.current[idx] = el;
							}}
							id={tab.id}
						>
							<h1>{tab.content}</h1>
							<h3>{tab.content}</h3>
							<SectionComponent />
						</StyledSubSection>
					);
				})}
			</main>
		</ThemeProvider>
	);
};

export default App;
