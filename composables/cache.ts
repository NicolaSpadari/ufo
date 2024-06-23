import { StorageSerializers } from "@vueuse/core";
import type { UseFetchOptions } from "nuxt/app";

export const useCache = async <T>(url: string, forceRequest = false, options?: Omit<UseFetchOptions<T>, "default">) => {
	const cached = useSessionStorage<T>(url, null, {
		serializer: StorageSerializers.object
	});

	if (!cached.value || forceRequest) {
		const { data, error } = await useFetch(url, options);

		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Could not fetch data from ${url}`
			});
		}

		cached.value = data.value as T;
	}

	return cached;
};
