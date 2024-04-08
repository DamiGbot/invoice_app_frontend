import { ComponentType, FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	isTokenValid,
	isTokenExpired,
	refreshAccessToken,
} from "@/app/helpers/refreshToken";
import { useSelector } from "react-redux";
import { useDispatch } from "@/app/hooks/useDispatch";
import { RootState } from "@/app/lib/store";
import { initialCheck } from "@/app/lib/features/auth/authSlice";

const withAuth = <P extends object>(Component: ComponentType<P>): FC<P> => {
	// eslint-disable-next-line react/display-name
	return (props: P) => {
		const router = useRouter();

		const dispatch = useDispatch();

		useEffect(() => {
			dispatch(initialCheck());
		}, [dispatch]);

		useEffect(() => {
			const accessToken = localStorage.getItem("accessToken");

			const verifyAndRefreshToken = async () => {
				const token = localStorage.getItem("accessToken") as string;
				const isValidIssuer = isTokenValid(token);

				if (!isValidIssuer) {
					console.log("Invalid issuer. Please Login...");
					return false;
				}

				if (isTokenExpired(token)) {
					console.log("Token expired. Refreshing...");
					await refreshAccessToken();
					return true;
				}
			};

			const checkAccess = async () => {
				if (!accessToken && !(await verifyAndRefreshToken())) {
					router.replace("/auth/Login");
				} else {
				}
			};

			checkAccess();
		}, [router]);

		return <Component {...props} />;
	};
};

export default withAuth;
