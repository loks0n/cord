<script>
	import { Button, Card, Divider, Input, Layout } from '@appwrite.io/pink';
	import Logo from './logo.svg';
	import { account, ID } from '$lib/appwrite';
	import { goto } from '$app/navigation';

	let error = '';

	let email = '';
	let phone = '';

	function onSubmit() {
		if (!email && !phone) {
			error = 'Please enter an email or phone number';
			return;
		}
		if (email) {
			account.createMagicURLToken(ID.unique(), email);
		} else {
			account.createPhoneToken(ID.unique(), phone);
		}

		goto('/enter-otp');
	}

	$: disabled = (!email && !phone) || !!(email && phone);
</script>

<Layout.Stack alignItems="center">
	<img src={Logo} alt="cord logo" />
</Layout.Stack>

<form on:submit|preventDefault={onSubmit}>
	<Card.Base>
		<Layout.Stack>
			<Input.Text label="Email" bind:value={email} />
			<Layout.Stack direction="row" alignItems="center">
				<Divider />
				<span>OR</span>
				<Divider />
			</Layout.Stack>
			<Input.Text label="Phone number" bind:value={phone} />
			<Button {disabled} type="submit">Continue</Button>
			{#if error}
				<p>{error}</p>
			{/if}
		</Layout.Stack>
	</Card.Base>
</form>
