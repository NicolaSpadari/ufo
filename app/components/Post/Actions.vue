<template>
	<div class="flex gap-3">
		<UButtonGroup>
			<UButton icon="i-lucide-chevron-up" variant="soft" color="neutral" :class="{ 'text-orange-500': upvoted }" @click="upvote()" />
			<UBadge
				variant="soft" color="neutral" :class="{
					'text-orange-500': upvoted,
					'text-blue-500': downvoted
				}"
			>
				{{ formatNumber(props.post.score) }}
			</UBadge>
			<UButton icon="i-lucide-chevron-down" variant="soft" color="neutral" :class="{ 'text-blue-500': downvoted }" @click="downvote()" />
		</UButtonGroup>

		<UButton leading-icon="lucide:message-circle" variant="ghost" color="neutral" :to="`/comments/${props.post.name}`">
			{{ formatNumber(props.post.num_comments) }}
		</UButton>

		<UDropdownMenu :items="socialDropdownItems">
			<UButton leading-icon="lucide:share" variant="ghost" color="neutral">
				Share
			</UButton>
		</UDropdownMenu>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		post: Submission
	}>();

	const { productionUrl } = useConstants();
	const { formatNumber, socialNetworks } = useUtils();

	const upvoted = computed(() => props.post.likes === true);
	const downvoted = computed(() => props.post.likes === false);

	const socialDropdownItems = computed(() => {
		return socialNetworks.map((network) => {
			const share = useSocialShare({
				network: network.name,
				title: props.post.title,
				url: `${productionUrl}/comment/${props.post.id}`
			});

			return {
				label: network.label,
				icon: network.icon,
				to: share.value.shareUrl,
				target: "_blank"
			};
		});
	});

	const unvote = () => {
		console.log("unvote");
	};

	const upvote = () => {
		if (upvoted.value) {
			unvote();
			return;
		};
		console.log("upvote");
	};

	const downvote = () => {
		if (downvoted.value) {
			unvote();
			return;
		}
		console.log("downvote");
	};
</script>
