<script>
	import { Layout, Selector } from '@appwrite.io/pink';

	export let title;
	export let description;
	export let checked = false;
</script>

<Layout.Stack direction="row" alignItems="center">
	<Layout.Stack gap="xs">
		<h2>{title}</h2>
		<p>{description}</p>
	</Layout.Stack>
	<div>
		<Selector.Switch bind:checked />
	</div>
</Layout.Stack>

<style>
	h2,
	p {
		font-size: var(--font-size-m);
		font-style: normal;
		font-weight: 500;
		line-height: 140%; /* 22.4px */
		letter-spacing: -0.16px;
	}
	h2 {
		color: var(--color-fgcolor-neutral-secondary);
	}

	p {
		color: var(--color-fgcolor-neutral-tertiary);
	}
</style>
