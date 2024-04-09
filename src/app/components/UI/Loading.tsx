const LoadingComponent = () => {
	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
			<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
		</div>
	);
};

export default LoadingComponent;
