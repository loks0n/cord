<script>
	import { goto } from '$app/navigation';
	import { Button, Card, Input, Layout } from '@appwrite.io/pink';
	import { IconChevronLeft } from '@appwrite.io/pink-icons';

	let otp = '';

	function onSubmit() {
		goto('/home');
	}
</script>

<form on:submit|preventDefault={onSubmit}>
	<Layout.Stack alignItems="center" direction="row">
		<Button size="small" variant="text">
			<IconChevronLeft />
		</Button>
		<h1>Enter code</h1>
	</Layout.Stack>
	<Card.Base>
		<Layout.Stack>
			<Input.OTP bind:value={otp} />
			<Button variant="secondary">Resend code</Button>
			<Button type="submit">Continue</Button>
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
