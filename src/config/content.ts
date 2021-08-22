/* eslint-disable max-len */
import { FaReact, FaJava, FaHtml5, FaPython } from 'react-icons/fa';
import { DiAndroid } from 'react-icons/di';
import { IoLogoJavascript, IoLogoCss3 } from 'react-icons/io';
import {
	SiTypescript,
	SiSpring,
	SiMicrosoftexcel as Excel,
} from 'react-icons/si';
import { GoDatabase } from 'react-icons/go';
import { MainContentType } from '../pages/App/section_contents/0_Main/MainSectionContent';
import AboutSectionContent, {
	AboutSectionContentType,
} from '../pages/App/section_contents/1_About/AboutSectionContent';
import SkillsetsSectionContent, {
	SkillsetsSectionContentType,
} from '../pages/App/section_contents/2_Skillsets/SkillsetsSectionContent';
import ExperienceSectionContent, {
	ExperienceSectionContentType,
} from '../pages/App/section_contents/3_Experience/ExperienceSectionContent';
import ProjectsSectionContent from '../pages/App/section_contents/4_Projects/ProjectsSectionContent';
import OthersSectionContent from '../pages/App/section_contents/5_Others/OthersSectionContent';
import profilePicture from '../assets/jpgs/profile_picture.jpg';
import logoBOS from '../assets/svgs/company/logoBOS.svg';
import logoUOB from '../assets/svgs/company/logoUOB.svg';
import logoNUS from '../assets/svgs/company/logoNUS.svg';
import logoDBS from '../assets/svgs/company/logoDBS.svg';

export const mainPageContent: MainContentType = {
	typingTextContent: "Hi. I'm Bryan Thum",
	rotatingTextContent: {
		preText: 'I am a',
		items: ['Programmer', 'Developer', 'Thinker', 'Problem-Solver'],
	},
};

type BaseContentType =
	| AboutSectionContentType
	| SkillsetsSectionContentType
	| ExperienceSectionContentType
	| undefined;

export type ComponentPropType = {
	content: BaseContentType;
};

export type ContentSectionType = {
	id: string;
	label: string;
	subLabel: string;
	content?: BaseContentType;
	component: (props: ComponentPropType) => JSX.Element;
};

