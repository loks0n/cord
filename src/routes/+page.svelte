<script>
	import { Button, Card, Divider, Input, Layout } from '@appwrite.io/pink';
	import Logo from './logo.svg';

	let email = '';
	let phone = '';

	function on_submit() {}

	$: disabled = (!email && !phone) || !!(email && phone);
</script>

<Layout.Stack alignItems="center">
	<img src={Logo} alt="cord logo" />
</Layout.Stack>

<form on:submit|preventDefault={on_submit}>
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
		</Layout.Stack>
	</Card.Base>
</form>
