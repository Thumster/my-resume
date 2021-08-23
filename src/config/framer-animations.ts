export const animateBigVariants = {
	big: { scale: 1.2 },
	original: { scale: 1.0 },
};

export const animateSmallVariants = {
	small: { scale: 0.8 },
	original: { scale: 1.0 },
};

export const animateLTRVariants = {
	original: {
		opacity: 1,
		x: 0,
		transition: { delay: 0.2, duration: 0.2 },
	},
	left: { opacity: 0, x: -100 },
	right: { opacity: 0, x: 100, transition: { delay: 0, duration: 0.1 } },
};

export const animateAppearVariants = {
	animate: { opacity: 1 },
	initial: { opacity: 0 },
};

export const animateUpDownMenuVariants = {
	orginal: {
		y: 0,
		transition: {
			stiffness: 75,
			type: 'spring',
		},
	},
	hidden: {
		y: -100,
	},
};

export const animateLTRMenuVariants = {
	original: {
		x: 0,
		transition: { type: 'Tween', stiffness: 100, duration: 0.5 },
	},
	left: {
		x: -300,
		transition: { type: 'Tween', stiffness: 100, duration: 0.5 },
	},
};
