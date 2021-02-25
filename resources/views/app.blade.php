@php
if (config('app.env') == 'production') {
    // If we are in production, we need to parse the manifest file generated
    // by the Vite build process.
    $manifest = json_decode(@file_get_contents(public_path('/dist/manifest.json')), true);
}
@endphp

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

    <!-- Scripts -->
    @routes

    @if (config('app.env') == 'production')
        <link rel="stylesheet" href="dist/{{ Arr::get($manifest['js/app.js'], 'css.0') }}" />
        <script type="module" src="dist/{{ Arr::get($manifest['js/app.js'], 'file') }}" defer></script>
    @else
        <script type="module" src="http://localhost:{{ config('app.vite_port', 3000) }}/dist/@vite/client"></script>
        <script type="module" src="http://localhost:{{ config('app.vite_port', 3000) }}/dist/js/app.js"></script>
    @endif
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
