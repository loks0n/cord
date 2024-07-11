<script>
	import { Button, Card, Divider, Input, Layout } from '@appwrite.io/pink';
	import { IconChevronLeft } from '@appwrite.io/pink-icons';

	let password = '';

	function on_submit() {}
</script>

<Layout.Stack alignItems="center" direction="row">
	<Button size="small" variant="text">
		<IconChevronLeft />
	</Button>
	<h1>Enter your password</h1>
</Layout.Stack>
<form on:submit|preventDefault={on_submit}>
	<Card.Base>
		<Layout.Stack>
			<Input.Password label="Password" bind:value={password} />
			<Layout.Stack direction="row" alignItems="center">
				<Divider />
				<span>OR</span>
				<Divider />
			</Layout.Stack>
			<Button variant="secondary">Enter with TouchID</Button>
		</Layout.Stack>
	</Card.Base>
</form>

<style>
	h1 {
		width: 100%;
		color: var(--color-fgcolor-neutral-secondary);
		text-align: center;
		font-family: var(--font-family-sansserif);
		font-size: var(--font-size-XL, 24px);
		font-style: normal;
		font-weight: 600;
		line-height: 140%;
		letter-spacing: -0.24px;
		margin-right: 56px;
	}
</style>
