# Business Card Design JavaScript Library

## Introduction

Welcome to the Business Card Design JavaScript Library repository! This library is designed to help you create stunning business card designs using the Konva library. Whether you're a developer looking to integrate business card design functionality into your web application or just someone interested in creating custom business cards, this library is here to make the process easy and efficient.

## Features

- **User-Friendly Interface**: The library provides an intuitive interface for designing business cards with ease.

- **Customizable Templates**: Choose from a variety of pre-designed templates or create your own from scratch.

- **Rich Text and Graphics**: Add text, images, shapes, and logos to your business card design.

- **Color Palette**: Select from a wide range of colors to make your business card stand out.

- **Export and Print**: Export your business card design as an image or PDF, ready for printing.

- **Responsive Design**: Ensure your business card looks great on various screen sizes and devices.

## Getting Started

To start using the Business Card Design JavaScript Library, follow these steps:

1. **Designing**: Business Cards: Use the library's methods and functions to design your business cards. Refer to the documentation for detailed usage examples.
2. **Exporting**: Once you've designed your business card, you can export it as an image or PDF for printing or digital sharing.

### Prerequisites

- Make sure you have Konva.js library included in your project. You can get it from [here](https://konvajs.org/).

### Installation

1. Include the `BusinessCardDesign` class in your project by adding the JavaScript file (e.g., `cards.js`) to your HTML file.
```html
<script src="cards.js"></script>
```
2. Ensure that the required dependencies, such as Konva.js, are included in your project. You can use a CDN for Konva.js or include it locally.
```html
<script src="https://cdn.jsdelivr.net/npm/konva@9.0.0/konva.min.js"></script>
```

3. Create an instance of the BusinessCardDesign class and configure it with options.
```js
document.addEventListener('DOMContentLoaded', function () {
    const businessCard = new BusinessCardDesign({
        container: 'card-designer',
        bgcolor: '#ffffff',
        download: {
            container: 'download-button',
            filename: 'custom_card.png'
        },
        text: {
            btncontainer: 'add-text-button',
            inputcontainer: 'custom-text-input'
        },
        imagecontainer: 'bg-image-input',
        colorpicker: 'bg-color-picker',
        icons: [{
            src: 'img/4305650.png',
            rotation: 90,
            width: 32,
            height: 32,
            x: 380,
            y: 20
        }, {
            src: 'img/241528.png',
            rotation: 0,
            width: 80,
            height: 80,
            x: 300,
            y: 150
        }],
    });
    businessCard.Run();
}, false);
```

### Usage Examples
1. Customize Background Color

```js
businessCard.setBGColor('#FF5733');
```

2. Add Text
```js
const addTextButton = document.getElementById('add-text-button');
addTextButton.addEventListener('click', () => {
    businessCard.AddText();
});
```

3. Change Background Image
```js
const bgImageInput = document.getElementById('bg-image-input');
bgImageInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        businessCard.setBGImage(URL.createObjectURL(file));
    }
});
```

3. Use Color Picker
```js
const bgColorPicker = document.getElementById('bg-color-picker');
bgColorPicker.addEventListener('input', () => {
    const selectedColor = bgColorPicker.value;
    businessCard.setBGColor(selectedColor);
});
```

4. Download Business Card
```js
const downloadButton = document.getElementById('download-button');
downloadButton.addEventListener('click', () => {
    businessCard.Download();
});
```

5. Add Icons
```js
businessCard.setIcons([
    {
        src: 'icon1.png',
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        rotation: 0
    },
    {
        src: 'icon2.png',
        x: 200,
        y: 200,
        width: 40,
        height: 40,
        rotation: 45
    }
]);
```

## Support and Feedback

If you encounter any issues, have questions, or want to provide feedback, please open an [issue](https://github.com/your-username/business-card-design/issues). We're here to help!

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/denaldhushi/business-card-design/blob/main/LICENSE) file for details.

## Acknowledgments

- This library is built using the Konva library, which provides powerful graphics and interactive capabilities for HTML5 canvas applications.

- Special thanks to the open-source community for their contributions and support.

We hope you find the Business Card Design JavaScript Library useful and enjoy designing unique business cards for your needs!

Happy designing!
