"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/lib/store";
import { useSelector } from "react-redux";

export default function Custom404() {
	const router = useRouter();
	const { isLoggedIn } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		if (isLoggedIn) {
			router.replace("/invoices");
		} else {
			router.replace("/");
		}
	}, [isLoggedIn, router]);

	return null;
}
