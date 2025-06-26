import { ProjectProps } from "@/types";
import ApiKeyCard from "./ApiKeyCard";
import { useUser } from "@civic/auth/react";
import { useEffect, useState } from "react";
import useGetProjects from "@/hooks/useGetMyProjects";
import ThreeBackground from "./ThreeBackground";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
	const [projects, setProjects] = useState<ProjectProps>();
	const { loading, getProjects } = useGetProjects();
	const { user } = useUser();
	const [isInitialized, setIsInitialized] = useState(false);

	const fetchProjects = async () => {
		if (!user) {
			toast.error("No user found. Couldn't fetch Dashboard");
			return;
		}

		const data = await getProjects();
		setProjects(data);
	}

	useEffect(() => {
		// Buffer time for auth to initialize
		const timer = setTimeout(() => {
			setIsInitialized(true);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (isInitialized && user) {
			fetchProjects();
		}
	}, [user, isInitialized]);

	if (!isInitialized) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center">
				<ThreeBackground />
				<div className="relative z-10">
					<span className="text-gray-300 text-lg">Initializing...</span>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-black">
			<ThreeBackground />

			<nav className="relative z-10 w-full px-6 py-4">
				<div className="max-w-7xl mx-auto flex justify-between items-center">
					<div className="flex items-center space-x-3">
						<img src="/eye.png" alt="Logo" className="w-6 h-6" />
						<span className="geist-font text-xl font-bold text-white">Noir Sight</span>
					</div>
					<Link to="/home" className="enhanced-primary-button px-4 py-2 rounded-md text-white text-sm">
						← Back to Home
					</Link>
				</div>
			</nav>

			<div className="flex flex-col w-full items-center justify-center gap-8 px-10 py-6">
				<div className="flex flex-col gap-0.5 w-full">
					<h1 className="gradient-text text-5xl z-10">Dashboard</h1>
					<p className="text-gray-300 text-xl z-10">Manage your Projects</p>
				</div>

				{loading ? (
					<div className="w-full flex items-center justify-center mt-4">
						<span className="text-gray-300 text-lg">Loading projects...</span>
					</div>
				) : (
					<div className="flex flex-col w-full">
						<div className="flex flex-col md:flex-row justify-between w-full">
							<div className="flex gap-1 text-lg">
								<p className="text-gray-400">Name:</p>
								<p className="text-gray-200">{user?.name}</p>
							</div>
							<div className="flex gap-1 text-lg">
								<p className="text-gray-400">Email:</p>
								<p className="text-gray-200">{user?.email}</p>
							</div>
							<div className="flex gap-1 text-lg">
								<p className="text-gray-400">Projects:</p>
								<p className="text-gray-200">{projects?.projects.length || 0}</p>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4 w-full -mt-6">
							{projects?.projects.map((project) => {
								const props = { ...project, userId: projects._id };
								return <ApiKeyCard
									key={project._id}
									{...props}
								/>;
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Dashboard;