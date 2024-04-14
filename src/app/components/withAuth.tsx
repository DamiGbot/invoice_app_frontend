import { ComponentType, FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
	isTokenValid,
	isTokenExpired,
	refreshAccessToken,
} from "@/app/helpers/refreshToken";
import { useDispatch } from "@/app/hooks/useDispatch";
import { initialCheck } from "@/app/lib/features/auth/authSlice";
import LoadingComponent from "./UI/Loading";

const withAuth = <P extends object>(Component: ComponentType<P>): FC<P> => {
	// eslint-disable-next-line react/display-name
	return (props: P) => {
		const router = useRouter();
		const [isLoading, setIsLoading] = useState(true);

		const dispatch = useDispatch();

		useEffect(() => {
			dispatch(initialCheck());
		}, [dispatch]);

		useEffect(() => {
			const accessToken = localStorage.getItem("accessToken") as string;

			const verifyAndRefreshToken = async () => {
				if (accessToken == null || accessToken.length < 1) {
					return false;
				}

				const isValidIssuer = isTokenValid(accessToken);

				if (!isValidIssuer) {
					console.log("Invalid issuer. Please Login...");
					return false;
				}

				if (isTokenExpired(accessToken)) {
					console.log("Token expired. Refreshing...");
					const result = await refreshAccessToken();

					if (result.isSuccess === undefined) {
						return false;
					}

					return true;
				}

				return true;
			};

			const checkAccess = async () => {
				if (!(await verifyAndRefreshToken())) {
					localStorage.removeItem("accessToken");
					localStorage.removeItem("refreshToken");

					router.replace("/");
				} else {
				}

				setIsLoading(false);
			};

			checkAccess();
		}, [router]);

		if (isLoading) {
			return <LoadingComponent />;
		}

		return <Component {...props} />;
	};
};

export default withAuth;
