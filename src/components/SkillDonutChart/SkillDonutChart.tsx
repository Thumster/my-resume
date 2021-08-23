import { IconType } from 'react-icons';
import { PieChart } from 'react-minimal-pie-chart';
import { AnimatePresence } from 'framer-motion';
import {
	Wrapper,
	ChartContainer,
	PieChartLabel,
	DescriptionContainer,
	DescriptionHeader,
	DescriptionText,
} from './SkillDonutChartStyles';
import {
	animateBigVariants,
	animateLTRVariants,
	animateAppearVariants,
} from '../../config/framer-animations';

export type ChartInfoType = {
	id: string;
	label: string;
	percentage: number;
	color: string;
	iconWidth?: string;
	iconMarginTop?: string;
	Icon: IconType;
};
export type DescInfoType = {
	label: string;
	items: string[];
};

type SkillDonutChartProps = {
	chartInfo: ChartInfoType;
	descInfo: DescInfoType;
	animate?: boolean;
	active?: boolean;
	onClick?: () => void;
};
const SkillDonutChart = ({
	chartInfo: { label, percentage, color, iconWidth, iconMarginTop, Icon },
	descInfo: { label: descLabel, items: descItems },
	animate = true,
	active = false,
	onClick,
}: SkillDonutChartProps): JSX.Element => (
	<Wrapper aria-label="wrapper">
		<ChartContainer
			color={color}
			iconWidth={iconWidth}
			iconMarginTop={iconMarginTop}
			onClick={onClick}
			aria-label="chart-container"
			className={`${active && 'active'}`}
			layout
			variants={animateBigVariants}
			animate={active ? animateBigVariants.big : animateBigVariants.original}
			whileHover={animateBigVariants.big}
		>
			<PieChart
				data={[{ key: 1, value: 1, color }]}
				reveal={percentage}
				lineWidth={15}
				startAngle={270}
				rounded
				animate={animate}
				background={color}
				animationEasing="ease-in-out"
				animationDuration={1000}
			/>
			<AnimatePresence>
				{active && (
					<PieChartLabel
						variants={animateAppearVariants}
						initial={animateAppearVariants.initial}
						animate={animateAppearVariants.animate}
						exit={animateAppearVariants.initial}
						transition={{ delay: 0.2, duration: 0.2 }}
					>
						{label}
						<br />
						<b>{percentage}%</b>
					</PieChartLabel>
				)}
			</AnimatePresence>
			<Icon color={color} className="chart-icon" />
		</ChartContainer>
		<AnimatePresence>
			{active && (
				<DescriptionContainer
					layout
					variants={animateLTRVariants}
					initial={animateLTRVariants.left}
					animate={animateLTRVariants.original}
				>
					<DescriptionHeader color={color} aria-label="description-header">
						{descLabel}
					</DescriptionHeader>
					{descItems.map((item) => (
						<DescriptionText key={item}>{item}</DescriptionText>
					))}
				</DescriptionContainer>
			)}
		</AnimatePresence>
	</Wrapper>
);
export default SkillDonutChart;
