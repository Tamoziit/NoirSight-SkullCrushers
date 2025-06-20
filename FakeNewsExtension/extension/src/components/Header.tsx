const Header = () => {
	return (
		<div className="py-4 px-8 absolute left-0 top-0 w-full text-white flex flex-col gap-3 items-center justify-between glassmorphic z-20">
			<img
				src="Logo.png"
				className="size-15 object-cover"
				alt="Logo"
			/>

			<div className="flex flex-col items-center gap-0.5 w-full">
				<h2 className="text-primary text-2xl">NoirSight</h2>
				<p className="text-secondary text-sm italic text-center">Your Security, Our Responsibility</p>
			</div>
		</div>
	)
}

export default Header;