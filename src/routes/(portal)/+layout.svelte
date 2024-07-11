<script>
	import { Layout } from '@appwrite.io/pink';
	import Logo from './logo.svg';
</script>

<Layout.Stack alignItems="center">
	<img src={Logo} alt="cord logo" />
</Layout.Stack>

<slot />
