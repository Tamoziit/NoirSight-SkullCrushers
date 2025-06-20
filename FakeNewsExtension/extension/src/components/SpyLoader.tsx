import { useState, useEffect } from 'react';
import HeaderAnimation from './HeaderAnimation';

const SpyLoader = () => {
	const [phase, setPhase] = useState(0);
	const [glitchText, setGlitchText] = useState('ANALYZING...');

	const phases = [
		'INITIALIZING SCANNER...',
		'DECRYPTING SOURCES...',
		'CROSS-REFERENCING DATA...',
		'ANALYZING PATTERNS...',
		'GENERATING REPORT...'
	];

	useEffect(() => {
		const phaseInterval = setInterval(() => {
			setPhase(prev => {
				if (prev < phases.length - 1) {
					return prev + 1;
				}
				return prev;
			});
		}, 1200);

		const glitchInterval = setInterval(() => {
			const glitchChars = '█▓▒░01';
			const original = 'ANALYZING...';
			let glitched = '';

			for (let i = 0; i < original.length; i++) {
				if (Math.random() < 0.1) {
					glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
				} else {
					glitched += original[i];
				}
			}
			setGlitchText(glitched);
		}, 100);

		return () => {
			clearInterval(phaseInterval);
			clearInterval(glitchInterval);
		};
	}, []);

	return (
		<div className="flex flex-col items-center justify-center text-blue-400 font-mono py-2 px-6 overflow-hidden">
			<div className="relative z-10 max-w-md w-full">
				<HeaderAnimation />

				{/* Status Display */}
				<div className="bg-blue-400/5 border border-blue-400/20 rounded-lg p-6 mb-6">
					<div className="flex items-center justify-between mb-4">
						{/* Search Icon */}
						<svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="currentColor">
							<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
						</svg>
						<div className="text-sm font-bold">{glitchText}</div>
						{/* Shield Icon */}
						<svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16.5V16.5H7.5V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z" />
						</svg>
					</div>

					{/* Current Phase */}
					<div className="mb-4">
						<div className="text-xs text-blue-400/80 mb-1">STATUS:</div>
						<div className="text-sm font-bold animate-pulse">
							{phases[phase]}
						</div>
					</div>
				</div>

				{/* Bottom Decoration */}
				<div className="mt-8 text-center">
					<div className="text-xs text-blue-400/80 tracking-widest">
						[ ANALYSING THE WEB ]
					</div>
					<div className="flex justify-center mt-2 space-x-1">
						{[...Array(5)].map((_, i) => (
							<div
								key={i}
								className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
								style={{ animationDelay: `${i * 0.2}s` }}
							></div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SpyLoader;