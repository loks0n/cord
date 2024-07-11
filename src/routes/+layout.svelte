<script>
	import { Root, Layout } from '@appwrite.io/pink';
</script>

<Root>
	<main>
		<section>
			<Layout.Stack gap="xl">
				<slot />
			</Layout.Stack>
		</section>
	</main>
</Root>

<style lang="scss">
	main {
		display: flex;
		height: 100vh;

		section {
			margin: auto;
			max-width: 640px;
			width: 100%;
		}
	}
</style>
