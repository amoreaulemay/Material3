<template>
	<div class="expanded relative h-full w-full flex flex-grow">
		<slot></slot>
	</div>
</template>

<style>
.expanded > * {
	height: 100% !important;
	width: 100% !important;
}
</style>
