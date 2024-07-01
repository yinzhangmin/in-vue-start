export default (el: any, binding: any) => {
	var canvas = document.createElement('canvas');
	canvas.width = 260;
	canvas.height = 260;
	var ctx = canvas.getContext('2d');
	if (ctx != null) {
		ctx.font = '14px Arial';
		ctx.fillStyle = 'rgba(150, 150, 150, 0.2)';
		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';
		ctx.translate(-40, 90);
		ctx.rotate(-(Math.PI / 5));
		ctx.fillText(binding.value, canvas.width / 2, canvas.height / 2);
		el.style.background = 'url(' + canvas.toDataURL('image/png') + ') left top repeat';
	}
};