export const appContent: ContentSectionType[] = [
	{
		id: 'tab-about',
		label: 'More About Me',
		subLabel: 'My Journey . My Passion',
		content: {
			paragraphs: [
				'The whole idea of technology has constantly intrigued me. When you grow up in such a technology-focused society, you will not only grow into it but it becomes a part of you. My passion in this field has led me to pursue IT in NUS and SP.',
				'The thrill of problem solving and coming up with solutions that improves the lives of people fuels my motivation. In my opinion, learning from others and always having room to improve is the best part about technology.',
				'I take pride in writing software programs and also love to be a team player. Furthermore, I thrive in keeping my knowledge and skill sets relevant in the ever-changing landscape of IT.',
			],
			profilePicture,
			listItems: [
				{
					header: 'My Values',
					items: [
						{ name: 'Excellence', faUnicode: 'f091' },
						{ name: 'Agility', faUnicode: 'f135' },
						{ name: 'Empathy', faUnicode: 'f004' },
					],
				},
				{
					header: 'My Education',
					items: [
						{
							name: 'NUS - Bachelor of Computing in Information Systems (Hons)',
							faUnicode: 'f19d',
						},
						{
							name: 'SP - Diploma in Financial Informatics',
							faUnicode: 'f19d',
						},
					],
				},
			],
		},
		component: AboutSectionContent,
	},
	{
		id: 'tab-skillsets',
		label: 'Skillsets',
		subLabel: 'My Skills',
		content: {
			charts: [
				{
					chartInfo: {
						id: 'react',
						label: 'React',
						percentage: 70,
						color: '#61DBFB',
						Icon: FaReact,
					},
					descInfo: {
						label: 'Competent • Strong Interest',
						items: [
							'Developed resume website',
							'Acquired industry experience',
							'Continuing to develop further',
						],
					},
				},
				{
					chartInfo: {
						id: 'java',
						label: 'Java',
						percentage: 85,
						color: '#f89820',
						Icon: FaJava,
						iconWidth: '50%',
					},
					descInfo: {
						label: 'Proficient • Confident',
						items: [
							'Most experience with this language',
							'Developed multiple projects using JAVA EE',
							'Tutoring experience for undergraduates',
						],
					},
				},
				{
					chartInfo: {
						id: 'android',
						label: 'Android',
						percentage: 60,
						color: '#a4c639',
						Icon: DiAndroid,
						iconWidth: '50%',
					},
					descInfo: {
						label: 'Competent • Past Experience',
						items: [
							'Developed multiple projects',
							'Kotlin and Java',
							'QR Code Scanner',
							'Google Location Service',
						],
					},
				},
				{
					chartInfo: {
						id: 'javascript',
						label: 'JavaScript',
						percentage: 50,
						color: '#F0DB4F',
						Icon: IoLogoJavascript,
					},
					descInfo: {
						label: 'Adequate • Fundamentals',
						items: [
							'Mainly with ReactJS',
							'Still picking up on syntax and principles',
							'Understanding of Event Loop, Promises',
						],
					},
				},
				{
					chartInfo: {
						id: 'typescript',
						label: 'TypeScript',
						percentage: 55,
						color: '#007acc',
						Icon: SiTypescript,
						iconWidth: '45%',
						iconMarginTop: '1.3rem',
					},
					descInfo: {
						label: 'Adequate • Learning',
						items: [
							'Developed multiple projects',
							'Still picking up on syntax and principles',
						],
					},
				},
				{
					chartInfo: {
						id: 'spring',
						label: 'Spring',
						percentage: 60,
						color: '#6db33f',
						Icon: SiSpring,
						iconWidth: '50%',
						iconMarginTop: '0.9rem',
					},
					descInfo: {
						label: 'Competent • Learning',
						items: [
							'PostgreSQL, MySQL',
							'Spring Boot',
							'Unit test cases, Validation, JPA',
						],
					},
				},
				{
					chartInfo: {
						id: 'sql',
						label: 'SQL',
						percentage: 50,
						color: '#feb300',
						Icon: GoDatabase,
						iconWidth: '50%',
					},
					descInfo: {
						label: 'Adequate • Learning',
						items: [
							'Project A with 5 group memebers',
							'Still picking up on syntax and principles',
						],
					},
				},
				{
					chartInfo: {
						id: 'python',
						label: 'Python',
						percentage: 60,
						color: '#4B8BBE',
						Icon: FaPython,
					},
					descInfo: {
						label: 'Competent • Learning',
						items: [
							'Python Flask',
							'Developed multiple projects and assignments',
						],
					},
				},
				{
					chartInfo: {
						id: 'html',
						label: 'HTML5',
						percentage: 70,
						color: '#e34c26',
						Icon: FaHtml5,
					},
					descInfo: {
						label: 'Competent • Strong Interest',
						items: [
							'Developed multiple projects',
							'Continuing to develop further',
							'Creating own reusable components',
						],
					},
				},
				{
					chartInfo: {
						id: 'css',
						label: 'CSS3',
						percentage: 70,
						color: '#2965f1',
						Icon: IoLogoCss3,
					},
					descInfo: {
						label: 'Competent • Strong Interest',
						items: [
							'Styled Components',
							'Developed multiple projects',
							'Continuing to develop further',
						],
					},
				},
				{
					chartInfo: {
						id: 'excel',
						label: 'Excel',
						percentage: 90,
						color: '#1D6F42',
						Icon: Excel,
						iconWidth: '45%',
						iconMarginTop: '1.1rem',
					},
					descInfo: {
						label: 'Proficient • Past Experience',
						items: [
							'Very familiar with Excel & VBA',
							'Spearheaded and proposed multiple macros to eliminate manual labour',
						],
					},
				},
			],
		},
		component: SkillsetsSectionContent,
	},
	{
		id: 'tab-experience',
		label: 'Past Experience',
		subLabel: 'My previous employments',
		content: {
			sections: [
				{
					title: 'Bank of Singapore',
					shortenedTitle: 'BOS',
					subtitle: 'Jan 2021 - Jul 2021',
					image: logoBOS,
					contentListItems: [
						{
							itemTitle: 'Agile',
							itemDescription:
								'Actively contributed to discussions with team in SCRUM ceremonies',
						},
						{
							itemTitle: 'Client Onboarding',
							itemDescription:
								'Independently developed core functionality with ReactJS and SpringBoot',
						},
						{
							itemTitle: 'Alert Distribution',
							itemDescription:
								"Assisted in integrating ADE service to the team's infrastructure",
						},
						{
							itemTitle: 'Testing',
							itemDescription:
								'Executed SIT & UAT for various functionalities, ' +
								'ensuring validity of developed functions',
						},
					],
				},
				{
					title: 'United Overseas Bank',
					shortenedTitle: 'UOB',
					subtitle: 'Jun 2020 - Aug 2020',
					image: logoUOB,
					contentListItems: [
						{
							itemTitle: 'Software Delivery',
							itemDescription:
								'Executed SIT & UAT for ATM Frontend software updates and ensured ' +
								'smooth deployment using Rocket Aldon Lifecycle Manager',
						},
						{
							itemTitle: 'Deployment',
							itemDescription:
								'Liaised with various stakeholders to carry out deployment of ' +
								'software updates to UOB ATMs across Singapore',
						},
						{
							itemTitle: 'VBA',
							itemDescription:
								'Developed multiple VBA programs to facilitate and automate the ' +
								'daily processes within the department, ' +
								'to reduce human error and improve efficiency',
						},
					],
				},
				{
					title: 'National University of Singapore',
					shortenedTitle: 'NUS',
					subtitle: 'Aug 2019 - Dec 2021',
					image: logoNUS,
					contentListItems: [
						{
							itemTitle: 'Tutorials',
							itemDescription:
								'Structured tutorial lessons for students undergoing this module',
						},
						{
							itemTitle: 'Feedback',
							itemDescription: 'Graded assignments and provided feedback',
						},
						{
							itemTitle: 'Mentoring',
							itemDescription:
								'Coach and mentor providing guidance and feedback ' +
								'to students to get them up to pace',
						},
					],
				},
				{
					title: 'DBS Bank',
					shortenedTitle: 'DBS',
					subtitle: 'Dec 2015 - Feb 2016',
					image: logoDBS,
					contentListItems: [
						{
							itemTitle: 'VBA',
							itemDescription:
								'Modelled programs to carry out necessary tasks using VBA, ' +
								'program tested and pushed out for usage, also achieved ' +
								'department’s SPOT award for my contributions',
						},
						{
							itemTitle: 'Excel',
							itemDescription:
								'Enhanced existing excel spreadsheets and implemented ' +
								'automation and testing which reduced a substantial ' +
								'amount of manual processing',
						},
						{
							itemTitle: 'Reporting',
							itemDescription:
								'Facilitated reporting tasks and learnt the ' +
								'necessary intricacies to take on the role independently',
						},
					],
				},
			],
		},
		component: ExperienceSectionContent,
	},
	{
		id: 'tab-projects',
		label: 'Projects',
		subLabel: 'Projects',
		component: ProjectsSectionContent,
	},
	{
		id: 'tab-others',
		label: 'Others',
		subLabel: 'Others',
		component: OthersSectionContent,
	},
];
