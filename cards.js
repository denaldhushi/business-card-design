class BusinessCardDesign {

	constructor(options) {
		this.container = options.container;
		this.width = options.width || 400;
		this.height = options.height || 250;
		this.icons = options.icons || [];
		this.download = options.download || false;
		this.text = options.text || false;
		this.colorpicker = options.colorpicker || false;
		this.imagecontainer = options.imagecontainer || '';
		this.bgcolor = options.bgcolor || '#fff';
		this.stage = {};
		this.layer = {};
		this.background = {};
	}

	Run() {
		this.stage = new Konva.Stage({
			container: 'card-designer',
			width: 400,
			height: 250,
		});
		this.Layer();
		this.setBGInitially();
		this.Download();
		this.ColorPicker();
		this.setIcons();
		this.Text();
		this.Image();
	}

	Layer() {
		this.layer = new Konva.Layer();
		this.stage.add(this.layer);	
	}

	setBGColor(color) {
		this.background.fill(color);
		this.layer.draw();
	}

	setBGInitially() {
		this.background = new Konva.Rect({
			width: this.stage.width(),
			height: this.stage.height(),
			fill: this.bgcolor,
		});
		this.layer.add(this.background);
	}

	setIcons() {
		if (this.icons.length == 0) {
			return false;
		}
		for (let i in this.icons) {
			let img = new Image();
			img.src = this.icons[i].src;
			img.onload = () => {
				const wifiIcon = new Konva.Image({
					x: this.icons[i].x,
					y: this.icons[i].y,
					image: img,
					width: this.icons[i].width,
					height: this.icons[i].height,
					rotation: this.icons[i].rotation,
				});
				this.layer.add(wifiIcon);
				this.layer.draw();
			};			
		}
	}

	Download() {
		if (!this.download || this.download['container'] === undefined) {
			return false;
		}
		const downloadButton = document.getElementById(this.download.container);
		downloadButton.addEventListener('click', () => {
			const dataURL = this.stage.toDataURL();
			const link = document.createElement('a');
			link.href = dataURL;
			link.download = this.download.filename || 'custom_card.png';
			link.click();
		});
	}

	Text() {
		if (!this.text || this.text['btncontainer'] === undefined) {
			return false;
		}
		const addTextButton = document.getElementById(this.text.btncontainer);
		addTextButton.addEventListener('click', () => {
			this.AddText();
		});
	}

	ColorPicker() {
		if (!this.colorpicker) {
			return false;
		}
		const bgColorPicker = document.getElementById(this.colorpicker);
		bgColorPicker.addEventListener('input', () => {
			const selectedColor = bgColorPicker.value;
			this.setBGColor(selectedColor);
		});
	}

	Image() {
		const bgImageInput = document.getElementById(this.imagecontainer);
		bgImageInput?.addEventListener('change', (e) => {
			const file = e.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					const imageObj = new Image();
					imageObj.src = e.target.result;
					imageObj.onload = () => {
						const image = new Konva.Image({
							image: imageObj,
							width: 400,
							height: 250,
							zIndex: 0
						});
						this.layer.add(image);
						this.setIcons();
						this.layer.draw();
					};
				};
				reader.readAsDataURL(file);
			}
		});
	}

	setBGImage(imageURL) {
		const imageObj = new Image();
		imageObj.src = imageURL;
		imageObj.onload = () => {
			this.background.fillPatternImage(imageObj);
			this.background.fillPatternScale({
				x: this.stage.width() / imageObj.width,
				y: this.stage.height() / imageObj.height
			});
			this.layer.draw();
		};
	}

	AddText() {
		const textValue = document.getElementById(this.text.inputcontainer)?.value;
		if (textValue) {
			const customText = new Konva.Text({
				x: 50,
				y: 50,
				text: textValue,
				fontSize: 16,
				draggable: true,
			});
			customText.on('dblclick', () => {
				const existingInput = document.querySelector('.bcard-text-input');
				if (existingInput) {
					existingInput.focus();
					return;
				}
				const textX = customText.x();
				const textY = customText.y();
				const input = document.createElement('input');
				input.type = 'text';
				input.value = customText.text();
				input.style.position = 'absolute';
				input.style.left = `${textX}px`;
				input.style.top = `${textY}px`;
				input.className = 'bcard-text-input';
				const cardDesigner = document.getElementById(this.container);
				cardDesigner.appendChild(input);
				input.focus();
				input.addEventListener('blur', () => {
					customText.text(input.value);
					this.layer.draw();
					input.remove();
				});
				input.addEventListener('keydown', (e) => {
					if (e.key === 'Enter') {
						customText.text(input.value);
						this.layer.draw();
						input.remove();
					}
				});
			});
			let clickCount = 0;
			let transformer = null;
			customText.on('click', (e) => {
				if (!transformer) {
					transformer = new Konva.Transformer({
						nodes: [customText],
						keepRatio: true,
						rotateEnabled: true,
					});
					this.layer.add(transformer);
					transformer.attachTo(customText);
					this.layer.draw();
				}
				e.cancelBubble = true;
			});
			this.stage.on('click', (e) => {
				if (transformer) {
					const clickedOnTransformer = transformer.findOne('.border') === e.target;
					if (!clickedOnTransformer) {
						transformer.detach();
						transformer.destroy();
						transformer = null;
						this.layer.draw();
					}
				}
			});
			this.layer.add(customText);
			this.layer.draw();
		}
	}
}
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
		colorpicker: 'bg-color-picker',
		icons: [{
			src: 'img/4305650.png',
			rotation: 90,
			width: 32,
			height: 32,
			x: 380,
			y: 20
		},{
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