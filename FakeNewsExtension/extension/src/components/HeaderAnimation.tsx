const HeaderAnimation = () => {
	return (
		<>
			{/* Scanning Eye */}
			<div className="relative mb-8 flex justify-center">
				<div className="relative">
					{/* Eye SVG */}
					<svg className="w-16 animate-pulse text-blue-400" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
					</svg>
					<div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping"></div>

					{/* Scanning Lines */}
					<div className="absolute -left-8 -right-8 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
					<div className="absolute -left-12 -right-12 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
				</div>
			</div>

			{/* Title */}
			<div className="text-center mb-4 -mt-4">
				<h1 className="text-2xl font-bold mb-2 tracking-wider text-blue-400">
					<span className="inline-block animate-bounce" style={{ animationDelay: '0s' }}>N</span>
					<span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>O</span>
					<span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>I</span>
					<span className="inline-block animate-bounce" style={{ animationDelay: '0.3s' }}>R</span>
					<span className="mx-2">•</span>
					<span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>S</span>
					<span className="inline-block animate-bounce" style={{ animationDelay: '0.5s' }}>I</span>
					<span className="inline-block animate-bounce" style={{ animationDelay: '0.6s' }}>G</span>
					<span className="inline-block animate-bounce" style={{ animationDelay: '0.7s' }}>H</span>
					<span className="inline-block animate-bounce" style={{ animationDelay: '0.8s' }}>T</span>
				</h1>
				<div className="text-sm text-blue-400/70 uppercase">Fake News Detector</div>
			</div>
		</>
	)
}

export default HeaderAnimation