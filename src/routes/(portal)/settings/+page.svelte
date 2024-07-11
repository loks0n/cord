<script>
	import { Button, Card, Divider, Layout } from '@appwrite.io/pink';
	import { IconChevronLeft } from '@appwrite.io/pink-icons';
	import Option from './option.svelte';
	import { goto } from '$app/navigation';

	function on_submit() {}
</script>

<Layout.Stack direction="row">
	<Button size="small" variant="text" on:click={() => goto('/home')}>
		<IconChevronLeft />
	</Button>
	<h1>Settings</h1>
	<Button size="small" variant="text" on:click={() => goto('/')}>Sign out</Button>
</Layout.Stack>
<form on:submit|preventDefault={on_submit}>
	<Card.Base>
		<Layout.Stack>
			<Option
				title="/start and /location command"
				description="Type /start to notify your teammates that you began your day, displaying your local time."
				checked={true}
			/>
			<Divider />
			<Option
				title="/daily command"
				description="Type /daily and write down your progress. Cord will organize it between different categories automatically."
				checked={true}
			/>
			<Divider />
			<Option
				title="/schedule command"
				description="Type /schedule to write a message and pick a time when it will be sent."
				checked={true}
			/>
			<Button>Apply</Button>
		</Layout.Stack>
	</Card.Base>
</form>

<style>
	h1 {
		color: var(--color-fgcolor-neutral-secondary);
		font-family: var(--font-family-sansserif);
		font-size: var(--font-size-xl);
		font-style: normal;
		font-weight: 600;
		line-height: 140%; /* 33.6px */
		letter-spacing: -0.24px;
		margin-right: auto;
	}
</style>
