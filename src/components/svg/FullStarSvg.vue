<template>
  <svg :width="size" :height="size" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve" style="enable-background:new 0 0 26.9 25.65" viewBox="0 0 26.9 25.65">
    <defs>
      <path id="a"
        d="m14.1.43 3.44 8.05 8.72.78c.39.03.67.37.64.76-.02.19-.1.35-.24.47l-6.6 5.76 1.95 8.54a.699.699 0 0 1-1.07.74l-7.5-4.48-7.52 4.5a.7.7 0 0 1-1.04-.76l1.95-8.54-6.6-5.76a.708.708 0 0 1-.07-.99c.14-.15.32-.22.5-.23l8.7-.78L12.8.43c.15-.36.56-.52.92-.37.18.07.31.21.38.37z" />
    </defs>
    <clipPath id="b">
      <use xlink:href="#a" style="overflow:visible" />
    </clipPath>
    <g style="clip-path:url(#b)">
      <defs>
        <path id="c" d="M-.08-.1h27.01v25.85H-.08z" />
      </defs>
      <clipPath id="d">
        <use xlink:href="#c" style="overflow:visible" />
      </clipPath>
      <g style="clip-path:url(#d)">
        <image
          xlink:href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEAlgCWAAD/7AARRHVja3kAAQAEAAAAHgAA/+4AIUFkb2JlAGTAAAAAAQMA EAMCAwYAAAJIAAACsAAAA4b/2wCEABALCwsMCxAMDBAXDw0PFxsUEBAUGx8XFxcXFx8eFxoaGhoX Hh4jJSclIx4vLzMzLy9AQEBAQEBAQEBAQEBAQEABEQ8PERMRFRISFRQRFBEUGhQWFhQaJhoaHBoa JjAjHh4eHiMwKy4nJycuKzU1MDA1NUBAP0BAQEBAQEBAQEBAQP/CABEIADwAQwMBIgACEQEDEQH/ xACiAAADAQEBAQAAAAAAAAAAAAAABAUCAQMGAQACAwEAAAAAAAAAAAAAAAAAAwQFBgIQAAIABQME AwAAAAAAAAAAAAARAQIDBAUTJBUSIzMlMhQ0EQABAQYGAQUAAAAAAAAAAAABABAgEXGhMrECEkJy AzEhUSITFBIAAgADBAgHAQAAAAAAAAAAAQIAEAMhMaEiUXGBkbHRMtIRYRJykjNzQv/aAAwDAQAC EQMRAAAA+68SfRyaBPIrKBPAoektl3NMDQREp1Cbmp+jJAbruANsptSOKwGsrkJlKXnLHRkgu0ZA 00m2/iyBqqudKto0FikOkNyQ6Ak51h66IGkrP//aAAgBAgABBQC/v7ijccreHK3hbZG6nrmUhu0I s4bkycN2hFnDcmRkljc6chpyFrJLC4P/2gAIAQMAAQUApUpJpNCmaFMnoyQlLeHbQirDtltDtIRW h2y2mjCl1ROqJVmjpn//2gAIAQEAAQUAr14UIcjIcjIcjIcjIcjIcjIUbyWtOZH4MYxjGWH6DJfB jGMYzH/oMp42MYxjMdHcmV8bGMYxmNjujL+NjGMYzGR3RmPExjGMZi/1l/8AV6PUnqT1J6k9SepL L6Guf//aAAgBAgIGPwBqdNgFAX+QbxHWPiI6x8RFNGcFXcA5RcZPqXhOj+iyfUvCdH9FkxNRFsWw +rR5Ax9tPc/bH209z9sUiKiHOtgDdsv/2gAIAQMCBj8ABIti7GLsYJAuEhtm3tMhtm/tMhlJvu8O cdDYc46Gw5w+VhlOjnL/2gAIAQEBBj8ABIJiYeisKsKsKsKsKsK0DKQYRizJMviRZkmcHxIsyTOD 4kWdczg+JFnXyOD44lnXyOD44lmT9MdMfjp91vqt9Vvqt9Vvqt9UPz6vsgfPiDP/2Q=="
          width="64" height="57" style="overflow:visible" transform="matrix(.48 0 0 -.48 -1.14 26.747)" />
      </g>
    </g>
    <path
      d="m14.1.43 3.44 8.05 8.72.78c.39.03.67.37.64.76-.02.19-.1.35-.24.47l-1.18 1.03c-3.21 1.11-7.42 1.78-12.03 1.78-4.61 0-8.83-.67-12.03-1.78L.24 10.49a.708.708 0 0 1-.07-.99c.13-.15.31-.22.49-.23l8.7-.78L12.8.43c.15-.36.56-.52.92-.37.18.07.31.21.38.37z"
      style="fill:#ffd401" />
  </svg>
</template>

<script>
export default {
  name: 'FullStarSvg',
  props: {
    size: { type: Number, default: 16 }
  }
}
</script>