<script>
	import { goto } from '$app/navigation';
	import { Button, Card, Layout } from '@appwrite.io/pink';
</script>

<Card.Base>
	<Layout.Stack gap="s">
		<Button
			on:click={() =>
				goto(
					'https://discord.com/oauth2/authorize?client_id=1260242443572609054&permissions=8&redirect_uri=https%3A%2F%2F668d4b2ddc4448ab6c8b.functions.v16.appwrite.org%2Fregister&integration_type=0&scope=bot'
				)}>Add Cord to Discord</Button
		>
		<Button variant="secondary" on:click={() => goto('/settings')}>Settings</Button>
		<Button variant="text">Sign out</Button>
	</Layout.Stack>
</Card.Base>
