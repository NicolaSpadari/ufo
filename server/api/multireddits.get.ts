export default defineEventHandler(async (event) => {
	const { bearerToken } = getQuery(event);

	const multireddits = await client<RawMultireddit[]>("/api/multi/mine", {
		headers: {
			Authorization: `Bearer ${bearerToken}`
		}
	});

	return multireddits.map((multireddit) => multireddit.data);
});
